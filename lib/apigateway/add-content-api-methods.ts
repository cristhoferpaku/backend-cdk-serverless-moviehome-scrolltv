import { Construct } from 'constructs';
import { RestApi, LambdaIntegration, Resource, Cors, CorsOptions } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface ContentApiMethodsProps {
  restApi: {
    restApiId: string;
    restApiRootResourceId: string;
  };
  authorizer?: any;
  scope: Construct;
  lambdaFunctions: {
    // Cast Member Functions
    createCastMemberFunction: NodejsFunction;
    getCastMemberByIdFunction: NodejsFunction;
    updateCastMemberFunction: NodejsFunction;
    deleteCastMemberFunction: NodejsFunction;
    listCastMembersFunction: NodejsFunction;
    // Country Functions (solo lista)
    listCountriesFunction: NodejsFunction;
    // Section Functions (solo lista)
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

    // livetvfunctions  
    listLiveTvFunction: NodejsFunction;
    createLiveTvFunction: NodejsFunction;
    getLiveTvByIdFunction: NodejsFunction;
    updateLiveTvFunction: NodejsFunction;
    deleteLiveTvFunction: NodejsFunction;
    changeLiveTvStatusFunction: NodejsFunction;
  };
}

export function addContentApiMethods(props: ContentApiMethodsProps): void {
  const { restApi, authorizer, scope, lambdaFunctions } = props;

  // Importar el REST API usando los IDs
  const api = RestApi.fromRestApiAttributes(scope, 'ImportedRestApi', {
    restApiId: restApi.restApiId,
    rootResourceId: restApi.restApiRootResourceId,
  });

  // Configuración CORS para todos los recursos
  const corsOptions: CorsOptions = {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'X-Amz-Date',
      'X-Api-Key',
      'X-Amz-Security-Token'
    ],
    allowCredentials: true
  };

  // Obtener el recurso admin existente (debe haber sido creado por AuthApiMethodsStack)

  // === CAST MEMBERS ENDPOINTS ===
  const castMembersResource = api.root.addResource('cast-member', {
    defaultCorsPreflightOptions: corsOptions
  });
  castMembersResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createCastMemberFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  castMembersResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listCastMembersFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const castMemberResource = castMembersResource.addResource('{id}');
  castMemberResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getCastMemberByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  castMemberResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateCastMemberFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  castMemberResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteCastMemberFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === COUNTRIES ENDPOINTS ===
  // Solo mantener el endpoint GET que existía originalmente
  const countriesResource = api.root.addResource('countries', {
    defaultCorsPreflightOptions: corsOptions
  });
  countriesResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listCountriesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === SECTIONS ENDPOINTS ===
  // Solo mantener el endpoint GET que existía originalmente
  const sectionsResource = api.root.addResource('sections', {
    defaultCorsPreflightOptions: corsOptions
  });
  sectionsResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listSectionsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === COLLECTIONS ENDPOINTS ===
  const collectionsResource = api.root.addResource('collections', {
    defaultCorsPreflightOptions: corsOptions
  });
  collectionsResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createCollectionFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  collectionsResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listCollectionsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const collectionsAllResource = collectionsResource.addResource('all');
  collectionsAllResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getAllCollectionsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const collectionResource = collectionsResource.addResource('{id}');
  collectionResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getCollectionByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  collectionResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateCollectionFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  collectionResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteCollectionFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const collectionStatusResource = collectionResource.addResource('status');
  collectionStatusResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeCollectionStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === MULTIMEDIA CATEGORIES ENDPOINTS ===
  const multimediaCategoriesResource = api.root.addResource('multimedia-categories', {
    defaultCorsPreflightOptions: corsOptions
  });
  multimediaCategoriesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createMultimediaCategoryFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  multimediaCategoriesResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listMultimediaCategoriesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const multimediaCategoriesAllResource = multimediaCategoriesResource.addResource('all');
  multimediaCategoriesAllResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getAllMultimediaCategoriesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const multimediaCategoryResource = multimediaCategoriesResource.addResource('{id}');
  multimediaCategoryResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getMultimediaCategoryByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  multimediaCategoryResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateMultimediaCategoryFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  multimediaCategoryResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteMultimediaCategoryFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const multimediaCategoryStatusResource = multimediaCategoryResource.addResource('status');
  multimediaCategoryStatusResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeMultimediaCategoryStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === MOVIES ENDPOINTS ===
  const moviesResource = api.root.addResource('movies', {
    defaultCorsPreflightOptions: corsOptions
  });
  moviesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createMovieFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const movieResource = moviesResource.addResource('{id}');
  movieResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getMovieByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  movieResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateMovieFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  movieResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteMovieFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const movieStatusResource = movieResource.addResource('status');
  movieStatusResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeMovieStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === SERIES ENDPOINTS ===
  const seriesResource = api.root.addResource('series', {
    defaultCorsPreflightOptions: corsOptions
  });
  seriesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createSeriesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });


  const serieResource = seriesResource.addResource('{id}');
  serieResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getSeriesByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  serieResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateSeriesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  serieResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteSeriesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  const serieStatusResource = serieResource.addResource('status');
  serieStatusResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeSeriesStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === MULTIMEDIA ENDPOINTS ===
  const multimediaResource = api.root.addResource('multimedia', {
    defaultCorsPreflightOptions: corsOptions
  });
  multimediaResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listMultimediaFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });


  // === SEASONS ENDPOINTS ===
  const seasonsResource = api.root.addResource('seasons', {
    defaultCorsPreflightOptions: corsOptions
  });
  seasonsResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createSeasonFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  seasonsResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listSeasonsFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const seasonResource = seasonsResource.addResource('{id}');
  seasonResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getSeasonByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  seasonResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateSeasonFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  seasonResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteSeasonFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === EPISODES ENDPOINTS ===
  const episodesResource = api.root.addResource('episodes', {
    defaultCorsPreflightOptions: corsOptions
  });
  episodesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createEpisodeFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  episodesResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listEpisodesFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const episodeResource = episodesResource.addResource('{id}');
  episodeResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getEpisodeByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  episodeResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateEpisodeFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  episodeResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteEpisodeFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === VIDEO SIGNATURES ENDPOINTS ===
  const videoSignaturesResource = api.root.addResource('get-video-signature', {
    defaultCorsPreflightOptions: corsOptions
  });

  videoSignaturesResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.getVideoSignatureFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });


  // === TOP 10 ENDPOINTS ===
  const top10Resource = api.root.addResource('top10', {
    defaultCorsPreflightOptions: corsOptions
  });
  top10Resource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createTop10Function), {
    authorizationType: authorizer ? undefined : undefined,
  });
  top10Resource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listTop10Function), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const top10ItemResource = top10Resource.addResource('{id}');
  top10ItemResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteTop10Function), {
    authorizationType: authorizer ? undefined : undefined,
  });

  // === LIVE TV ENDPOINTS ===
  const liveTvResource = api.root.addResource('livetv', {
    defaultCorsPreflightOptions: corsOptions
  });
  liveTvResource.addMethod('POST', new LambdaIntegration(lambdaFunctions.createLiveTvFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  liveTvResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.listLiveTvFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });

  const liveTvItemResource = liveTvResource.addResource('{id}');
  liveTvItemResource.addMethod('GET', new LambdaIntegration(lambdaFunctions.getLiveTvByIdFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  liveTvItemResource.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateLiveTvFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  liveTvItemResource.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteLiveTvFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
  liveTvItemResource.addMethod('PATCH', new LambdaIntegration(lambdaFunctions.changeLiveTvStatusFunction), {
    authorizationType: authorizer ? undefined : undefined,
  });
}