-- =====================================================
-- ESQUEMA BÁSICO MOVIEHOME - ADMINISTRACIÓN
-- =====================================================

-- Eliminación de tablas existentes
DROP TABLE IF EXISTS package_seller CASCADE;
DROP TABLE IF EXISTS package_user CASCADE;
DROP TABLE IF EXISTS package_type CASCADE;
DROP TABLE IF EXISTS user_admin CASCADE;
DROP TABLE IF EXISTS platform CASCADE;
DROP TABLE IF EXISTS role CASCADE;

-- =====================================================
-- TABLAS DE ADMINISTRACIÓN
-- =====================================================

-- Tabla de roles administrativos
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE platform (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
);

-- Tabla de usuarios administrativos
CREATE TABLE user_admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    status INTEGER NOT NULL DEFAULT 1,   -- 0: inactivo, 1: activo, 2: suspendido
    role_id INTEGER NOT NULL,
    platform_id INTEGER , 
    -- Si es NULL, el usuario no está asociado a ninguna plataforma específica y es administrador global
    -- Si no es NULL, el usuario está asociado a una plataforma específica
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (platform_id) REFERENCES platform(id),
    -- Restricción para el estado del usuario
    CONSTRAINT user_admin_status_check CHECK (status IN (0, 1, 2))
);


CREATE TABLE package_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    status INTEGER NOT NULL DEFAULT 1,   -- 0: inactivo, 1: activo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT package_type_status_check CHECK (status IN (0, 1))
);

CREATE TABLE package_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    package_type_id INTEGER NOT NULL,
    max_devices INTEGER NOT NULL DEFAULT 1, -- Número máximo de dispositivos permitidos , el maximo es 3
    platform_id INTEGER,
    --agrega tiempo de duración del paquete , puede ser dias o horas
    duration_value INTEGER NOT NULL, -- Valor de la duración
    duration_type VARCHAR(10) NOT NULL CHECK (duration_type IN ('days', 'hours')), -- Tipo de duración
    discount_credits BOOLEAN NOT NULL DEFAULT TRUE, -- Descuenta créditos al vendedor
    status INTEGER NOT NULL DEFAULT 1,   -- 0: inactivo, 1: activo

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Relaciones con otras tablas
    FOREIGN KEY (package_type_id) REFERENCES package_type(id),
    FOREIGN KEY (platform_id) REFERENCES platform(id),
    CONSTRAINT package_user_status_check CHECK (status IN (0, 1)),
    --restriccion max de dispositivos
    CONSTRAINT package_user_max_devices_check CHECK (max_devices > 0 AND max_devices <= 3)
);

CREATE TABLE package_seller (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- Nombre del paquete
    credit INTEGER NOT NULL DEFAULT 0, -- Créditos del paquete
    package_type_id INTEGER NOT NULL, -- Tipo de paquete
    platform_id INTEGER, -- Plataforma a la que pertenece el paquete
    status INTEGER NOT NULL DEFAULT 1, -- 0: inactivo, 1: activo, 2: expirado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Relaciones con otras tablas
    FOREIGN KEY (package_type_id) REFERENCES package_type(id),
    FOREIGN KEY (platform_id) REFERENCES platform(id),
    CONSTRAINT package_seller_status_check CHECK (status IN (0, 1, 2))
);



-- =====================================================
-- INSERCIÓN DE DATOS INICIALES
-- =====================================================

-- Insertar roles administrativos
INSERT INTO role (name) VALUES
    ('administrador'),
    ('gestor de contenido multimedia'),
    ('vendedor'),
    ('revendedor');

INSERT INTO platform (name) VALUES
    ('Scroll Tv'),
    ('Movie Home');

INSERT INTO package_type (name) VALUES
    ('fijo'),
    ('promocional');

-- Insertar usuario administrador por defecto
INSERT INTO user_admin (username, password, phone , status, role_id, platform_id) VALUES
    ('admin', '$2a$12$FeSe53ojXYb433tZvgHrQOI5w2WfGfUQW5GnEUIiDC8pxiBf9CyHi', '1234567890' , 1, 1, NULL);

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

-- Stored procedure para actualizar usuario admin
CREATE OR REPLACE FUNCTION sp_update_user_admin(
    p_id INTEGER,
    p_username VARCHAR(50) DEFAULT NULL,
    p_password VARCHAR(255) DEFAULT NULL,
    p_phone VARCHAR(20) DEFAULT NULL,
    p_role_id INTEGER DEFAULT NULL,
    p_platform_id INTEGER DEFAULT NULL,
    p_status INTEGER DEFAULT NULL
)
RETURNS TABLE(
    id INTEGER,
    username VARCHAR(50),
    phone VARCHAR(20),
    status INTEGER,
    role_id INTEGER,
    role_name VARCHAR(50),
    platform_id INTEGER,
    platform_name VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_exists BOOLEAN := FALSE;
    v_username_exists BOOLEAN := FALSE;
    v_role_exists BOOLEAN := FALSE;
    v_platform_exists BOOLEAN := FALSE;
BEGIN
    -- Validar que el ID sea válido
    IF p_id IS NULL OR p_id <= 0 THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::VARCHAR(20), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50),
            NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'ID del usuario inválido'::TEXT;
        RETURN;
    END IF;

    -- Verificar que el usuario admin exista
    SELECT EXISTS(SELECT 1 FROM user_admin WHERE user_admin.id = p_id) INTO v_exists;
    
    IF NOT v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::VARCHAR(20), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50),
            NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'Usuario admin no encontrado'::TEXT;
        RETURN;
    END IF;

    -- Validar username único (solo si se proporciona un nuevo username)
    IF p_username IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM user_admin WHERE user_admin.username = p_username AND user_admin.id != p_id) INTO v_username_exists;
        
        IF v_username_exists THEN
            RETURN QUERY SELECT 
                NULL::INTEGER, NULL::VARCHAR(50), NULL::VARCHAR(20), NULL::INTEGER,
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50),
                NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El nombre de usuario ya existe'::TEXT;
            RETURN;
        END IF;
    END IF;

    -- Validar que el role_id exista (solo si se proporciona uno nuevo)
    IF p_role_id IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM role WHERE role.id = p_role_id) INTO v_role_exists;
        
        IF NOT v_role_exists THEN
            RETURN QUERY SELECT 
                NULL::INTEGER, NULL::VARCHAR(50), NULL::VARCHAR(20), NULL::INTEGER,
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50),
                NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El rol especificado no existe'::TEXT;
            RETURN;
        END IF;
    END IF;

    -- Validar platform_id si se proporciona (puede ser NULL)
    IF p_platform_id IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM platform WHERE platform.id = p_platform_id) INTO v_platform_exists;
        
        IF NOT v_platform_exists THEN
            RETURN QUERY SELECT 
                NULL::INTEGER, NULL::VARCHAR(50), NULL::VARCHAR(20), NULL::INTEGER,
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50),
                NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'La plataforma especificada no existe'::TEXT;
            RETURN;
        END IF;
    END IF;

    -- Actualizar el usuario admin usando COALESCE para mantener valores actuales si no se proporcionan nuevos
    UPDATE user_admin 
    SET username = COALESCE(p_username, username),
        password = COALESCE(p_password, password),
        phone = COALESCE(p_phone, phone),
        role_id = COALESCE(p_role_id, role_id),
        platform_id = COALESCE(p_platform_id, platform_id),
        status = COALESCE(p_status, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE user_admin.id = p_id;

    -- Retornar el usuario actualizado con información completa
    RETURN QUERY 
    SELECT 
        ua.id,
        ua.username,
        ua.phone,
        ua.status,
        ua.role_id,
        r.name as role_name,
        ua.platform_id,
        p.name as platform_name,
        ua.created_at,
        ua.updated_at,
        TRUE as success,
        'Usuario admin actualizado exitosamente'::TEXT as message
    FROM user_admin ua
    INNER JOIN role r ON ua.role_id = r.id
    LEFT JOIN platform p ON ua.platform_id = p.id
    WHERE ua.id = p_id;

EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::VARCHAR(20), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50),
            NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, ('Error interno del servidor: ' || SQLERRM)::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para eliminar usuario admin
CREATE OR REPLACE FUNCTION sp_delete_user_admin(p_id INTEGER)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_exists BOOLEAN := FALSE;
BEGIN
    -- Validar que el ID sea válido
    IF p_id IS NULL OR p_id <= 0 THEN
        RETURN QUERY SELECT FALSE, 'ID del usuario inválido'::TEXT;
        RETURN;
    END IF;

    -- Verificar que el usuario admin exista
    SELECT EXISTS(SELECT 1 FROM user_admin WHERE user_admin.id = p_id) INTO v_exists;
    
    IF NOT v_exists THEN
        RETURN QUERY SELECT FALSE, 'Usuario admin no encontrado'::TEXT;
        RETURN;
    END IF;

    -- Eliminar el usuario admin
    DELETE FROM user_admin WHERE user_admin.id = p_id;
    
    RETURN QUERY SELECT TRUE, 'Usuario admin eliminado exitosamente'::TEXT;

EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE, ('Error interno del servidor: ' || SQLERRM)::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para listar tipos de paquetes con paginación
CREATE OR REPLACE FUNCTION sp_list_package_types(
    p_search_name VARCHAR(50),
    p_page INTEGER,
    p_page_size INTEGER
)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    total_count BIGINT
) AS $$
DECLARE
    v_offset INTEGER;
BEGIN
    -- Calcular offset para paginación
    v_offset := (p_page - 1) * p_page_size;
    
    -- Consulta con paginación y búsqueda opcional
    RETURN QUERY
    SELECT 
        pt.id,
        pt.name,
        COUNT(*) OVER() as total_count
    FROM package_type pt
    WHERE 
        -- Si p_search_name es NULL o vacío, no filtrar por nombre
        (p_search_name IS NULL OR p_search_name = '' OR pt.name ILIKE '%' || p_search_name || '%')
    ORDER BY pt.name ASC
    LIMIT p_page_size OFFSET v_offset;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para listar paquetes vendedor con paginación y búsqueda solo por nombre
CREATE OR REPLACE FUNCTION sp_list_package_sellers(
    p_search_name VARCHAR(50) DEFAULT NULL,
    p_page INTEGER DEFAULT 1,
    p_page_size INTEGER DEFAULT 10
)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    credit INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    package_type_id INTEGER,
    package_type_name VARCHAR(50),
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    total_count BIGINT
) AS $$
DECLARE
    v_offset INTEGER;
BEGIN
    v_offset := (p_page - 1) * p_page_size;
    
    RETURN QUERY 
    SELECT 
        ps.id,
        ps.name,
        ps.credit,
        ps.platform_id,
        p.name as platform_name,
        ps.package_type_id,
        pt.name as package_type_name,
        ps.status,
        ps.created_at,
        ps.updated_at,
        COUNT(*) OVER() as total_count
    FROM package_seller ps
    LEFT JOIN platform p ON ps.platform_id = p.id
    INNER JOIN package_type pt ON ps.package_type_id = pt.id
    WHERE (p_search_name IS NULL OR p_search_name = '' OR ps.name ILIKE '%' || p_search_name || '%')
    ORDER BY ps.created_at DESC
    LIMIT p_page_size OFFSET v_offset;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para obtener paquete vendedor por ID
CREATE OR REPLACE FUNCTION sp_get_package_seller_by_id(p_id INTEGER)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    credit INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    package_type_id INTEGER,
    package_type_name VARCHAR(50),
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
BEGIN
    -- Verificar si el paquete vendedor existe
    IF NOT EXISTS(SELECT 1 FROM package_seller WHERE package_seller.id = p_id) THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::INTEGER, NULL::VARCHAR(50),
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP,
            FALSE, 'Paquete vendedor no encontrado'::TEXT;
        RETURN;
    END IF;
    
    -- Retornar el paquete vendedor con información de plataforma y tipo
    RETURN QUERY 
    SELECT 
        ps.id,
        ps.name,
        ps.credit,
        ps.platform_id,
        p.name as platform_name,
        ps.package_type_id,
        pt.name as package_type_name,
        ps.status,
        ps.created_at,
        ps.updated_at,
        TRUE as success,
        'Paquete vendedor obtenido exitosamente'::TEXT as message
    FROM package_seller ps
    LEFT JOIN platform p ON ps.platform_id = p.id
    INNER JOIN package_type pt ON ps.package_type_id = pt.id
    WHERE ps.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para actualizar paquete vendedor (parámetros opcionales para actualizaciones parciales)
CREATE OR REPLACE FUNCTION sp_update_package_seller(
    p_id INTEGER,
    p_name VARCHAR(50) DEFAULT NULL,
    p_credit INTEGER DEFAULT NULL,
    p_package_type_id INTEGER DEFAULT NULL,
    p_platform_id INTEGER DEFAULT NULL,
    p_status INTEGER DEFAULT NULL
)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    credit INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    package_type_id INTEGER,
    package_type_name VARCHAR(50),
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_exists BOOLEAN := FALSE;
    v_name_exists BOOLEAN := FALSE;
    v_platform_exists BOOLEAN := FALSE;
    v_package_type_exists BOOLEAN := FALSE;
BEGIN
    -- Validar que el paquete vendedor exista
    SELECT EXISTS(SELECT 1 FROM package_seller WHERE package_seller.id = p_id) INTO v_exists;
    
    IF NOT v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::INTEGER, NULL::VARCHAR(50),
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'Paquete vendedor no encontrado'::TEXT;
        RETURN;
    END IF;
    
    -- Validar que el nombre no exista (solo si se proporciona un nuevo nombre)
    IF p_name IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM package_seller WHERE package_seller.name = p_name AND package_seller.id != p_id) INTO v_name_exists;
        
        IF v_name_exists THEN
            RETURN QUERY SELECT 
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::INTEGER, NULL::VARCHAR(50),
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El nombre del paquete vendedor ya existe'::TEXT;
            RETURN;
        END IF;
    END IF;
    
    -- Validar que el package_type_id exista (solo si se proporciona uno nuevo)
    IF p_package_type_id IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM package_type WHERE package_type.id = p_package_type_id) INTO v_package_type_exists;
        
        IF NOT v_package_type_exists THEN
            RETURN QUERY SELECT 
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::INTEGER, NULL::VARCHAR(50),
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El tipo de paquete especificado no existe'::TEXT;
            RETURN;
        END IF;
    END IF;
    
    -- Validar platform_id si se proporciona (solo validar si no es NULL)
    IF p_platform_id IS NOT NULL THEN
        SELECT EXISTS(SELECT 1 FROM platform WHERE platform.id = p_platform_id) INTO v_platform_exists;
        
        IF NOT v_platform_exists THEN
            RETURN QUERY SELECT 
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::INTEGER, NULL::VARCHAR(50),
                NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'La plataforma especificada no existe'::TEXT;
            RETURN;
        END IF;
    END IF;
    
    -- Actualizar el paquete vendedor usando COALESCE para mantener valores actuales si no se proporcionan nuevos
    UPDATE package_seller 
    SET name = COALESCE(p_name, name), 
        credit = COALESCE(p_credit, credit), 
        package_type_id = COALESCE(p_package_type_id, package_type_id),
        platform_id = COALESCE(p_platform_id, platform_id), 
        status = COALESCE(p_status, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE package_seller.id = p_id;
    
    -- Retornar el paquete actualizado
    RETURN QUERY 
    SELECT 
        ps.id,
        ps.name,
        ps.credit,
        ps.platform_id,
        p.name as platform_name,
        ps.package_type_id,
        pt.name as package_type_name,
        ps.status,
        ps.created_at,
        ps.updated_at,
        TRUE as success,
        'Paquete vendedor actualizado exitosamente'::TEXT as message
    FROM package_seller ps
    LEFT JOIN platform p ON ps.platform_id = p.id
    INNER JOIN package_type pt ON ps.package_type_id = pt.id
    WHERE ps.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para cambiar status de paquete vendedor
CREATE OR REPLACE FUNCTION sp_change_package_seller_status(
    p_id INTEGER,
    p_status INTEGER
)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    credit INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    package_type_id INTEGER,
    package_type_name VARCHAR(50),
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_exists BOOLEAN := FALSE;
BEGIN
    -- Validar que el paquete vendedor exista
    SELECT EXISTS(SELECT 1 FROM package_seller WHERE package_seller.id = p_id) INTO v_exists;
    
    IF NOT v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::INTEGER, NULL::VARCHAR(50),
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'Paquete vendedor no encontrado'::TEXT;
        RETURN;
    END IF;
    
    -- Actualizar el status
    UPDATE package_seller 
    SET status = p_status, updated_at = CURRENT_TIMESTAMP
    WHERE package_seller.id = p_id;
    
    -- Retornar el paquete actualizado
    RETURN QUERY 
    SELECT 
        ps.id,
        ps.name,
        ps.credit,
        ps.platform_id,
        p.name as platform_name,
        ps.package_type_id,
        pt.name as package_type_name,
        ps.status,
        ps.created_at,
        ps.updated_at,
        TRUE as success,
        'Status del paquete vendedor actualizado exitosamente'::TEXT as message
    FROM package_seller ps
    LEFT JOIN platform p ON ps.platform_id = p.id
    INNER JOIN package_type pt ON ps.package_type_id = pt.id
    WHERE ps.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para eliminar paquete vendedor
CREATE OR REPLACE FUNCTION sp_delete_package_seller(p_id INTEGER)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_exists BOOLEAN := FALSE;
BEGIN
    -- Validar que el paquete vendedor exista
    SELECT EXISTS(SELECT 1 FROM package_seller WHERE package_seller.id = p_id) INTO v_exists;
    
    IF NOT v_exists THEN
        RETURN QUERY SELECT FALSE, 'Paquete vendedor no encontrado'::TEXT;
        RETURN;
    END IF;
    
    -- Eliminar el paquete vendedor
    DELETE FROM package_seller WHERE package_seller.id = p_id;
    
    RETURN QUERY SELECT TRUE, 'Paquete vendedor eliminado exitosamente'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure para crear paquete de usuario
CREATE OR REPLACE FUNCTION sp_create_package_user(
    p_name VARCHAR(50),
    p_package_type_id INTEGER,
    p_platform_id INTEGER,
    p_duration_value INTEGER,
    p_duration_type VARCHAR(10),
    p_max_devices INTEGER DEFAULT 1,
    p_discount_credits BOOLEAN DEFAULT TRUE
)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    package_type_id INTEGER,
    package_type_name VARCHAR(50),
    max_devices INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    duration_value INTEGER,
    duration_type VARCHAR(10),
    discount_credits BOOLEAN,
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_package_user_id INTEGER;
    v_exists BOOLEAN := FALSE;
BEGIN
    -- Validaciones
    IF p_name IS NULL OR TRIM(p_name) = '' THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El nombre del paquete es requerido'::TEXT;
        RETURN;
    END IF;

    IF p_package_type_id IS NULL THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El tipo de paquete es requerido'::TEXT;
        RETURN;
    END IF;

    IF p_platform_id IS NULL THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'La plataforma es requerida'::TEXT;
        RETURN;
    END IF;

    IF p_duration_value IS NULL OR p_duration_value <= 0 THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'La duración debe ser mayor a 0'::TEXT;
        RETURN;
    END IF;

    IF p_duration_type NOT IN ('days', 'hours') THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El tipo de duración debe ser "days" o "hours"'::TEXT;
        RETURN;
    END IF;

    IF p_max_devices <= 0 OR p_max_devices > 3 THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El número máximo de dispositivos debe estar entre 1 y 3'::TEXT;
        RETURN;
    END IF;

    -- Verificar que existe el package_type
    SELECT EXISTS(SELECT 1 FROM package_type WHERE package_type.id = p_package_type_id) INTO v_exists;
    IF NOT v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'El tipo de paquete especificado no existe'::TEXT;
        RETURN;
    END IF;

    -- Verificar que existe la plataforma
    SELECT EXISTS(SELECT 1 FROM platform WHERE platform.id = p_platform_id) INTO v_exists;
    IF NOT v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'La plataforma especificada no existe'::TEXT;
        RETURN;
    END IF;

    -- Verificar que no existe un paquete con el mismo nombre
    SELECT EXISTS(SELECT 1 FROM package_user WHERE package_user.name = p_name) INTO v_exists;
    IF v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'Ya existe un paquete con este nombre'::TEXT;
        RETURN;
    END IF;

    -- Insertar el paquete
    INSERT INTO package_user (
        name, 
        package_type_id, 
        max_devices, 
        platform_id, 
        duration_value, 
        duration_type, 
        discount_credits
    ) VALUES (
        p_name, 
        p_package_type_id, 
        p_max_devices, 
        p_platform_id, 
        p_duration_value, 
        p_duration_type, 
        p_discount_credits
    ) RETURNING package_user.id INTO v_package_user_id;

    -- Retornar el paquete creado con información de plataforma y tipo
    RETURN QUERY 
    SELECT 
        pu.id,
        pu.name,
        pu.package_type_id,
        pt.name as package_type_name,
        pu.max_devices,
        pu.platform_id,
        p.name as platform_name,
        pu.duration_value,
        pu.duration_type,
        pu.discount_credits,
        pu.status,
        pu.created_at,
        pu.updated_at,
        TRUE as success,
        'Paquete de usuario creado exitosamente'::TEXT as message
    FROM package_user pu
    LEFT JOIN package_type pt ON pu.package_type_id = pt.id
    LEFT JOIN platform p ON pu.platform_id = p.id
    WHERE pu.id = v_package_user_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, ('Error interno del servidor: ' || SQLERRM)::TEXT;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 2. OBTENER PACKAGE_USER POR ID
-- =====================================================
CREATE OR REPLACE FUNCTION sp_get_package_user_by_id(p_id INTEGER)
RETURNS TABLE(
    id INTEGER,
    name VARCHAR(50),
    package_type_id INTEGER,
    package_type_name VARCHAR(50),
    max_devices INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    duration_value INTEGER,
    duration_type VARCHAR(10),
    discount_credits BOOLEAN,
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_exists BOOLEAN := FALSE;
BEGIN
    -- Validar que el ID sea válido
    IF p_id IS NULL OR p_id <= 0 THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'ID del paquete inválido'::TEXT;
        RETURN;
    END IF;

    -- Verificar que el paquete de usuario exista
    SELECT EXISTS(SELECT 1 FROM package_user WHERE package_user.id = p_id) INTO v_exists;
    
    IF NOT v_exists THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, 'Paquete de usuario no encontrado'::TEXT;
        RETURN;
    END IF;

    -- Retornar el paquete de usuario con información completa
    RETURN QUERY 
    SELECT 
        pu.id,
        pu.name,
        pu.package_type_id,
        pt.name as package_type_name,
        pu.max_devices,
        pu.platform_id,
        p.name as platform_name,
        pu.duration_value,
        pu.duration_type,
        pu.discount_credits,
        pu.status,
        pu.created_at,
        pu.updated_at,
        TRUE as success,
        'Paquete de usuario encontrado'::TEXT as message
    FROM package_user pu
    LEFT JOIN package_type pt ON pu.package_type_id = pt.id
    LEFT JOIN platform p ON pu.platform_id = p.id
    WHERE pu.id = p_id;

EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT 
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER,
            NULL::INTEGER, NULL::VARCHAR(50), NULL::INTEGER, NULL::VARCHAR(10), NULL::BOOLEAN,
            NULL::INTEGER, NULL::TIMESTAMP, NULL::TIMESTAMP, FALSE, ('Error interno del servidor: ' || SQLERRM)::TEXT;
END;
$$ LANGUAGE plpgsql;

