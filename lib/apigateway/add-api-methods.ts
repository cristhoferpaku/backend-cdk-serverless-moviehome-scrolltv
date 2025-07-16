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
}
