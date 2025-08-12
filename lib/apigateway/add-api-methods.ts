import { RestApi, AuthorizationType } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { addApiMethodsWithLambda } from '../lambda/helpers/add-api-methods';

interface AddAllApiMethodsProps {
  restApi: RestApi;
  authorizer?: any;
  scope: Construct;
  lambdaFunctions: {
    adminLoginFunction: NodejsFunction;
    clientLoginFunction: NodejsFunction;
    refreshTokenFunction: NodejsFunction;
    listUserAdminsFunction: NodejsFunction;
    createUserAdminFunction: NodejsFunction;
    getUserAdminByIdFunction: NodejsFunction;
    updateUserAdminFunction: NodejsFunction;
    deleteUserAdminFunction: NodejsFunction;
    changeUserAdminStatusFunction: NodejsFunction;
    getPlatformsFunction: NodejsFunction;
    getRolesFunction: NodejsFunction;
    createPackageSellerFunction: NodejsFunction;
    createPackageTypeFunction: NodejsFunction;
    listPackageTypesFunction: NodejsFunction;
    getPackageTypeByIdFunction: NodejsFunction;
    deletePackageTypeFunction: NodejsFunction;
    updatePackageTypeFunction: NodejsFunction;
    changePackageTypeStatusFunction: NodejsFunction;
    listPackageSellerFunction: NodejsFunction;
    getPackageSellerByIdFunction: NodejsFunction;
    updatePackageSellerFunction: NodejsFunction;
    deletePackageSellerFunction: NodejsFunction;
    changePackageSellerStatusFunction: NodejsFunction;
    createPackageUserFunction: NodejsFunction;
    getPackageUserByIdFunction: NodejsFunction;
    listPackageUsersFunction: NodejsFunction;
    updatePackageUserFunction: NodejsFunction;
    deletePackageUserFunction: NodejsFunction;
    changePackageUserStatusFunction: NodejsFunction;
    listPackageTypesActiveFunction: NodejsFunction;
    createUserAccountFunction: NodejsFunction;
    getUserAccountByIdFunction: NodejsFunction;
    listUserAccountsFunction: NodejsFunction;
    updateUserAccountFunction: NodejsFunction;
    deleteUserAccountFunction: NodejsFunction;
    changeUserAccountStatusFunction: NodejsFunction;
    listUserAccountByAdminFunction: NodejsFunction;
    assignSellerCreditFunction: NodejsFunction;
    createResourceFunction: NodejsFunction;
    listResourceFunction: NodejsFunction;
    getResourceByIdFunction: NodejsFunction;
    changeResourceStateFunction: NodejsFunction;
    deleteResourceFunction: NodejsFunction;
    updateResourceFunction: NodejsFunction;
    getSellerCreditByIdFunction: NodejsFunction;
    listCastMembersFunction: NodejsFunction;
    getCastMemberByIdFunction: NodejsFunction;
    createCastMemberFunction: NodejsFunction;
    updateCastMemberFunction: NodejsFunction;
    deleteCastMemberFunction: NodejsFunction;
    listAllCountriesFunction: NodejsFunction;
    getAllSectionsFunction: NodejsFunction;
    listCollectionsFunction: NodejsFunction;
    getCollectionByIdFunction: NodejsFunction;
    createCollectionFunction: NodejsFunction;
    updateCollectionFunction: NodejsFunction;
    deleteCollectionFunction: NodejsFunction;
    changeCollectionStatusFunction: NodejsFunction;
    getAllCollectionsFunction: NodejsFunction;
    listMultimediaCategoriesFunction: NodejsFunction;
    getMultimediaCategoryByIdFunction: NodejsFunction;
    createMultimediaCategoryFunction: NodejsFunction;
    updateMultimediaCategoryFunction: NodejsFunction;
    deleteMultimediaCategoryFunction: NodejsFunction;
    changeMultimediaCategoryStatusFunction: NodejsFunction;
    getAllMultimediaCategoriesFunction: NodejsFunction;
    createMovieFunction: NodejsFunction;
    getMovieByIdFunction: NodejsFunction;
    deleteMovieFunction: NodejsFunction;
    changeMovieStatusFunction: NodejsFunction;
    updateMovieFunction: NodejsFunction;
    createSeriesFunction: NodejsFunction;
    getSeriesByIdFunction: NodejsFunction;
    deleteSeriesFunction: NodejsFunction;
    changeSeriesStatusFunction: NodejsFunction;
    updateSeriesFunction: NodejsFunction;
    listMultimediaFunction: NodejsFunction;
    createSeasonFunction: NodejsFunction;
    getSeasonByIdFunction: NodejsFunction;
    listSeasonsFunction: NodejsFunction;
    deleteSeasonFunction: NodejsFunction;
    updateSeasonFunction: NodejsFunction;
    createEpisodeFunction: NodejsFunction;
    getEpisodeByIdFunction: NodejsFunction;
    listEpisodesFunction: NodejsFunction;
    deleteEpisodeFunction: NodejsFunction;
    updateEpisodeFunction: NodejsFunction;
    getVideoSignatureFunction: NodejsFunction;
    listTop10Function: NodejsFunction;
    createTop10Function: NodejsFunction;
    deleteTop10Function: NodejsFunction;
    createRevendedorFunction: NodejsFunction;
    listRevendedoresFunction: NodejsFunction;
    transferirCreditosFunction: NodejsFunction;
  };
}

/**
 * Agregar todos los mÃ©todos del API siguiendo el patrÃ³n establecido
 */
export function addAllApiMethods(props: AddAllApiMethodsProps): void {
  const { restApi, authorizer, scope, lambdaFunctions } = props;

  // Admin Login routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.adminLoginFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.refreshTokenFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listUserAdminsFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createUserAdminFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getUserAdminByIdFunction,
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
  addApiMethodsWithLambda({ 
    restApi,
    lambdaFunction: lambdaFunctions.updateUserAdminFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteUserAdminFunction,
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
  addApiMethodsWithLambda({
    restApi, 
    lambdaFunction: lambdaFunctions.changeUserAdminStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getPlatformsFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getRolesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createPackageSellerFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createPackageTypeFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listPackageTypesFunction,
    authorizer,
    resourcePath: 'admin/packages/type',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'page', 'limit'],
      },
    ],
  });

  // Get Package Type By ID routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getPackageTypeByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deletePackageTypeFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updatePackageTypeFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changePackageTypeStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listPackageSellerFunction,
    authorizer,
    resourcePath: 'admin/packages/seller',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'page', 'limit'],
      },
    ],
  });

  // Get Package Seller By ID routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getPackageSellerByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updatePackageSellerFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deletePackageSellerFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changePackageSellerStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createPackageUserFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getPackageUserByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listPackageUsersFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updatePackageUserFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deletePackageUserFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changePackageUserStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listPackageTypesActiveFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createUserAccountFunction,
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

  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getUserAccountByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listUserAccountsFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateUserAccountFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteUserAccountFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changeUserAccountStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listUserAccountByAdminFunction,
    authorizer,
    resourcePath: 'admin/user-account/admin',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['search', 'status', 'year', 'page', 'limit'],
      },
    ],
  });

  // Assign Seller Credit routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.assignSellerCreditFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createResourceFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listResourceFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getResourceByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changeResourceStateFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateResourceFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteResourceFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getSellerCreditByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listCastMembersFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getCastMemberByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createCastMemberFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateCastMemberFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteCastMemberFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listAllCountriesFunction,
    authorizer,
    resourcePath: 'admin/countries',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // Sin autenticaciÃ³n requerida
        useAuthorizer: false,
      },
    ],
  });

  // Get All Sections routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getAllSectionsFunction,
    authorizer,
    resourcePath: 'admin/sections',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // Sin autenticaciÃ³n requerida
        useAuthorizer: false,
      },
    ],
  });

  // Collections Routes

  // List Collections routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listCollectionsFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getCollectionByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createCollectionFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateCollectionFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteCollectionFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changeCollectionStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getAllCollectionsFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listMultimediaFunction,
    authorizer,
    resourcePath: 'admin/multimedia',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: [ 'search', 'status','type','page', 'limit'],
      },
    ],
  });

  // List Multimedia Categories routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listMultimediaCategoriesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getMultimediaCategoryByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createMultimediaCategoryFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateMultimediaCategoryFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteMultimediaCategoryFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changeMultimediaCategoryStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getAllMultimediaCategoriesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createMovieFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getMovieByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteMovieFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changeMovieStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateMovieFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createSeriesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getSeriesByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteSeriesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.changeSeriesStatusFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateSeriesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listSeasonsFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createSeasonFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getSeasonByIdFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteSeasonFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateSeasonFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listEpisodesFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createEpisodeFunction,
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
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getEpisodeByIdFunction,
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

  // Delete Episode routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteEpisodeFunction,
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

  // Update Episode routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.updateEpisodeFunction,
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

  // Get Video Signature routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.getVideoSignatureFunction,
    authorizer,
    resourcePath: 'admin/video-signature',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Top 10 routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listTop10Function,
    authorizer,
    resourcePath: 'admin/top10',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['page', 'limit'],
      },
    ],
  });

  // Create Top 10 routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createTop10Function,
    authorizer,
    resourcePath: 'admin/top10',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Delete Top 10 routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.deleteTop10Function,
    authorizer,
    resourcePath: 'admin/top10/{id}',
    methods: [
      {
        method: 'DELETE',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // Create Revendedor routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.createRevendedorFunction,
    authorizer,
    resourcePath: 'admin/revendedores',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });

  // List Revendedores routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.listRevendedoresFunction,
    authorizer,
    resourcePath: 'admin/revendedores',
    methods: [
      {
        method: 'GET',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
        queryParameters: ['page', 'limit'],
      },
    ],
  });

  // Transferir Creditos routes
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.transferirCreditosFunction,
    authorizer,
    resourcePath: 'admin/transferir-creditos',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE, // JWT validado en handler
        useAuthorizer: false,
      },
    ],
  });


  ///MOBILE  
  // Client Login routes (mobile)
  addApiMethodsWithLambda({
    restApi,
    lambdaFunction: lambdaFunctions.clientLoginFunction,
    authorizer,
    resourcePath: 'auth/client-login',
    methods: [
      {
        method: 'POST',
        authorizationType: AuthorizationType.NONE,
        useAuthorizer: false,
      },
    ],
  });

}

