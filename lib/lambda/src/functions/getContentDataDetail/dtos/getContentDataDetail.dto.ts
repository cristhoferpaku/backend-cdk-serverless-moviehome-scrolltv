type ISODateString = string;

// Interfaces para el contenido detallado
export interface ContentInfo {
  id: number;
  title: string;
  description: string;
  type: 'movie' | 'series' | string;
  durationMins: number | null;
  videoUrl: string | null;
  coverImage: string | null;
  bannerImage: string | null;
  sectionId: number;
  sectionName: string;
  countryId: number;
  countryName: string;
  collectionId: number | null;
  collection_name: string | null;
  categories: string | null;
  seasonId: number | null;
  episodeNum: number | null;
  totalSeasons: number | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Episode {
  episodeId: number;
  episodeNumber: number;
  title: string;
  description: string;
  durationMins: number;
  videoFile: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Season {
  seasonId: number;
  seasonNumber: number;
  coverImage: string | null;
  description: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  episodes: Episode[];
}

export interface CastMember {
  castId: number;
  name: string;
  photo: string | null;
}

export interface ContentDataDetail {
  contentInfo: ContentInfo;
  seasonsData: Season[];
  cast: CastMember[];
}

/** Respuesta del service */
export interface GetContentDataDetailResponse {
  success: boolean;
  message: string;
  data: ContentDataDetail | null;
}

/** ---------- Mapper desde el JSON de la DB (snake_case) ---------- */

/** Mapear la respuesta completa del stored procedure */
export function mapContentDataDetailResponse(dbJson: any): GetContentDataDetailResponse {
  // Si no hay datos, success es false, o no hay data
  if (!dbJson || dbJson.success === false || !dbJson.data) {
    return {
      success: false,
      message: dbJson?.message || "Contenido no encontrado o inactivo",
      data: null
    };
  }

  // El stored procedure ahora retorna { success, message, data }
  const data = dbJson.data;
  
  // Si no hay content_info dentro de data
  if (!data.content_info) {
    return {
      success: false,
      message: "Información de contenido no disponible",
      data: null
    };
  }

  // Mapear content_info
  const contentInfo: ContentInfo = {
    id: data.content_info?.id ?? 0,
    title: data.content_info?.title ?? '',
    description: data.content_info?.description ?? '',
    type: data.content_info?.type ?? 'movie',
    durationMins: data.content_info?.duration_mins ?? null,
    videoUrl: data.content_info?.video_url ?? null,
    coverImage: data.content_info?.cover_image ?? null,
    bannerImage: data.content_info?.banner_image ?? null,
    sectionId: data.content_info?.section_id ?? 0,
    sectionName: data.content_info?.section_name ?? '',
    countryId: data.content_info?.country_id ?? 0,
    countryName: data.content_info?.country_name ?? '',
    collectionId: data.content_info?.collection_id ?? null,
    collection_name: data.content_info?.collection_name ?? null,
    categories: data.content_info?.categories ?? null,
    seasonId: data.content_info?.season_id ?? null,
    episodeNum: data.content_info?.episode_num ?? null,
    totalSeasons: data.content_info?.total_seasons ?? null,
    createdAt: data.content_info?.created_at ?? '',
    updatedAt: data.content_info?.updated_at ?? '',
  };

  // Mapear seasons
  const seasonsData: Season[] = (data?.seasons ?? []).map((s: any) => ({
    seasonId: s.season_id,
    seasonNumber: s.season_number,
    coverImage: s.cover_image ?? null,
    description: s.description ?? null,
    createdAt: s.created_at ?? '',
    updatedAt: s.updated_at ?? '',
    episodes: (s.episodes ?? []).map((e: any) => ({
      episodeId: e.episode_id,
      episodeNumber: e.episode_number,
      title: e.title,
      description: e.description,
      durationMins: e.duration_mins,
      videoFile: e.video_file,
      createdAt: e.created_at ?? '',
      updatedAt: e.updated_at ?? '',
    })),
  }));

  // Mapear cast
  const cast: CastMember[] = (data?.cast ?? []).map((c: any) => ({
    castId: c.cast_id,
    name: c.name,
    photo: c.photo,
  }));

  const contentData: ContentDataDetail = {
    contentInfo,
    seasonsData,
    cast,
  };

  return {
    success: true,
    message: dbJson.message || "Contenido encontrado exitosamente",
    data: contentData
  };
}

/** Función legacy para mantener compatibilidad */
export function mapContentDataDetail(dbJson: any): ContentDataDetail {
  const response = mapContentDataDetailResponse(dbJson);
  return response.data || {
    contentInfo: {} as ContentInfo,
    seasonsData: [],
    cast: []
  };
}