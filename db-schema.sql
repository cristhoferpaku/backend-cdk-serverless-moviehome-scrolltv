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




CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    -- Paquete asignado actualmente
    package_user_id INTEGER NOT NULL,
    -- Plataforma en la que opera
    platform_id INTEGER NOT NULL,
    -- Estado del usuario
    status INTEGER NOT NULL DEFAULT 1, -- 0: inactivo, 1: activo, 2: suspendido
    -- Flag que indica si el servicio ya empezó
    service_started BOOLEAN NOT NULL DEFAULT FALSE,
    -- Fechas de vigencia del paquete
    start_date TIMESTAMP,
    expiration_date TIMESTAMP,
    -- Puede cambiar de paquete
    can_change_package BOOLEAN NOT NULL DEFAULT TRUE,
    -- Usuario administrador que creó la cuenta
    user_admin_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_user_id) REFERENCES package_user(id),
    FOREIGN KEY (platform_id) REFERENCES platform(id),
    FOREIGN KEY (user_admin_id) REFERENCES user_admin(id),
    CONSTRAINT user_account_status_check CHECK (status IN (0, 1, 2))
);

-- Tabla de dispositivos
CREATE TABLE user_device (
    id SERIAL PRIMARY KEY,
    user_account_id INTEGER NOT NULL,
    device_identifier VARCHAR(255), -- Ej: UUID, MAC address o token único
    FOREIGN KEY (user_account_id) REFERENCES user_account(id),
    -- Cada usuario no puede tener dispositivos duplicados registrados
    CONSTRAINT user_device_unique UNIQUE (user_account_id, device_identifier)
);


-- tabla de creditos de vendedor
CREATE TABLE seller_credit (
    id SERIAL PRIMARY KEY,
    user_admin_id INTEGER NOT NULL, -- Usuario administrador que gestiona los créditos (solo vendedor y revendedor)
    credit INTEGER NOT NULL DEFAULT 0, -- Créditos disponibles
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_admin_id) REFERENCES user_admin(id)
);

-- Tabla de transacciones de créditos (solo vendedor y revendedor)- venta de paquete
CREATE TABLE credit_transaction_seller (
    id SERIAL PRIMARY KEY,
    user_admin_id INTEGER NOT NULL, -- Usuario administrador que gestiona los créditos
    seller_credit_id INTEGER NOT NULL, -- Crédito del vendedor asociado
    package_seller_id INTEGER NOT NULL, -- Paquete vendido
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_admin_id) REFERENCES user_admin(id),
    FOREIGN KEY (seller_credit_id) REFERENCES seller_credit(id),
    FOREIGN KEY (package_seller_id) REFERENCES package_seller(id)
);

-- Tabla de recursos
CREATE TABLE resource (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unlinked VARCHAR(255),
    downloader VARCHAR(255),
    url VARCHAR(255),
    platform_id INTEGER NOT NULL,
    status INTEGER NOT NULL DEFAULT 1, -- 0: inactivo, 1: activo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (platform_id) REFERENCES platform(id),
    CONSTRAINT resource_status_check CHECK (status IN (0, 1))
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

-- Stored procedure para obtener recurso por ID
CREATE OR REPLACE FUNCTION sp_get_resource_by_id(
    p_id INTEGER
)
RETURNS TABLE (
    id INTEGER,
    name VARCHAR(100),
    image VARCHAR(255),
    unlinked VARCHAR(255),
    downloader VARCHAR(255),
    url VARCHAR(255),
    state INTEGER,
    platform_id INTEGER,
    platform_name VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
) AS $$
BEGIN
    -- Verificar si el recurso existe
    IF NOT EXISTS (SELECT 1 FROM resource WHERE resource.id = p_id) THEN
        RETURN QUERY SELECT 
            NULL::INTEGER,
            NULL::VARCHAR(100),
            NULL::VARCHAR(255),
            NULL::VARCHAR(255),
            NULL::VARCHAR(255),
            NULL::VARCHAR(255),
            NULL::INTEGER,
            NULL::INTEGER,
            NULL::VARCHAR(50),
            NULL::TIMESTAMP,
            NULL::TIMESTAMP,
            FALSE,
            'Recurso no encontrado'::TEXT;
        RETURN;
    END IF;

    -- Retornar el recurso con información de la plataforma
    RETURN QUERY
    SELECT 
        r.id,
        r.name,
        NULL::VARCHAR(255) as image, -- Campo image no existe en la tabla actual
        r.unlinked,
        r.downloader,
        r.url,
        r.status as state,
        r.platform_id,
        p.name as platform_name,
        r.created_at,
        r.updated_at,
        TRUE as success,
        'Recurso obtenido exitosamente'::TEXT as message
    FROM resource r
    INNER JOIN platform p ON r.platform_id = p.id
    WHERE r.id = p_id;

EXCEPTION
    WHEN OTHERS THEN
        RETURN QUERY SELECT 
            NULL::INTEGER,
            NULL::VARCHAR(100),
            NULL::VARCHAR(255),
            NULL::VARCHAR(255),
            NULL::VARCHAR(255),
            NULL::VARCHAR(255),
            NULL::INTEGER,
            NULL::INTEGER,
            NULL::VARCHAR(50),
            NULL::TIMESTAMP,
            NULL::TIMESTAMP,
            FALSE,
            ('Error interno: ' || SQLERRM)::TEXT;
END;
$$ LANGUAGE plpgsql;

