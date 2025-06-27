import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';

/**
 * Interfaz para respuesta estándar de la API
 */
export interface StandardApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: string;
  path: string;
}

/**
 * Construye una respuesta HTTP estándar para API Gateway
 */
export function buildResponse(
  statusCode: number,
  body: any,
  headers?: { [key: string]: string }
): APIGatewayProxyResult {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    ...headers,
  };

  return {
    statusCode,
    headers: defaultHeaders,
    body: JSON.stringify(body),
  };
}

/**
 * Construye una respuesta estándar exitosa
 */
export function createSuccessResponse(
  data: any,
  message: string,
  event: APIGatewayProxyEvent,
  statusCode: number = 200
): APIGatewayProxyResult {
  const response: StandardApiResponse = {
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
    path: event.path || event.resource || '',
  };

  return buildResponse(statusCode, response);
}

/**
 * Construye una respuesta estándar de error
 */
export function createErrorResponse(
  message: string,
  event: APIGatewayProxyEvent,
  statusCode: number = 500,
  data: any = {}
): APIGatewayProxyResult {
  const response: StandardApiResponse = {
    success: false,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
    path: event.path || event.resource || '',
  };

  return buildResponse(statusCode, response);
}

/**
 * @deprecated Usar createSuccessResponse en su lugar
 * Construye una respuesta de éxito
 */
export function successResponse(data: any, message?: string): APIGatewayProxyResult {
  return buildResponse(200, {
    success: true,
    message: message || 'Operación exitosa',
    data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Construye una respuesta de error
 */
export function errorResponse(
  statusCode: number,
  error: string,
  details?: any
): APIGatewayProxyResult {
  return buildResponse(statusCode, {
    success: false,
    error,
    details: details || null,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Construye una respuesta de error de validación
 */
export function validationErrorResponse(errors: string[]): APIGatewayProxyResult {
  return buildResponse(400, {
    success: false,
    error: 'Errores de validación',
    validationErrors: errors,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Construye una respuesta de no autorizado
 */
export function unauthorizedResponse(message?: string): APIGatewayProxyResult {
  return buildResponse(401, {
    success: false,
    error: message || 'No autorizado',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Construye una respuesta de no encontrado
 */
export function notFoundResponse(resource?: string): APIGatewayProxyResult {
  return buildResponse(404, {
    success: false,
    error: `${resource || 'Recurso'} no encontrado`,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Construye una respuesta de error interno del servidor
 */
export function internalServerErrorResponse(error?: string): APIGatewayProxyResult {
  return buildResponse(500, {
    success: false,
    error: 'Error interno del servidor',
    details: error || null,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Registra un error con contexto adicional
 */
export function logError(
  functionName: string,
  error: Error | string,
  context?: any
): void {
  const errorInfo = {
    function: functionName,
    error: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : undefined,
    context: context || {},
    timestamp: new Date().toISOString(),
  };

  console.error('Lambda Error:', JSON.stringify(errorInfo, null, 2));
}

/**
 * Registra información general
 */
export function logInfo(functionName: string, message: string, data?: any): void {
  const logInfo = {
    function: functionName,
    message,
    data: data || {},
    timestamp: new Date().toISOString(),
  };

  console.log('Lambda Info:', JSON.stringify(logInfo, null, 2));
}

/**
 * Parsea el cuerpo de una petición HTTP
 */
export function parseRequestBody<T>(body: string | null): T | null {
  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body) as T;
  } catch (error) {
    throw new Error('Cuerpo de la petición no es un JSON válido');
  }
}

/**
 * Valida que los campos requeridos estén presentes
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): string[] {
  const errors: string[] = [];

  for (const field of requiredFields) {
    if (!data[field] && data[field] !== 0 && data[field] !== false) {
      errors.push(`El campo '${field}' es requerido`);
    }
  }

  return errors;
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Genera un ID único
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formatea una fecha para la base de datos
 */
export function formatDateForDB(date: Date): string {
  return date.toISOString();
}

/**
 * Sanitiza un string para prevenir inyección SQL
 */
export function sanitizeString(input: string): string {
  return input.replace(/['"\\]/g, '\\$&');
}

/**
 * Extrae el token JWT del header Authorization
 */
export function extractJWTToken(authorizationHeader?: string): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const match = authorizationHeader.match(/^Bearer (.+)$/);
  return match ? match[1] : null;
}

/**
 * Maneja timeout de operaciones asíncronas
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage?: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(errorMessage || `Operación expiró después de ${timeoutMs}ms`));
      }, timeoutMs);
    }),
  ]);
}

/**
 * Helpers específicos para respuestas estándar
 */

// Respuestas de éxito (2xx)
export function createOkResponse(data: any, message: string, event: APIGatewayProxyEvent) {
  return createSuccessResponse(data, message, event, 200);
}

export function createCreatedResponse(data: any, message: string, event: APIGatewayProxyEvent) {
  return createSuccessResponse(data, message, event, 201);
}

export function createNoContentResponse(message: string, event: APIGatewayProxyEvent) {
  return createSuccessResponse({}, message, event, 204);
}

// Respuestas de error del cliente (4xx)
export function createBadRequestResponse(message: string, event: APIGatewayProxyEvent, data: any = {}) {
  return createErrorResponse(message, event, 400, data);
}

export function createUnauthorizedResponse(message: string = 'No autorizado', event: APIGatewayProxyEvent) {
  return createErrorResponse(message, event, 401);
}

export function createForbiddenResponse(message: string = 'Acceso prohibido', event: APIGatewayProxyEvent) {
  return createErrorResponse(message, event, 403);
}

export function createNotFoundResponse(message: string = 'Recurso no encontrado', event: APIGatewayProxyEvent) {
  return createErrorResponse(message, event, 404);
}

export function createConflictResponse(message: string, event: APIGatewayProxyEvent, data: any = {}) {
  return createErrorResponse(message, event, 409, data);
}

export function createValidationErrorResponse(message: string, validationErrors: string[], event: APIGatewayProxyEvent) {
  return createErrorResponse(message, event, 422, { validationErrors });
}

// Respuestas de error del servidor (5xx)
export function createInternalServerErrorResponse(message: string = 'Error interno del servidor', event: APIGatewayProxyEvent, data: any = {}) {
  return createErrorResponse(message, event, 500, data);
} 