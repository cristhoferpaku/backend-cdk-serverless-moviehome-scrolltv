import { CfnOutput, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from 'constructs';
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
  listMoviesTemplateLambda,
  deleteMovieTemplateLambda,
  changeMovieStatusTemplateLambda,
  updateMovieTemplateLambda,
} from './functions-template-lambda';
import { LambdaLayerStack } from './lambda-layer-stack';

interface LambdaFunctionStackProps extends StackProps {
  lambdaRoles: { [key: string]: Role };
  layerStack: LambdaLayerStack;
}
export class LambdaFunctionStack extends Stack {
  public readonly adminLoginFunction: NodejsFunction;
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
  public readonly listMoviesFunction: NodejsFunction;
  public readonly deleteMovieFunction: NodejsFunction;
  public readonly changeMovieStatusFunction: NodejsFunction;
  public readonly updateMovieFunction: NodejsFunction;


  constructor(scope: Construct, id: string, props: LambdaFunctionStackProps) {
    super(scope, id, props);

    // Función adminLogin
    this.adminLoginFunction = adminLoginTemplateLambda({
      lambdaRole: props.lambdaRoles['AdminLoginLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función refreshToken
    this.refreshTokenFunction = refreshTokenTemplateLambda({
      lambdaRole: props.lambdaRoles['RefreshTokenLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });
          // Función listUserAdmins
    this.listUserAdminsFunction = listUserAdminsTemplateLambda({
          lambdaRole: props.lambdaRoles['ListUserAdminsLambdaRole'],
          layerStack: props.layerStack,
          scope: this,
    });

    // Función createUserAdmin
    this.createUserAdminFunction = createUserAdminTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateUserAdminLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getUserAdminById
    this.getUserAdminByIdFunction = getUserAdminByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetUserAdminByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateUserAdmin
    this.updateUserAdminFunction = updateUserAdminTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdateUserAdminLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteUserAdmin
    this.deleteUserAdminFunction = deleteUserAdminTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteUserAdminLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeUserAdminStatus
    this.changeUserAdminStatusFunction = changeUserAdminStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangeUserAdminStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

      // Función getPlatforms
    this.getPlatformsFunction = getPlatformsTemplateLambda({
      lambdaRole: props.lambdaRoles['GetPlatformsLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getRoles
    this.getRolesFunction = getRolesTemplateLambda({
      lambdaRole: props.lambdaRoles['GetRolesLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createPackageSeller
    this.createPackageSellerFunction = createPackageSellerTemplateLambda({
      lambdaRole: props.lambdaRoles['CreatePackageSellerLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createPackageType
    this.createPackageTypeFunction = createPackageTypeTemplateLambda({
      lambdaRole: props.lambdaRoles['CreatePackageTypeLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageTypes
    this.listPackageTypesFunction = listPackageTypesTemplateLambda({
      lambdaRole: props.lambdaRoles['ListPackageTypesLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getPackageTypeById
    this.getPackageTypeByIdFunction = getPackageTypeByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetPackageTypeByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deletePackageType
    this.deletePackageTypeFunction = deletePackageTypeTemplateLambda({
      lambdaRole: props.lambdaRoles['DeletePackageTypeLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updatePackageType
    this.updatePackageTypeFunction = updatePackageTypeTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdatePackageTypeLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changePackageTypeStatus
    this.changePackageTypeStatusFunction = changePackageTypeStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangePackageTypeStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageSeller
    this.listPackageSellerFunction = listPackageSellerTemplateLambda({
      lambdaRole: props.lambdaRoles['ListPackageSellerLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getPackageSellerById
    this.getPackageSellerByIdFunction = getPackageSellerByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetPackageSellerByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updatePackageSeller
    this.updatePackageSellerFunction = updatePackageSellerTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdatePackageSellerLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deletePackageSeller
    this.deletePackageSellerFunction = deletePackageSellerTemplateLambda({
      lambdaRole: props.lambdaRoles['DeletePackageSellerLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changePackageSellerStatus
    this.changePackageSellerStatusFunction = changePackageSellerStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangePackageSellerStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createPackageUser
    this.createPackageUserFunction = createPackageUserTemplateLambda({
      lambdaRole: props.lambdaRoles['CreatePackageUserLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getPackageUserById
    this.getPackageUserByIdFunction = getPackageUserByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetPackageUserByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageUsers
    this.listPackageUsersFunction = listPackageUsersTemplateLambda({
      lambdaRole: props.lambdaRoles['ListPackageUsersLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updatePackageUser
    this.updatePackageUserFunction = updatePackageUserTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdatePackageUserLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deletePackageUser
    this.deletePackageUserFunction = deletePackageUserTemplateLambda({
      lambdaRole: props.lambdaRoles['DeletePackageUserLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changePackageUserStatus
    this.changePackageUserStatusFunction = changePackageUserStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangePackageUserStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listPackageTypesActive
    this.listPackageTypesActiveFunction = listPackageTypesActiveTemplateLambda({
      lambdaRole: props.lambdaRoles['ListPackageTypesActiveLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createUserAccount

    // Función createUserAccount
    this.createUserAccountFunction = createUserAccountTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateUserAccountLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getUserAccountById
    this.getUserAccountByIdFunction = getUserAccountByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetUserAccountByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });
    
    // Función listUserAccounts
    this.listUserAccountsFunction = listUserAccountsTemplateLambda({
      lambdaRole: props.lambdaRoles['ListUserAccountsLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });
    
    // Función updateUserAccount
   this.updateUserAccountFunction = updateUserAccountTemplateLambda({
     lambdaRole: props.lambdaRoles['UpdateUserAccountLambdaRole'],
     layerStack: props.layerStack,
     scope: this,
   });
    
    // Función deleteUserAccount
    this.deleteUserAccountFunction = deleteUserAccountTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteUserAccountLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });
    
    // Función changeUserAccountStatus
    this.changeUserAccountStatusFunction = changeUserAccountStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangeUserAccountStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listUserAccountByAdmin
    this.listUserAccountByAdminFunction = listUserAccountByAdminTemplateLambda({
      lambdaRole: props.lambdaRoles['ListUserAccountByAdminLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función assignSellerCredit
    this.assignSellerCreditFunction = assignSellerCreditTemplateLambda({
      lambdaRole: props.lambdaRoles['AssignSellerCreditLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createResource
    this.createResourceFunction = createResourceTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateResourceLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listResource
    this.listResourceFunction = listResourceTemplateLambda({
      lambdaRole: props.lambdaRoles['ListResourceLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getResourceById
    this.getResourceByIdFunction = getResourceByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetResourceByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeResourceState
    this.changeResourceStateFunction = changeResourceStateTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangeResourceStateLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteResource
    this.deleteResourceFunction = deleteResourceTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteResourceLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateResource
    this.updateResourceFunction = updateResourceTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdateResourceLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getSellerCreditById
    this.getSellerCreditByIdFunction = getSellerCreditByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetSellerCreditByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listCastMembers
    this.listCastMembersFunction = listCastMembersTemplateLambda({
      lambdaRole: props.lambdaRoles['ListCastMembersLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getCastMemberById
    this.getCastMemberByIdFunction = getCastMemberByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetCastMemberByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createCastMember
    this.createCastMemberFunction = createCastMemberTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateCastMemberLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateCastMember
    this.updateCastMemberFunction = updateCastMemberTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdateCastMemberLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteCastMember
    this.deleteCastMemberFunction = deleteCastMemberTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteCastMemberLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listAllCountries
    this.listAllCountriesFunction = listAllCountriesTemplateLambda({
      lambdaRole: props.lambdaRoles['ListAllCountriesLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getAllSections
    this.getAllSectionsFunction = getAllSectionsTemplateLambda({
      lambdaRole: props.lambdaRoles['GetAllSectionsLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Collections Functions
    
    // Función listCollections
    this.listCollectionsFunction = listCollectionsTemplateLambda({
      lambdaRole: props.lambdaRoles['ListCollectionsLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getCollectionById
    this.getCollectionByIdFunction = getCollectionByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetCollectionByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createCollection
    this.createCollectionFunction = createCollectionTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateCollectionLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateCollection
    this.updateCollectionFunction = updateCollectionTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdateCollectionLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteCollection
    this.deleteCollectionFunction = deleteCollectionTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteCollectionLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeCollectionStatus
    this.changeCollectionStatusFunction = changeCollectionStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangeCollectionStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getAllCollections
    this.getAllCollectionsFunction = getAllCollectionsTemplateLambda({
      lambdaRole: props.lambdaRoles['GetAllCollectionsLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listMultimediaCategories
    this.listMultimediaCategoriesFunction = listMultimediaCategoriesTemplateLambda({
      lambdaRole: props.lambdaRoles['ListMultimediaCategoriesLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getMultimediaCategoryById
    this.getMultimediaCategoryByIdFunction = getMultimediaCategoryByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetMultimediaCategoryByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función createMultimediaCategory
    this.createMultimediaCategoryFunction = createMultimediaCategoryTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateMultimediaCategoryLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateMultimediaCategory
    this.updateMultimediaCategoryFunction = updateMultimediaCategoryTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdateMultimediaCategoryLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteMultimediaCategory
    this.deleteMultimediaCategoryFunction = deleteMultimediaCategoryTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteMultimediaCategoryLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeMultimediaCategoryStatus
    this.changeMultimediaCategoryStatusFunction = changeMultimediaCategoryStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangeMultimediaCategoryStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getAllMultimediaCategories
    this.getAllMultimediaCategoriesFunction = getAllMultimediaCategoriesTemplateLambda({
      lambdaRole: props.lambdaRoles['GetAllMultimediaCategoriesLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Movies Functions
    
    // Función createMovie
    this.createMovieFunction = createMovieTemplateLambda({
      lambdaRole: props.lambdaRoles['CreateMovieLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función getMovieById
    this.getMovieByIdFunction = getMovieByIdTemplateLambda({
      lambdaRole: props.lambdaRoles['GetMovieByIdLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función listMovies
    this.listMoviesFunction = listMoviesTemplateLambda({
      lambdaRole: props.lambdaRoles['ListMoviesLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función deleteMovie
    this.deleteMovieFunction = deleteMovieTemplateLambda({
      lambdaRole: props.lambdaRoles['DeleteMovieLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función changeMovieStatus
    this.changeMovieStatusFunction = changeMovieStatusTemplateLambda({
      lambdaRole: props.lambdaRoles['ChangeMovieStatusLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

    // Función updateMovie
    this.updateMovieFunction = updateMovieTemplateLambda({
      lambdaRole: props.lambdaRoles['UpdateMovieLambdaRole'],
      layerStack: props.layerStack,
      scope: this,
    });

  }
}