import { RestApi, AuthorizationType } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { addApiMethodsWithLambda } from '../lambda/helpers/add-api-methods';
import { ArnFunctions } from '../lambda/helpers/arn-functions';

interface AddAllApiMethodsProps {
  restApi: RestApi;
  authorizer?: any;
  scope: Construct;
}

/**
 * Agregar todos los métodos del API siguiendo el patrón establecido
 */
export function addAllApiMethods(props: AddAllApiMethodsProps): void {
  const { restApi, authorizer, scope } = props;

  // Admin Login routes
  const adminLoginFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.ADMIN_LOGIN_FUNCTION_ARN,
    "ImportedAdminLoginFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: adminLoginFunction,
    authorizer,
    resourcePath: 'auth/login',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });

  // Refresh Token routes
  const refreshTokenFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.REFRESH_TOKEN_FUNCTION_ARN,
    "ImportedRefreshTokenFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: refreshTokenFunction,
    authorizer,
    resourcePath: 'auth/refresh-token',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });
 // List User Admins routes
 const listUserAdminsFunction = ArnFunctions.getLambdaFunctionFromArn(
  scope,
  ArnFunctions.LIST_USER_ADMINS_FUNCTION_ARN,
  "ImportedListUserAdminsFunction"
);

addApiMethodsWithLambda({
  restApi,
  lambdaFunction: listUserAdminsFunction,
  authorizer,
  resourcePath: 'admin/admin-users',
  methods: [
    {
      method: 'GET',
      authorizationType: AuthorizationType.NONE, // JWT validado en handler
      useAuthorizer: false,
      queryParameters: ['search', 'roleId', 'page', 'limit'],
    },
  ],
});
  // Create User Admin routes
  const createUserAdminFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_USER_ADMIN_FUNCTION_ARN,
    "ImportedCreateUserAdminFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createUserAdminFunction,
    authorizer,
    resourcePath: 'admin/admin-users',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get User Admin By ID routes

  const getUserAdminByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_USER_ADMIN_BY_ID_FUNCTION_ARN,
    "ImportedGetUserAdminByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getUserAdminByIdFunction,
    authorizer,
    resourcePath: 'admin/admin-users/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update User Admin routes
  const updateUserAdminFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_USER_ADMIN_FUNCTION_ARN,
    "ImportedUpdateUserAdminFunction"
  );

  addApiMethodsWithLambda({ 
    restApi,
    lambdaFunction: updateUserAdminFunction,
    authorizer,
    resourcePath: 'admin/admin-users/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete User Admin routes
  const deleteUserAdminFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_USER_ADMIN_FUNCTION_ARN,
    "ImportedDeleteUserAdminFunction"
  );
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteUserAdminFunction,
    authorizer,
    resourcePath: 'admin/admin-users/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change User Admin Status routes
  const changeUserAdminStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_USER_ADMIN_STATUS_FUNCTION_ARN,
    "ImportedChangeUserAdminStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi, 
    lambdaFunction: changeUserAdminStatusFunction,
    authorizer,
    resourcePath: 'admin/admin-users/{id}/status',
    methods: [
      {
        method: 'PATCH',  
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

    // Get Platforms routes
  const getPlatformsFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_PLATFORMS_FUNCTION_ARN,
    "ImportedGetPlatformsFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getPlatformsFunction,
    authorizer,
    resourcePath: 'admin/platforms',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Roles routes
  const getRolesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_ROLES_FUNCTION_ARN,
    "ImportedGetRolesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getRolesFunction,
    authorizer,
    resourcePath: 'admin/roles',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Package Seller routes
  const createPackageSellerFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_PACKAGE_SELLER_FUNCTION_ARN,
    "ImportedCreatePackageSellerFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createPackageSellerFunction,
    authorizer,
    resourcePath: 'admin/packages/seller',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Package Type routes
  const createPackageTypeFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_PACKAGE_TYPE_FUNCTION_ARN,
    "ImportedCreatePackageTypeFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createPackageTypeFunction,
    authorizer,
    resourcePath: 'admin/packages/type',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Package Types routes
  const listPackageTypesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_PACKAGE_TYPES_FUNCTION_ARN,
    "ImportedListPackageTypesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listPackageTypesFunction,
    authorizer,
    resourcePath: 'admin/packages/type',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'page', 'pageSize'],
      },
    ],
  });

  // Get Package Type By ID routes
  const getPackageTypeByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_PACKAGE_TYPE_BY_ID_FUNCTION_ARN,
    "ImportedGetPackageTypeByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getPackageTypeByIdFunction,
    authorizer,
    resourcePath: 'admin/packages/type/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Package Type routes
  const deletePackageTypeFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_PACKAGE_TYPE_FUNCTION_ARN,
    "ImportedDeletePackageTypeFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deletePackageTypeFunction,
    authorizer,
    resourcePath: 'admin/packages/type/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Package Type routes
  const updatePackageTypeFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_PACKAGE_TYPE_FUNCTION_ARN,
    "ImportedUpdatePackageTypeFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updatePackageTypeFunction,
    authorizer,
    resourcePath: 'admin/packages/type/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Package Type Status routes
  const changePackageTypeStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_PACKAGE_TYPE_STATUS_FUNCTION_ARN,
    "ImportedChangePackageTypeStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changePackageTypeStatusFunction,
    authorizer,
    resourcePath: 'admin/packages/type/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Package Seller routes
  const listPackageSellerFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_PACKAGE_SELLER_FUNCTION_ARN,
    "ImportedListPackageSellerFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listPackageSellerFunction,
    authorizer,
    resourcePath: 'admin/packages/seller',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'page', 'pageSize'],
      },
    ],
  });

  // Get Package Seller By ID routes
  const getPackageSellerByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_PACKAGE_SELLER_BY_ID_FUNCTION_ARN,
    "ImportedGetPackageSellerByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getPackageSellerByIdFunction,
    authorizer,
    resourcePath: 'admin/packages/seller/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Package Seller routes
  const updatePackageSellerFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_PACKAGE_SELLER_FUNCTION_ARN,
    "ImportedUpdatePackageSellerFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updatePackageSellerFunction,
    authorizer,
    resourcePath: 'admin/packages/seller/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Package Seller routes
  const deletePackageSellerFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_PACKAGE_SELLER_FUNCTION_ARN,
    "ImportedDeletePackageSellerFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deletePackageSellerFunction,
    authorizer,
    resourcePath: 'admin/packages/seller/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Package Seller Status routes
  const changePackageSellerStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_PACKAGE_SELLER_STATUS_FUNCTION_ARN,
    "ImportedChangePackageSellerStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changePackageSellerStatusFunction,
    authorizer,
    resourcePath: 'admin/packages/seller/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Package User routes
  const createPackageUserFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_PACKAGE_USER_FUNCTION_ARN,
    "ImportedCreatePackageUserFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createPackageUserFunction,
    authorizer,
    resourcePath: 'admin/packages/user',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Package User By ID routes
  const getPackageUserByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_PACKAGE_USER_BY_ID_FUNCTION_ARN,
    "ImportedGetPackageUserByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getPackageUserByIdFunction,
    authorizer,
    resourcePath: 'admin/packages/user/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Package Users routes
  const listPackageUsersFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_PACKAGE_USERS_FUNCTION_ARN,
    "ImportedListPackageUsersFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listPackageUsersFunction,
    authorizer,
    resourcePath: 'admin/packages/user',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'page', 'limit'],
      },
    ],
  });

  // Update Package User routes
  const updatePackageUserFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_PACKAGE_USER_FUNCTION_ARN,
    "ImportedUpdatePackageUserFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updatePackageUserFunction,
    authorizer,
    resourcePath: 'admin/packages/user/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Package User routes
  const deletePackageUserFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_PACKAGE_USER_FUNCTION_ARN,
    "ImportedDeletePackageUserFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deletePackageUserFunction,
    authorizer,
    resourcePath: 'admin/packages/user/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Package User Status routes
  const changePackageUserStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_PACKAGE_USER_STATUS_FUNCTION_ARN,
    "ImportedChangePackageUserStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changePackageUserStatusFunction,
    authorizer,
    resourcePath: 'admin/packages/user/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Package Types Active routes
  const listPackageTypesActiveFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_PACKAGE_TYPES_ACTIVE_FUNCTION_ARN,
    "ImportedListPackageTypesActiveFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listPackageTypesActiveFunction,
    authorizer,
    resourcePath: 'admin/packages/type/active',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create User Account routes
  const createUserAccountFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_USER_ACCOUNT_FUNCTION_ARN,
    "ImportedCreateUserAccountFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createUserAccountFunction,
    authorizer,
    resourcePath: 'admin/user-account',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get User Account By ID routes

  const getUserAccountByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_USER_ACCOUNT_BY_ID_FUNCTION_ARN,
    "ImportedGetUserAccountByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getUserAccountByIdFunction,
    authorizer,
    resourcePath: 'admin/user-account/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,

      },
    ],
  });

  // List User Accounts routes
  const listUserAccountsFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_USER_ACCOUNTS_FUNCTION_ARN,
    "ImportedListUserAccountsFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listUserAccountsFunction,
    authorizer,
    resourcePath: 'admin/user-account',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search','status' ,'page', 'limit' ],
      },
    ],
  });

  // Update User Account routes
  const updateUserAccountFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_USER_ACCOUNT_FUNCTION_ARN,
    "ImportedUpdateUserAccountFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateUserAccountFunction,
    authorizer,
    resourcePath: 'admin/user-account/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
       },
     ],
   });
  
  // Delete User Account routes
  const deleteUserAccountFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_USER_ACCOUNT_FUNCTION_ARN,
    "ImportedDeleteUserAccountFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteUserAccountFunction,
    authorizer,
    resourcePath: 'admin/user-account/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        },
    ],
  });

  // Change User Account Status routes
  const changeUserAccountStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_USER_ACCOUNT_STATUS_FUNCTION_ARN,
    "ImportedChangeUserAccountStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changeUserAccountStatusFunction,
    authorizer,
    resourcePath: 'admin/user-account/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List User Account By Admin routes
  const listUserAccountByAdminFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_USER_ACCOUNT_BY_ADMIN_FUNCTION_ARN,
    "ImportedListUserAccountByAdminFunction"
  );
  
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listUserAccountByAdminFunction,
    authorizer,
    resourcePath: 'admin/user-account/admin',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'status', 'page', 'limit'],
      },
    ],
  });

  // Assign Seller Credit routes
  const assignSellerCreditFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.ASSIGN_SELLER_CREDIT_FUNCTION_ARN,
    "ImportedAssignSellerCreditFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: assignSellerCreditFunction,
    authorizer,
    resourcePath: 'admin/assign-seller-credit',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Resource routes
  const createResourceFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_RESOURCE_FUNCTION_ARN,
    "ImportedCreateResourceFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createResourceFunction,
    authorizer,
    resourcePath: 'admin/resource',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Resource routes
  const listResourceFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_RESOURCE_FUNCTION_ARN,
    "ImportedListResourceFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listResourceFunction,
    authorizer,
    resourcePath: 'admin/resource',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'state', 'page', 'limit'],
      },
    ],
  });

  // Get Resource By ID routes
  const getResourceByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_RESOURCE_BY_ID_FUNCTION_ARN,
    "ImportedGetResourceByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getResourceByIdFunction,
    authorizer,
    resourcePath: 'admin/resource/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Resource State routes
  const changeResourceStateFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_RESOURCE_STATE_FUNCTION_ARN,
    "ImportedChangeResourceStateFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changeResourceStateFunction,
    authorizer,
    resourcePath: 'admin/resource/{id}/state',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });

  // Update Resource routes
  const updateResourceFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_RESOURCE_FUNCTION_ARN,
    "ImportedUpdateResourceFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateResourceFunction,
    authorizer,
    resourcePath: 'admin/resource/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });

  // Delete Resource routes
  const deleteResourceFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_RESOURCE_FUNCTION_ARN,
    "ImportedDeleteResourceFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteResourceFunction,
    authorizer,
    resourcePath: 'admin/resource/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });

  // Get Seller Credit routes
  const getSellerCreditFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_SELLER_CREDIT_BY_ID_FUNCTION_ARN,
    "ImportedGetSellerCreditFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getSellerCreditFunction,
    authorizer,
    resourcePath: 'admin/seller-credit',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Cast Members routes
  const listCastMembersFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_CAST_MEMBERS_FUNCTION_ARN,
    "ImportedListCastMembersFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listCastMembersFunction,
    authorizer,
    resourcePath: 'admin/cast-member',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'page', 'limit'],
      },
    ],
  });

  // Get Cast Member By ID routes
  const getCastMemberByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_CAST_MEMBER_BY_ID_FUNCTION_ARN,
    "ImportedGetCastMemberByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getCastMemberByIdFunction,
    authorizer,
    resourcePath: 'admin/cast-member/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Cast Member routes
  const createCastMemberFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_CAST_MEMBER_FUNCTION_ARN,
    "ImportedCreateCastMemberFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createCastMemberFunction,
    authorizer,
    resourcePath: 'admin/cast-member',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Cast Member routes
  const updateCastMemberFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_CAST_MEMBER_FUNCTION_ARN,
    "ImportedUpdateCastMemberFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateCastMemberFunction,
    authorizer,
    resourcePath: 'admin/cast-member/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Cast Member routes
  const deleteCastMemberFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_CAST_MEMBER_FUNCTION_ARN,
    "ImportedDeleteCastMemberFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteCastMemberFunction,
    authorizer,
    resourcePath: 'admin/cast-member/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List All Countries routes
  const listAllCountriesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_ALL_COUNTRIES_FUNCTION_ARN,
    "ImportedListAllCountriesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listAllCountriesFunction,
    authorizer,
    resourcePath: 'admin/countries',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // Sin autenticación requerida
        useAuthorizer: false,
      },
    ],
  });

  // Get All Sections routes
  const getAllSectionsFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_ALL_SECTIONS_FUNCTION_ARN,
    "ImportedGetAllSectionsFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getAllSectionsFunction,
    authorizer,
    resourcePath: 'admin/sections',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // Sin autenticación requerida
        useAuthorizer: false,
      },
    ],
  });

  // Collections Routes

  // List Collections routes
  const listCollectionsFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_COLLECTIONS_FUNCTION_ARN,
    "ImportedListCollectionsFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listCollectionsFunction,
    authorizer,
    resourcePath: 'admin/collections',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'status','page', 'limit'],
      },
    ],
  });

  // Get Collection By ID routes
  const getCollectionByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_COLLECTION_BY_ID_FUNCTION_ARN,
    "ImportedGetCollectionByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getCollectionByIdFunction,
    authorizer,
    resourcePath: 'admin/collections/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Collection routes
  const createCollectionFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_COLLECTION_FUNCTION_ARN,
    "ImportedCreateCollectionFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createCollectionFunction,
    authorizer,
    resourcePath: 'admin/collections',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Collection routes
  const updateCollectionFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_COLLECTION_FUNCTION_ARN,
    "ImportedUpdateCollectionFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateCollectionFunction,
    authorizer,
    resourcePath: 'admin/collections/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Collection routes
  const deleteCollectionFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_COLLECTION_FUNCTION_ARN,
    "ImportedDeleteCollectionFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteCollectionFunction,
    authorizer,
    resourcePath: 'admin/collections/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Collection Status routes
  const changeCollectionStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_COLLECTION_STATUS_FUNCTION_ARN,
    "ImportedChangeCollectionStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changeCollectionStatusFunction,
    authorizer,
    resourcePath: 'admin/collections/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get All Collections routes
  const getAllCollectionsFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_ALL_COLLECTIONS_FUNCTION_ARN,
    "ImportedGetAllCollectionsFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getAllCollectionsFunction,
    authorizer,
    resourcePath: 'admin/collections/all',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Multimedia Categories Routes

  // List Multimedia (Movies and Series) routes
  const listMultimediaFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_MULTIMEDIA_FUNCTION_ARN,
    "ImportedListMultimediaFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listMultimediaFunction,
    authorizer,
    resourcePath: 'admin/multimedia',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: [ 'search', 'status', 'page', 'limit'],
      },
    ],
  });

  // List Multimedia Categories routes
  const listMultimediaCategoriesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_MULTIMEDIA_CATEGORIES_FUNCTION_ARN,
    "ImportedListMultimediaCategoriesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listMultimediaCategoriesFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'status', 'page', 'limit'],
      },
    ],
  });

  // Get Multimedia Category By ID routes
  const getMultimediaCategoryByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_MULTIMEDIA_CATEGORY_BY_ID_FUNCTION_ARN,
    "ImportedGetMultimediaCategoryByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getMultimediaCategoryByIdFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Multimedia Category routes
  const createMultimediaCategoryFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_MULTIMEDIA_CATEGORY_FUNCTION_ARN,
    "ImportedCreateMultimediaCategoryFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createMultimediaCategoryFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Multimedia Category routes
  const updateMultimediaCategoryFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_MULTIMEDIA_CATEGORY_FUNCTION_ARN,
    "ImportedUpdateMultimediaCategoryFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateMultimediaCategoryFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Multimedia Category routes
  const deleteMultimediaCategoryFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_MULTIMEDIA_CATEGORY_FUNCTION_ARN,
    "ImportedDeleteMultimediaCategoryFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteMultimediaCategoryFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Multimedia Category Status routes
  const changeMultimediaCategoryStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_MULTIMEDIA_CATEGORY_STATUS_FUNCTION_ARN,
    "ImportedChangeMultimediaCategoryStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changeMultimediaCategoryStatusFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get All Multimedia Categories routes
  const getAllMultimediaCategoriesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_ALL_MULTIMEDIA_CATEGORIES_FUNCTION_ARN,
    "ImportedGetAllMultimediaCategoriesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getAllMultimediaCategoriesFunction,
    authorizer,
    resourcePath: 'admin/multimedia-categories/all',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Movies Routes

  // Create Movie routes
  const createMovieFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_MOVIE_FUNCTION_ARN,
    "ImportedCreateMovieFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createMovieFunction,
    authorizer,
    resourcePath: 'admin/movies',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Movie By ID routes
  const getMovieByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_MOVIE_BY_ID_FUNCTION_ARN,
    "ImportedGetMovieByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getMovieByIdFunction,
    authorizer,
    resourcePath: 'admin/movies/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Movie routes
  const deleteMovieFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_MOVIE_FUNCTION_ARN,
    "ImportedDeleteMovieFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteMovieFunction,
    authorizer,
    resourcePath: 'admin/movies/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Movie Status routes
  const changeMovieStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_MOVIE_STATUS_FUNCTION_ARN,
    "ImportedChangeMovieStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changeMovieStatusFunction,
    authorizer,
    resourcePath: 'admin/movies/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Movie routes
  const updateMovieFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_MOVIE_FUNCTION_ARN,
    "ImportedUpdateMovieFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateMovieFunction,
    authorizer,
    resourcePath: 'admin/movies/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Series Routes

  // Create Series routes
  const createSeriesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_SERIES_FUNCTION_ARN,
    "ImportedCreateSeriesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createSeriesFunction,
    authorizer,
    resourcePath: 'admin/series',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Series By ID routes
  const getSeriesByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_SERIES_BY_ID_FUNCTION_ARN,
    "ImportedGetSeriesByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getSeriesByIdFunction,
    authorizer,
    resourcePath: 'admin/series/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Series routes
  const deleteSeriesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_SERIES_FUNCTION_ARN,
    "ImportedDeleteSeriesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteSeriesFunction,
    authorizer,
    resourcePath: 'admin/series/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Change Series Status routes
  const changeSeriesStatusFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CHANGE_SERIES_STATUS_FUNCTION_ARN,
    "ImportedChangeSeriesStatusFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: changeSeriesStatusFunction,
    authorizer,
    resourcePath: 'admin/series/{id}/status',
    methods: [
      {
        method: 'PATCH',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Series routes
  const updateSeriesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_SERIES_FUNCTION_ARN,
    "ImportedUpdateSeriesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateSeriesFunction,
    authorizer,
    resourcePath: 'admin/series/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Seasons Routes

  // List Seasons routes
  const listSeasonsFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_SEASONS_FUNCTION_ARN,
    "ImportedListSeasonsFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listSeasonsFunction,
    authorizer,
    resourcePath: 'admin/seasons',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['serie_id'],
      },
    ],
  });

  // Create Season routes
  const createSeasonFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_SEASON_FUNCTION_ARN,
    "ImportedCreateSeasonFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createSeasonFunction,
    authorizer,
    resourcePath: 'admin/seasons',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Season By ID routes
  const getSeasonByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_SEASON_BY_ID_FUNCTION_ARN,
    "ImportedGetSeasonByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getSeasonByIdFunction,
    authorizer,
    resourcePath: 'admin/seasons/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Season routes
  const deleteSeasonFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_SEASON_FUNCTION_ARN,
    "ImportedDeleteSeasonFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteSeasonFunction,
    authorizer,
    resourcePath: 'admin/seasons/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });


  // Update Season routes
  const updateSeasonFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_SEASON_FUNCTION_ARN,
    "ImportedUpdateSeasonFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateSeasonFunction,
    authorizer,
    resourcePath: 'admin/seasons/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Episodes Routes

  // List Episodes routes
  const listEpisodesFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.LIST_EPISODES_FUNCTION_ARN,
    "ImportedListEpisodesFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: listEpisodesFunction,
    authorizer,
    resourcePath: 'admin/episodes',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['season_id'],
      },
    ],
  });

  // Create Episode routes
  const createEpisodeFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.CREATE_EPISODE_FUNCTION_ARN,
    "ImportedCreateEpisodeFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: createEpisodeFunction,
    authorizer,
    resourcePath: 'admin/episodes',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Episode By ID routes
  const getEpisodeByIdFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_EPISODE_BY_ID_FUNCTION_ARN,
    "ImportedGetEpisodeByIdFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getEpisodeByIdFunction,
    authorizer,
    resourcePath: 'admin/episodes/{id}',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Update Episode routes
  const updateEpisodeFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.UPDATE_EPISODE_FUNCTION_ARN,
    "ImportedUpdateEpisodeFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: updateEpisodeFunction,
    authorizer,
    resourcePath: 'admin/episodes/{id}',
    methods: [
      {
        method: 'PUT',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Episode routes
  const deleteEpisodeFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.DELETE_EPISODE_FUNCTION_ARN,
    "ImportedDeleteEpisodeFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: deleteEpisodeFunction,
    authorizer,
    resourcePath: 'admin/episodes/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Get Video Signature routes
  const getVideoSignatureFunction = ArnFunctions.getLambdaFunctionFromArn(
    scope,
    ArnFunctions.GET_VIDEO_SIGNATURE_FUNCTION_ARN,
    "ImportedGetVideoSignatureFunction"
  );

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: getVideoSignatureFunction,
    authorizer,
    resourcePath: 'admin/get-video-signature',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });
}
