import { CfnOutput, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from 'constructs';
import { getSharedRole } from './lambda-role-mapper';
import {
  adminLoginTemplateLambda,
  refreshTokenTemplateLambda,  
  listUserAdminsTemplateLambda,
  createUserAdminTemplateLambda,
  getUserAdminByIdTemplateLambda,
  updateUserAdminTemplateLambda,
  deleteUserAdminTemplateLambda,
  changeUserAdminStatusTemplateLambda,
  getPlatformsTemplateLambda,
  getRolesTemplateLambda,
  createPackageSellerTemplateLambda,
  createPackageTypeTemplateLambda,
  listPackageTypesTemplateLambda,
  getPackageTypeByIdTemplateLambda,
  deletePackageTypeTemplateLambda,
  updatePackageTypeTemplateLambda,
  changePackageTypeStatusTemplateLambda,
  listPackageSellerTemplateLambda,
  getPackageSellerByIdTemplateLambda,
  updatePackageSellerTemplateLambda,
  deletePackageSellerTemplateLambda,
  changePackageSellerStatusTemplateLambda,
  createPackageUserTemplateLambda,
  getPackageUserByIdTemplateLambda,
  listPackageUsersTemplateLambda,
  updatePackageUserTemplateLambda,
  deletePackageUserTemplateLambda,
  changePackageUserStatusTemplateLambda,
  listPackageTypesActiveTemplateLambda,
  createUserAccountTemplateLambda,
  getUserAccountByIdTemplateLambda,
  listUserAccountsTemplateLambda,
  updateUserAccountTemplateLambda,
  deleteUserAccountTemplateLambda,
  changeUserAccountStatusTemplateLambda,
  listUserAccountByAdminTemplateLambda,
  assignSellerCreditTemplateLambda,
  createResourceTemplateLambda,
  listResourceTemplateLambda,
  getResourceByIdTemplateLambda,
  changeResourceStateTemplateLambda,
  deleteResourceTemplateLambda,
  updateResourceTemplateLambda,
  getSellerCreditByIdTemplateLambda,
  listCastMembersTemplateLambda,
  getCastMemberByIdTemplateLambda,
  createCastMemberTemplateLambda,
  updateCastMemberTemplateLambda,
  deleteCastMemberTemplateLambda,
  listAllCountriesTemplateLambda,
  getAllSectionsTemplateLambda,
  // Collections Templates
  listCollectionsTemplateLambda,
  getCollectionByIdTemplateLambda,
  createCollectionTemplateLambda,
  updateCollectionTemplateLambda,
  deleteCollectionTemplateLambda,
  changeCollectionStatusTemplateLambda,
  getAllCollectionsTemplateLambda,
  // Multimedia Categories Templates
  listMultimediaCategoriesTemplateLambda,
  getMultimediaCategoryByIdTemplateLambda,
  createMultimediaCategoryTemplateLambda,
  updateMultimediaCategoryTemplateLambda,
  deleteMultimediaCategoryTemplateLambda,
  changeMultimediaCategoryStatusTemplateLambda,
  getAllMultimediaCategoriesTemplateLambda,
  // Movies Templates
  createMovieTemplateLambda,
  getMovieByIdTemplateLambda,
  deleteMovieTemplateLambda,
  changeMovieStatusTemplateLambda,
  updateMovieTemplateLambda,
  // Series Templates
  createSeriesTemplateLambda,
  getSeriesByIdTemplateLambda,
  deleteSeriesTemplateLambda,
  changeSeriesStatusTemplateLambda,
  updateSeriesTemplateLambda,
  // Multimedia Templates (unified)
  listMultimediaTemplateLambda,
  // Seasons Templates
  createSeasonTemplateLambda,
  getSeasonByIdTemplateLambda,
  listSeasonsTemplateLambda,
  deleteSeasonTemplateLambda,
  updateSeasonTemplateLambda,
  // Episodes Templates
  createEpisodeTemplateLambda,
  getEpisodeByIdTemplateLambda,
  listEpisodesTemplateLambda,
  deleteEpisodeTemplateLambda,
  updateEpisodeTemplateLambda,
  // Video Signature Template
  getVideoSignatureTemplateLambda,
  // Top10 Templates
  listTop10TemplateLambda,
  createTop10TemplateLambda,
  deleteTop10TemplateLambda,
  // Revendedor Templates
  createRevendedorTemplateLambda,
  listRevendedoresTemplateLambda,
  transferirCreditosTemplateLambda,
  //MOBILE 
    clientLoginTemplateLambda,
} from './functions-template-lambda';
import { LambdaLayerStack } from './lambda-layer-stack';

interface LambdaFunctionStackProps extends StackProps {
  lambdaRoles: { [key: string]: Role };
  layerStack: LambdaLayerStack;
}
export class LambdaFunctionStack extends Stack {
  public readonly adminLoginFunction: NodejsFunction;
  public readonly clientLoginFunction: NodejsFunction;
  public readonly refreshTokenFunction: NodejsFunction;
  public readonly listUserAdminsFunction: NodejsFunction;
  public readonly createUserAdminFunction: NodejsFunction;
  public readonly getUserAdminByIdFunction: NodejsFunction;
  public readonly updateUserAdminFunction: NodejsFunction;
  public readonly deleteUserAdminFunction: NodejsFunction;
  public readonly changeUserAdminStatusFunction: NodejsFunction;
  public readonly getPlatformsFunction: NodejsFunction;
  public readonly getRolesFunction: NodejsFunction;
  public readonly createPackageSellerFunction: NodejsFunction;
  public readonly createPackageTypeFunction: NodejsFunction;
  public readonly listPackageTypesFunction: NodejsFunction;
  public readonly getPackageTypeByIdFunction: NodejsFunction;
  public readonly deletePackageTypeFunction: NodejsFunction;
  public readonly updatePackageTypeFunction: NodejsFunction;
  public readonly changePackageTypeStatusFunction: NodejsFunction;
  public readonly listPackageSellerFunction: NodejsFunction;
  public readonly getPackageSellerByIdFunction: NodejsFunction;
  public readonly updatePackageSellerFunction: NodejsFunction;
  public readonly deletePackageSellerFunction: NodejsFunction;
  public readonly changePackageSellerStatusFunction: NodejsFunction;
  public readonly createPackageUserFunction: NodejsFunction;
  public readonly getPackageUserByIdFunction: NodejsFunction;
  public readonly listPackageUsersFunction: NodejsFunction;
  public readonly updatePackageUserFunction: NodejsFunction;
  public readonly deletePackageUserFunction: NodejsFunction;
  public readonly changePackageUserStatusFunction: NodejsFunction;
  public readonly listPackageTypesActiveFunction: NodejsFunction;

  public readonly createUserAccountFunction: NodejsFunction;
  public readonly getUserAccountByIdFunction: NodejsFunction;
  public readonly listUserAccountsFunction: NodejsFunction;
  public readonly updateUserAccountFunction: NodejsFunction;
  public readonly deleteUserAccountFunction: NodejsFunction;
  public readonly changeUserAccountStatusFunction: NodejsFunction;

  public readonly listUserAccountByAdminFunction: NodejsFunction;
  public readonly assignSellerCreditFunction: NodejsFunction;
  public readonly createResourceFunction: NodejsFunction;
  public readonly listResourceFunction: NodejsFunction;
  public readonly getResourceByIdFunction: NodejsFunction;
  public readonly changeResourceStateFunction: NodejsFunction;
  public readonly deleteResourceFunction: NodejsFunction;
  public readonly updateResourceFunction: NodejsFunction;
  public readonly getSellerCreditByIdFunction: NodejsFunction;
  public readonly listCastMembersFunction: NodejsFunction;
  public readonly getCastMemberByIdFunction: NodejsFunction;
  public readonly createCastMemberFunction: NodejsFunction;
  public readonly updateCastMemberFunction: NodejsFunction;
  public readonly deleteCastMemberFunction: NodejsFunction;
  public readonly listAllCountriesFunction: NodejsFunction;
  public readonly getAllSectionsFunction: NodejsFunction;
  
  // Collections Functions
  public readonly listCollectionsFunction: NodejsFunction;
  public readonly getCollectionByIdFunction: NodejsFunction;
  public readonly createCollectionFunction: NodejsFunction;
  public readonly updateCollectionFunction: NodejsFunction;
  public readonly deleteCollectionFunction: NodejsFunction;
  public readonly changeCollectionStatusFunction: NodejsFunction;
  public readonly getAllCollectionsFunction: NodejsFunction;
  
  // Multimedia Categories Functions
  public readonly listMultimediaCategoriesFunction: NodejsFunction;
  public readonly getMultimediaCategoryByIdFunction: NodejsFunction;
  public readonly createMultimediaCategoryFunction: NodejsFunction;
  public readonly updateMultimediaCategoryFunction: NodejsFunction;
  public readonly deleteMultimediaCategoryFunction: NodejsFunction;
  public readonly changeMultimediaCategoryStatusFunction: NodejsFunction;
  public readonly getAllMultimediaCategoriesFunction: NodejsFunction;
  
  // Movies Functions
  public readonly createMovieFunction: NodejsFunction;
  public readonly getMovieByIdFunction: NodejsFunction;
  public readonly deleteMovieFunction: NodejsFunction;
  public readonly changeMovieStatusFunction: NodejsFunction;
  public readonly updateMovieFunction: NodejsFunction;
  
  // Series Functions
  public readonly createSeriesFunction: NodejsFunction;
  public readonly getSeriesByIdFunction: NodejsFunction;
  public readonly deleteSeriesFunction: NodejsFunction;
  public readonly changeSeriesStatusFunction: NodejsFunction;
  public readonly updateSeriesFunction: NodejsFunction;
  
  // Multimedia Functions (unified)
  public readonly listMultimediaFunction: NodejsFunction;
  
  // Seasons Functions
  public readonly createSeasonFunction: NodejsFunction;
  public readonly getSeasonByIdFunction: NodejsFunction;
  public readonly listSeasonsFunction: NodejsFunction;
  public readonly deleteSeasonFunction: NodejsFunction;
  public readonly updateSeasonFunction: NodejsFunction;
  
  // Episodes Functions
  public readonly createEpisodeFunction: NodejsFunction;
  public readonly getEpisodeByIdFunction: NodejsFunction;
  public readonly listEpisodesFunction: NodejsFunction;
  public readonly deleteEpisodeFunction: NodejsFunction;
  public readonly updateEpisodeFunction: NodejsFunction;

  // Video Signature Function
  public readonly getVideoSignatureFunction: NodejsFunction;

  // Top10 Functions
  public readonly listTop10Function: NodejsFunction;
  public readonly createTop10Function: NodejsFunction;
  public readonly deleteTop10Function: NodejsFunction;

  // Revendedor Functions
  public readonly createRevendedorFunction: NodejsFunction;
  public readonly listRevendedoresFunction: NodejsFunction;
  public readonly transferirCreditosFunction: NodejsFunction;



  constructor(scope: Construct, id: string, props: LambdaFunctionStackProps) {
    super(scope, id, props);

    // Función adminLogin - Usando rol compartido AuthLambdaRole
    this.adminLoginFunction = adminLoginTemplateLambda({
      lambdaRole: getSharedRole('AdminLoginLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });



    // Función refreshToken - Usando rol compartido AuthLambdaRole
    this.refreshTokenFunction = refreshTokenTemplateLambda({
      lambdaRole: getSharedRole('RefreshTokenLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });
          // Función listUserAdmins - Usando rol compartido AdminLambdaRole
    this.listUserAdminsFunction = listUserAdminsTemplateLambda({
          lambdaRole: getSharedRole('ListUserAdminsLambdaRole', props.lambdaRoles),
          layerStack: props.layerStack,
          scope: this,
    });

    // Función createUserAdmin - Usando rol compartido AdminLambdaRole
    this.createUserAdminFunction = createUserAdminTemplateLambda({
      lambdaRole: getSharedRole('CreateUserAdminLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getUserAdminById - Usando rol compartido AdminLambdaRole
    this.getUserAdminByIdFunction = getUserAdminByIdTemplateLambda({
      lambdaRole: getSharedRole('GetUserAdminByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateUserAdmin - Usando rol compartido AdminLambdaRole
    this.updateUserAdminFunction = updateUserAdminTemplateLambda({
      lambdaRole: getSharedRole('UpdateUserAdminLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteUserAdmin - Usando rol compartido AdminLambdaRole
    this.deleteUserAdminFunction = deleteUserAdminTemplateLambda({
      lambdaRole: getSharedRole('DeleteUserAdminLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeUserAdminStatus - Usando rol compartido AdminLambdaRole
    this.changeUserAdminStatusFunction = changeUserAdminStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangeUserAdminStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

      // Función getPlatforms - Usando rol compartido AdminLambdaRole
    this.getPlatformsFunction = getPlatformsTemplateLambda({
      lambdaRole: getSharedRole('GetPlatformsLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getRoles - Usando rol compartido AdminLambdaRole
    this.getRolesFunction = getRolesTemplateLambda({
      lambdaRole: getSharedRole('GetRolesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createPackageSeller - Usando rol compartido AdminLambdaRole
    this.createPackageSellerFunction = createPackageSellerTemplateLambda({
      lambdaRole: getSharedRole('CreatePackageSellerLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createPackageType - Usando rol compartido AdminLambdaRole
    this.createPackageTypeFunction = createPackageTypeTemplateLambda({
      lambdaRole: getSharedRole('CreatePackageTypeLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageTypes - Usando rol compartido AdminLambdaRole
    this.listPackageTypesFunction = listPackageTypesTemplateLambda({
      lambdaRole: getSharedRole('ListPackageTypesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getPackageTypeById - Usando rol compartido AdminLambdaRole
    this.getPackageTypeByIdFunction = getPackageTypeByIdTemplateLambda({
      lambdaRole: getSharedRole('GetPackageTypeByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deletePackageType - Usando rol compartido AdminLambdaRole
    this.deletePackageTypeFunction = deletePackageTypeTemplateLambda({
      lambdaRole: getSharedRole('DeletePackageTypeLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updatePackageType - Usando rol compartido AdminLambdaRole
    this.updatePackageTypeFunction = updatePackageTypeTemplateLambda({
      lambdaRole: getSharedRole('UpdatePackageTypeLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changePackageTypeStatus - Usando rol compartido AdminLambdaRole
    this.changePackageTypeStatusFunction = changePackageTypeStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangePackageTypeStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageSeller - Usando rol compartido AdminLambdaRole
    this.listPackageSellerFunction = listPackageSellerTemplateLambda({
      lambdaRole: getSharedRole('ListPackageSellerLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getPackageSellerById - Usando rol compartido AdminLambdaRole
    this.getPackageSellerByIdFunction = getPackageSellerByIdTemplateLambda({
      lambdaRole: getSharedRole('GetPackageSellerByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updatePackageSeller - Usando rol compartido AdminLambdaRole
    this.updatePackageSellerFunction = updatePackageSellerTemplateLambda({
      lambdaRole: getSharedRole('UpdatePackageSellerLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deletePackageSeller - Usando rol compartido AdminLambdaRole
    this.deletePackageSellerFunction = deletePackageSellerTemplateLambda({
      lambdaRole: getSharedRole('DeletePackageSellerLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changePackageSellerStatus - Usando rol compartido AdminLambdaRole
    this.changePackageSellerStatusFunction = changePackageSellerStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangePackageSellerStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createPackageUser - Usando rol compartido AdminLambdaRole
    this.createPackageUserFunction = createPackageUserTemplateLambda({
      lambdaRole: getSharedRole('CreatePackageUserLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getPackageUserById - Usando rol compartido AdminLambdaRole
    this.getPackageUserByIdFunction = getPackageUserByIdTemplateLambda({
      lambdaRole: getSharedRole('GetPackageUserByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageUsers - Usando rol compartido AdminLambdaRole
    this.listPackageUsersFunction = listPackageUsersTemplateLambda({
      lambdaRole: getSharedRole('ListPackageUsersLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updatePackageUser - Usando rol compartido AdminLambdaRole
    this.updatePackageUserFunction = updatePackageUserTemplateLambda({
      lambdaRole: getSharedRole('UpdatePackageUserLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deletePackageUser - Usando rol compartido AdminLambdaRole
    this.deletePackageUserFunction = deletePackageUserTemplateLambda({
      lambdaRole: getSharedRole('DeletePackageUserLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changePackageUserStatus - Usando rol compartido AdminLambdaRole
    this.changePackageUserStatusFunction = changePackageUserStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangePackageUserStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageTypesActive - Usando rol compartido AdminLambdaRole
    this.listPackageTypesActiveFunction = listPackageTypesActiveTemplateLambda({
      lambdaRole: getSharedRole('ListPackageTypesActiveLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createUserAccount - Usando rol compartido AdminLambdaRole
    this.createUserAccountFunction = createUserAccountTemplateLambda({
      lambdaRole: getSharedRole('CreateUserAccountLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getUserAccountById - Usando rol compartido AdminLambdaRole
    this.getUserAccountByIdFunction = getUserAccountByIdTemplateLambda({
      lambdaRole: getSharedRole('GetUserAccountByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });
    
    // Función listUserAccounts - Usando rol compartido AdminLambdaRole
    this.listUserAccountsFunction = listUserAccountsTemplateLambda({
      lambdaRole: getSharedRole('ListUserAccountsLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });
    
    // Función updateUserAccount - Usando rol compartido AdminLambdaRole
   this.updateUserAccountFunction = updateUserAccountTemplateLambda({
     lambdaRole: getSharedRole('UpdateUserAccountLambdaRole', props.lambdaRoles),
     layerStack: props.layerStack,
     scope: this,
   });
    
    // Función deleteUserAccount - Usando rol compartido AdminLambdaRole
    this.deleteUserAccountFunction = deleteUserAccountTemplateLambda({
      lambdaRole: getSharedRole('DeleteUserAccountLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });
    
    // Función changeUserAccountStatus - Usando rol compartido AdminLambdaRole
    this.changeUserAccountStatusFunction = changeUserAccountStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangeUserAccountStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listUserAccountByAdmin - Usando rol compartido AdminLambdaRole
    this.listUserAccountByAdminFunction = listUserAccountByAdminTemplateLambda({
      lambdaRole: getSharedRole('ListUserAccountByAdminLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función assignSellerCredit - Usando rol compartido AdminLambdaRole
    this.assignSellerCreditFunction = assignSellerCreditTemplateLambda({
      lambdaRole: getSharedRole('AssignSellerCreditLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createResource - Usando rol compartido AdminLambdaRole
    this.createResourceFunction = createResourceTemplateLambda({
      lambdaRole: getSharedRole('CreateResourceLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listResource - Usando rol compartido AdminLambdaRole
    this.listResourceFunction = listResourceTemplateLambda({
      lambdaRole: getSharedRole('ListResourceLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getResourceById - Usando rol compartido AdminLambdaRole
    this.getResourceByIdFunction = getResourceByIdTemplateLambda({
      lambdaRole: getSharedRole('GetResourceByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeResourceState - Usando rol compartido AdminLambdaRole
    this.changeResourceStateFunction = changeResourceStateTemplateLambda({
      lambdaRole: getSharedRole('ChangeResourceStateLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteResource - Usando rol compartido AdminLambdaRole
    this.deleteResourceFunction = deleteResourceTemplateLambda({
      lambdaRole: getSharedRole('DeleteResourceLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateResource - Usando rol compartido AdminLambdaRole
    this.updateResourceFunction = updateResourceTemplateLambda({
      lambdaRole: getSharedRole('UpdateResourceLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getSellerCreditById - Usando rol compartido AdminLambdaRole
    this.getSellerCreditByIdFunction = getSellerCreditByIdTemplateLambda({
      lambdaRole: getSharedRole('GetSellerCreditByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listCastMembers - Usando rol compartido ManagementLambdaRole
    this.listCastMembersFunction = listCastMembersTemplateLambda({
      lambdaRole: getSharedRole('ListCastMembersLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getCastMemberById - Usando rol compartido ManagementLambdaRole
    this.getCastMemberByIdFunction = getCastMemberByIdTemplateLambda({
      lambdaRole: getSharedRole('GetCastMemberByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createCastMember - Usando rol compartido ManagementLambdaRole
    this.createCastMemberFunction = createCastMemberTemplateLambda({
      lambdaRole: getSharedRole('CreateCastMemberLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateCastMember - Usando rol compartido ManagementLambdaRole
    this.updateCastMemberFunction = updateCastMemberTemplateLambda({
      lambdaRole: getSharedRole('UpdateCastMemberLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteCastMember - Usando rol compartido ManagementLambdaRole
    this.deleteCastMemberFunction = deleteCastMemberTemplateLambda({
      lambdaRole: getSharedRole('DeleteCastMemberLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listAllCountries - Usando rol compartido ManagementLambdaRole
    this.listAllCountriesFunction = listAllCountriesTemplateLambda({
      lambdaRole: getSharedRole('ListAllCountriesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getAllSections - Usando rol compartido ManagementLambdaRole
    this.getAllSectionsFunction = getAllSectionsTemplateLambda({
      lambdaRole: getSharedRole('GetAllSectionsLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Collections Functions
    
    // Función listCollections - Usando rol compartido ContentLambdaRole
    this.listCollectionsFunction = listCollectionsTemplateLambda({
      lambdaRole: getSharedRole('ListCollectionsLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getCollectionById - Usando rol compartido ContentLambdaRole
    this.getCollectionByIdFunction = getCollectionByIdTemplateLambda({
      lambdaRole: getSharedRole('GetCollectionByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createCollection - Usando rol compartido ContentLambdaRole
    this.createCollectionFunction = createCollectionTemplateLambda({
      lambdaRole: getSharedRole('CreateCollectionLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateCollection - Usando rol compartido ContentLambdaRole
    this.updateCollectionFunction = updateCollectionTemplateLambda({
      lambdaRole: getSharedRole('UpdateCollectionLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteCollection - Usando rol compartido ContentLambdaRole
    this.deleteCollectionFunction = deleteCollectionTemplateLambda({
      lambdaRole: getSharedRole('DeleteCollectionLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeCollectionStatus - Usando rol compartido ContentLambdaRole
    this.changeCollectionStatusFunction = changeCollectionStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangeCollectionStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getAllCollections - Usando rol compartido ContentLambdaRole
    this.getAllCollectionsFunction = getAllCollectionsTemplateLambda({
      lambdaRole: getSharedRole('GetAllCollectionsLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listMultimediaCategories - Usando rol compartido ContentLambdaRole
    this.listMultimediaCategoriesFunction = listMultimediaCategoriesTemplateLambda({
      lambdaRole: getSharedRole('ListMultimediaCategoriesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getMultimediaCategoryById - Usando rol compartido ContentLambdaRole
    this.getMultimediaCategoryByIdFunction = getMultimediaCategoryByIdTemplateLambda({
      lambdaRole: getSharedRole('GetMultimediaCategoryByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createMultimediaCategory - Usando rol compartido ContentLambdaRole
    this.createMultimediaCategoryFunction = createMultimediaCategoryTemplateLambda({
      lambdaRole: getSharedRole('CreateMultimediaCategoryLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateMultimediaCategory - Usando rol compartido ContentLambdaRole
    this.updateMultimediaCategoryFunction = updateMultimediaCategoryTemplateLambda({
      lambdaRole: getSharedRole('UpdateMultimediaCategoryLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteMultimediaCategory - Usando rol compartido ContentLambdaRole
    this.deleteMultimediaCategoryFunction = deleteMultimediaCategoryTemplateLambda({
      lambdaRole: getSharedRole('DeleteMultimediaCategoryLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeMultimediaCategoryStatus - Usando rol compartido ContentLambdaRole
    this.changeMultimediaCategoryStatusFunction = changeMultimediaCategoryStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangeMultimediaCategoryStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getAllMultimediaCategories - Usando rol compartido ContentLambdaRole
    this.getAllMultimediaCategoriesFunction = getAllMultimediaCategoriesTemplateLambda({
      lambdaRole: getSharedRole('GetAllMultimediaCategoriesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Movies Functions
    
    // Función createMovie - Usando rol compartido ContentLambdaRole
    this.createMovieFunction = createMovieTemplateLambda({
      lambdaRole: getSharedRole('CreateMovieLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getMovieById - Usando rol compartido ContentLambdaRole
    this.getMovieByIdFunction = getMovieByIdTemplateLambda({
      lambdaRole: getSharedRole('GetMovieByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteMovie - Usando rol compartido ContentLambdaRole
    this.deleteMovieFunction = deleteMovieTemplateLambda({
      lambdaRole: getSharedRole('DeleteMovieLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeMovieStatus - Usando rol compartido ContentLambdaRole
    this.changeMovieStatusFunction = changeMovieStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangeMovieStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateMovie - Usando rol compartido ContentLambdaRole
    this.updateMovieFunction = updateMovieTemplateLambda({
      lambdaRole: getSharedRole('UpdateMovieLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Series Functions
    
    // Función createSeries - Usando rol compartido ContentLambdaRole
    this.createSeriesFunction = createSeriesTemplateLambda({
      lambdaRole: getSharedRole('CreateSeriesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getSeriesById - Usando rol compartido ContentLambdaRole
    this.getSeriesByIdFunction = getSeriesByIdTemplateLambda({
      lambdaRole: getSharedRole('GetSeriesByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteSeries - Usando rol compartido ContentLambdaRole
    this.deleteSeriesFunction = deleteSeriesTemplateLambda({
      lambdaRole: getSharedRole('DeleteSeriesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeSeriesStatus - Usando rol compartido ContentLambdaRole
    this.changeSeriesStatusFunction = changeSeriesStatusTemplateLambda({
      lambdaRole: getSharedRole('ChangeSeriesStatusLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateSeries - Usando rol compartido ContentLambdaRole
    this.updateSeriesFunction = updateSeriesTemplateLambda({
      lambdaRole: getSharedRole('UpdateSeriesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Multimedia Functions (unified)
    
    // Función listMultimedia - Usando rol compartido ContentLambdaRole
    this.listMultimediaFunction = listMultimediaTemplateLambda({
      lambdaRole: getSharedRole('ListMultimediaLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Seasons Functions
    
    // Función createSeason - Usando rol compartido ContentLambdaRole
    this.createSeasonFunction = createSeasonTemplateLambda({
      lambdaRole: getSharedRole('CreateSeasonLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getSeasonById - Usando rol compartido ContentLambdaRole
    this.getSeasonByIdFunction = getSeasonByIdTemplateLambda({
      lambdaRole: getSharedRole('GetSeasonByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listSeasons - Usando rol compartido ContentLambdaRole
    this.listSeasonsFunction = listSeasonsTemplateLambda({
      lambdaRole: getSharedRole('ListSeasonsLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteSeason - Usando rol compartido ContentLambdaRole
    this.deleteSeasonFunction = deleteSeasonTemplateLambda({
      lambdaRole: getSharedRole('DeleteSeasonLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateSeason - Usando rol compartido ContentLambdaRole
    this.updateSeasonFunction = updateSeasonTemplateLambda({
      lambdaRole: getSharedRole('UpdateSeasonLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Episodes Functions
    
    // Función createEpisode - Usando rol compartido ContentLambdaRole
    this.createEpisodeFunction = createEpisodeTemplateLambda({
      lambdaRole: getSharedRole('CreateEpisodeLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getEpisodeById - Usando rol compartido ContentLambdaRole
    this.getEpisodeByIdFunction = getEpisodeByIdTemplateLambda({
      lambdaRole: getSharedRole('GetEpisodeByIdLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listEpisodes - Usando rol compartido ContentLambdaRole
    this.listEpisodesFunction = listEpisodesTemplateLambda({
      lambdaRole: getSharedRole('ListEpisodesLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteEpisode - Usando rol compartido ContentLambdaRole
    this.deleteEpisodeFunction = deleteEpisodeTemplateLambda({
      lambdaRole: getSharedRole('DeleteEpisodeLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateEpisode - Usando rol compartido ContentLambdaRole
    this.updateEpisodeFunction = updateEpisodeTemplateLambda({
      lambdaRole: getSharedRole('UpdateEpisodeLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Video Signature Function
    
    // Función getVideoSignature - Usando rol compartido ContentLambdaRole
    this.getVideoSignatureFunction = getVideoSignatureTemplateLambda({
      lambdaRole: getSharedRole('GetVideoSignatureLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Top10 Functions
    
    // Función listTop10 - Usando rol compartido ContentLambdaRole
    this.listTop10Function = listTop10TemplateLambda({
      lambdaRole: getSharedRole('ListTop10LambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createTop10 - Usando rol compartido ContentLambdaRole
    this.createTop10Function = createTop10TemplateLambda({
      lambdaRole: getSharedRole('CreateTop10LambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteTop10 - Usando rol compartido ContentLambdaRole
    this.deleteTop10Function = deleteTop10TemplateLambda({
      lambdaRole: getSharedRole('DeleteTop10LambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Revendedor Functions
    
    // Función createRevendedor - Usando rol compartido AdminLambdaRole.
    this.createRevendedorFunction = createRevendedorTemplateLambda({
      lambdaRole: getSharedRole('CreateRevendedorLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listRevendedores - Usando rol compartido AdminLambdaRole
    this.listRevendedoresFunction = listRevendedoresTemplateLambda({
      lambdaRole: getSharedRole('ListRevendedoresLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

    // Función transferirCreditos - Usando rol compartido AdminLambdaRole
    this.transferirCreditosFunction = transferirCreditosTemplateLambda({
      lambdaRole: getSharedRole('TransferirCreditosLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

        // Función clientLogin - Usando rol compartido AuthLambdaRole
    this.clientLoginFunction = clientLoginTemplateLambda({
      lambdaRole: getSharedRole('ClientLoginLambdaRole', props.lambdaRoles),
      layerStack: props.layerStack,
      scope: this,
    });

  }
}