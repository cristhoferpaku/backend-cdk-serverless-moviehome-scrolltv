import { Pool, PoolClient, QueryResult } from 'pg';
import secretsManagerConnector from './secretsManagerConnector';

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
}

class DatabaseConnector {
  private pool: Pool | null = null;
  private config: DatabaseConfig | null = null;

  constructor() {
    // No necesitamos inicializar clientes aquí, se hace en secretsManagerConnector
  }

  /**
   * Obtiene la configuración de la base de datos desde Secrets Manager
   */
  private async getDatabaseConfig(): Promise<DatabaseConfig> {
    if (this.config) {
      return this.config;
    }

    try {
      console.log('Obteniendo configuración de base de datos desde Secrets Manager...');
      this.config = await secretsManagerConnector.getDatabaseConfig();
      
      console.log('Configuración de base de datos cargada exitosamente');
      return this.config;
    } catch (error) {
      console.error('Error obteniendo configuración de base de datos:', error);
      throw new Error('No se pudo obtener la configuración de la base de datos');
    }
  }

  /**
   * Inicializa el pool de conexiones
   */
  private async initializePool(): Promise<Pool> {
    if (this.pool) {
      return this.pool;
    }

    const config = await this.getDatabaseConfig();

    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      max: 10, // máximo número de clientes en el pool
      idleTimeoutMillis: 30000, // cerrar clientes inactivos después de 30 segundos
      connectionTimeoutMillis: 2000, // timeout para obtener conexión
    });

    // Event listeners para monitoreo
    this.pool.on('error', (err) => {
      console.error('Error inesperado en el pool de conexiones:', err);
    });

    this.pool.on('connect', () => {
      console.log('Nueva conexión establecida con PostgreSQL');
    });

    return this.pool;
  }

  /**
   * Ejecuta una query en la base de datos
   */
  async query(text: string, params?: any[]): Promise<QueryResult> {
    const pool = await this.initializePool();
    const start = Date.now();

    try {
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      
      console.log('Query ejecutada:', { 
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        duration: `${duration}ms`,
        rows: result.rowCount,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - start;
      console.error('Error en query:', {
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        duration: `${duration}ms`,
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
      throw error;
    }
  }

  /**
   * Obtiene un cliente del pool para transacciones
   */
  async getClient(): Promise<PoolClient> {
    const pool = await this.initializePool();
    return pool.connect();
  }

  /**
   * Ejecuta una función dentro de una transacción
   */
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.getClient();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Cierra todas las conexiones del pool
   */
  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log('Pool de conexiones cerrado');
    }
  }

  /**
   * Verifica si la conexión está activa
   */
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.query('SELECT 1 as health');
      return result.rows.length > 0 && result.rows[0].health === 1;
    } catch (error) {
      console.error('Health check falló:', error);
      return false;
    }
  }
}

// Instancia singleton del conector
const dbConnector = new DatabaseConnector();

export default dbConnector; 