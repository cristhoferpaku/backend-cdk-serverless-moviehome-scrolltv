import { Stack, StackProps, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { addContentApiMethods } from './add-content-api-methods';
import { STACK_NAMES } from '../config/stack-config';

export interface ContentApiMethodsStackProps extends StackProps {
  environment: string;
  restApiId: string;
  restApiRootResourceId: string;
  // Cast Member Functions
  createCastMemberFunction: NodejsFunction;
  getCastMemberByIdFunction: NodejsFunction;
  updateCastMemberFunction: NodejsFunction;
  deleteCastMemberFunction: NodejsFunction;
  listCastMembersFunction: NodejsFunction;
  // Country Functions
  createCountryFunction: NodejsFunction;
  getCountryFunction: NodejsFunction;
  updateCountryFunction: NodejsFunction;
  deleteCountryFunction: NodejsFunction;
  listCountriesFunction: NodejsFunction;
  // Section Functions
  createSectionFunction: NodejsFunction;
  getSectionFunction: NodejsFunction;
  updateSectionFunction: NodejsFunction;
  deleteSectionFunction: NodejsFunction;
  listSectionsFunction: NodejsFunction;
  // Collection Functions
  createCollectionFunction: NodejsFunction;
  getCollectionByIdFunction: NodejsFunction;
  updateCollectionFunction: NodejsFunction;
  deleteCollectionFunction: NodejsFunction;
  listCollectionsFunction: NodejsFunction;
  changeCollectionStatusFunction: NodejsFunction;
  getAllCollectionsFunction: NodejsFunction;
  // Multimedia Category Functions
  createMultimediaCategoryFunction: NodejsFunction;
  getMultimediaCategoryByIdFunction: NodejsFunction;
  changeMultimediaCategoryStatusFunction: NodejsFunction;
  getAllMultimediaCategoriesFunction: NodejsFunction;
  updateMultimediaCategoryFunction: NodejsFunction;
  deleteMultimediaCategoryFunction: NodejsFunction;
  listMultimediaCategoriesFunction: NodejsFunction;
  // Movie Functions
  createMovieFunction: NodejsFunction;
  getMovieByIdFunction: NodejsFunction;
  updateMovieFunction: NodejsFunction;
  deleteMovieFunction: NodejsFunction;
  changeMovieStatusFunction: NodejsFunction;
  // Series Functions
  createSeriesFunction: NodejsFunction;
  getSeriesByIdFunction: NodejsFunction;
  updateSeriesFunction: NodejsFunction;
  deleteSeriesFunction: NodejsFunction;
  changeSeriesStatusFunction: NodejsFunction;
  // Multimedia Functions
  listMultimediaFunction: NodejsFunction;
  // Season Functions
  createSeasonFunction: NodejsFunction;
  getSeasonByIdFunction: NodejsFunction;
  updateSeasonFunction: NodejsFunction;
  deleteSeasonFunction: NodejsFunction;
  listSeasonsFunction: NodejsFunction;
  // Episode Functions
  createEpisodeFunction: NodejsFunction;
  getEpisodeByIdFunction: NodejsFunction;
  updateEpisodeFunction: NodejsFunction;
  deleteEpisodeFunction: NodejsFunction;
  listEpisodesFunction: NodejsFunction;
  // Video Signature Functions
  getVideoSignatureFunction: NodejsFunction;
  // Top 10 Functions
  createTop10Function: NodejsFunction;
  deleteTop10Function: NodejsFunction;
  listTop10Function: NodejsFunction;
}

export class ContentApiMethodsStack extends Stack {
  constructor(scope: Construct, id: string, props: ContentApiMethodsStackProps) {
    super(scope, id, props);

    const {
      environment,
      restApiId,
      restApiRootResourceId,
      // Cast Member Functions
      createCastMemberFunction,
      getCastMemberByIdFunction,
      updateCastMemberFunction,
      deleteCastMemberFunction,
      listCastMembersFunction,
      // Country Functions
      createCountryFunction,
      getCountryFunction,
      updateCountryFunction,
      deleteCountryFunction,
      listCountriesFunction,
      // Section Functions
      createSectionFunction,
      getSectionFunction,
      updateSectionFunction,
      deleteSectionFunction,
      listSectionsFunction,
      // Collection Functions
      createCollectionFunction,
      getCollectionByIdFunction,
      changeCollectionStatusFunction,
      getAllCollectionsFunction,
      updateCollectionFunction,
      deleteCollectionFunction,
      listCollectionsFunction,
      // Multimedia Category Functions
      createMultimediaCategoryFunction,
      getMultimediaCategoryByIdFunction,
      changeMultimediaCategoryStatusFunction,
      getAllMultimediaCategoriesFunction,
      updateMultimediaCategoryFunction,
      deleteMultimediaCategoryFunction,
      listMultimediaCategoriesFunction,
      // Movie Functions
      createMovieFunction,
      getMovieByIdFunction,
      updateMovieFunction,
      deleteMovieFunction,
      changeMovieStatusFunction,
      // Series Functions
      createSeriesFunction,
      getSeriesByIdFunction,
      updateSeriesFunction,
      deleteSeriesFunction,
      changeSeriesStatusFunction,
      // Multimedia Functions
      listMultimediaFunction,
      // Season Functions
      createSeasonFunction,
      getSeasonByIdFunction,
      updateSeasonFunction,
      deleteSeasonFunction,
      listSeasonsFunction,
      // Episode Functions
      createEpisodeFunction,
      getEpisodeByIdFunction,
      updateEpisodeFunction,
      deleteEpisodeFunction,
      listEpisodesFunction,
      // Video Signature Functions
      getVideoSignatureFunction,
      // Top 10 Functions
      createTop10Function,
      deleteTop10Function,
      listTop10Function,
    } = props;

    // Importar el REST API desde ApiGatewayStack
    const restApi = {
      restApiId,
      restApiRootResourceId,
    };

    // Agregar métodos de contenido a la API
    addContentApiMethods({
      restApi,
      authorizer: undefined, // JWT se valida en la Lambda
      scope: this,
      lambdaFunctions: {
        // Cast Member Functions
        createCastMemberFunction,
        getCastMemberByIdFunction,
        updateCastMemberFunction,
        deleteCastMemberFunction,
        listCastMembersFunction,
        // Country Functions
        listCountriesFunction,
        // Section Functions
        listSectionsFunction,
        // Collection Functions
        createCollectionFunction,
        getCollectionByIdFunction,
        changeCollectionStatusFunction,
        getAllCollectionsFunction,
        updateCollectionFunction,
        deleteCollectionFunction,
        listCollectionsFunction,
        // Multimedia Category Functions
        createMultimediaCategoryFunction,
        getMultimediaCategoryByIdFunction,
        changeMultimediaCategoryStatusFunction,
        getAllMultimediaCategoriesFunction,
        updateMultimediaCategoryFunction,
        deleteMultimediaCategoryFunction,
        listMultimediaCategoriesFunction,
        // Movie Functions
        createMovieFunction,
        getMovieByIdFunction,
        updateMovieFunction,
        deleteMovieFunction,
        changeMovieStatusFunction,
        // Series Functions
        createSeriesFunction,
        getSeriesByIdFunction,
        updateSeriesFunction,
        deleteSeriesFunction,
        changeSeriesStatusFunction,
        // Multimedia Functions
        listMultimediaFunction,
        // Season Functions
        createSeasonFunction,
        getSeasonByIdFunction,
        updateSeasonFunction,
        deleteSeasonFunction,
        listSeasonsFunction,
        // Episode Functions
        createEpisodeFunction,
        getEpisodeByIdFunction,
        updateEpisodeFunction,
        deleteEpisodeFunction,
        listEpisodesFunction,
        // Video Signature Functions
        getVideoSignatureFunction,
        // Top 10 Functions
        createTop10Function,
        deleteTop10Function,
        listTop10Function,
      },
    });
  }
}