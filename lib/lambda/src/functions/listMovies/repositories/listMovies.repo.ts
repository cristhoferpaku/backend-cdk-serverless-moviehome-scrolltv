import dbConnector from '../../../../layers/pg/nodejs/dbConnector';
import { MovieRecord, ListMovieParams } from '../dtos/listMovies.dto';

const FUNCTION_NAME = 'ListMovieRepository';

export class ListMovieRepository {
  async getMovie(params: ListMovieParams): Promise<MovieRecord[]> {
    try {
      const query = 'SELECT * FROM sp_list_movies($1, $2, $3, $4)';
      const result = await dbConnector.query(query, [
        params.search,
        params.status,
        params.page,
        params.limit,
      ]);

      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        section_name: row.section_name,
        categories_list: row.categories_list,
        country_name: row.country_name,
        collection_name: row.collection_name,
        status: row.status,
        created_at: row.created_at,
        total_count: row.total_count,
      }));
    } catch (error) {
      throw new Error('Error al obtener las películas');
    }
  }
}
