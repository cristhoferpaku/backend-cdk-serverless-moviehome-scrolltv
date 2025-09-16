type ISODateString = string;

export interface Top10Item {
  id: number;
  contentId: number;
  sectionId: number;
  topNumber: number;
  title: string;
  description: string;
  coverImage: string | null;
  bannerImage: string | null;
  type: 'movie' | 'series' | string;
  durationMins: number | null;
  videoUrl: string | null;
  categories: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface RecentContentItem {
  id: number;
  title: string;
  description: string;
  coverImage: string | null;
  bannerImage: string | null;
  type: 'movie' | 'series' | string;
  durationMins: number | null;
  videoUrl: string | null;
  sectionId: number;
  countryId: number;
  collectionId: number;
  categories: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CollectionContentItem {
  id: number;
  title: string;
  description: string;
  coverImage: string | null;
  bannerImage: string | null;
  type: 'movie' | 'series' | string;
  durationMins: number | null;
  videoUrl: string | null;
  collection_name: string | null;
  categories: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CollectionGroup {
  collectionId: number;
  collection_name: string | null;
  content: CollectionContentItem[];
}

export interface HomeData {
  top10: Top10Item[];
  recentContent: RecentContentItem[];
  collectionsContent: CollectionGroup[];
}
/** Respuesta del service */
export interface GetHomeResponse {
  data: HomeData;
  message: string;
}

/** ---------- Mapper desde el JSON de la DB (snake_case) ---------- */

export function mapHomeData(dbJson: any): HomeData {
  const top10: Top10Item[] = (dbJson?.top_10 ?? []).map((t: any) => ({
    id: t.id,
    contentId: t.content_id,
    sectionId: t.section_id,
    topNumber: t.top_number,
    title: t.title,
    description: t.description,
    coverImage: t.cover_image ?? null,
    bannerImage: t.banner_image ?? null,
    type: t.type,
    durationMins: t.duration_mins ?? null,
    videoUrl: t.video_url ?? null,
    collection_name: t.collection_name ?? null,
    categories: t.categories ?? null,
    createdAt: t.created_at,
    updatedAt: t.updated_at,
  }));

  const recentContent: RecentContentItem[] = (dbJson?.recent_content ?? []).map((c: any) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    coverImage: c.cover_image ?? null,
    bannerImage: c.banner_image ?? null,
    type: c.type,
    durationMins: c.duration_mins ?? null,
    videoUrl: c.video_url ?? null,
    sectionId: c.section_id,
    countryId: c.country_id,
    collectionId: c.collection_id,
    collection_name: c.collection_name ?? null,
    categories: c.categories ?? null,
    seasonId: c.season_id ?? null,
    episodeNum: c.episode_num ?? null,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
  }));

  const collectionsContent: CollectionGroup[] = (dbJson?.collections_content ?? []).map((g: any) => ({
    collectionId: g.collection_id,
    collection_name: g.collection_name ?? null,
    content: (g.content ?? []).map((i: any) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      coverImage: i.cover_image ?? null,
      bannerImage: i.banner_image ?? null,
      type: i.type,
      durationMins: i.duration_mins ?? null,
      videoUrl: i.video_url ?? null,
      collection_name: i.collection_name ?? null,
      categories: i.categories ?? null,
      createdAt: i.created_at,
      updatedAt: i.updated_at,
    })),
  }));

  return { top10, recentContent, collectionsContent };
}