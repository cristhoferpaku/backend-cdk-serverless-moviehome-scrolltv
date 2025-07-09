/**
 * DTOs para la función listPackageTypesActive
 */

/**
 * Respuesta del stored procedure sp_list_package_types_active
 */
export interface PackageTypeActiveRecord {
  id: number;
  name: string;
}

/**
 * Respuesta exitosa de la API
 */
export interface ListPackageTypesActiveResponse {
  packageTypes: PackageTypeActiveRecord[];
  total: number;
}

/**
 * Respuesta de error
 */
export interface ListPackageTypesActiveError {
  success: false;
  message: string;
} 