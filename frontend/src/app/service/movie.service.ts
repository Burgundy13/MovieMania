import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Genre } from '../model/genre';
import { Movie, MovieList } from '../model/movies';

const moviesUrl = 'http://localhost:3000/api/movies';
const genreUrl = 'http://localhost:3000/api/genres';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getAllMovies(params?: any): Observable<MovieList> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('page', params.page || '')
          .set('pageSize', params.pageSize || '')
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || ''),
      };
    }
    return this.http.get(moviesUrl, options).pipe(
      map((data: any) => {
        return new MovieList(data);
      })
    );
  }
  getOneMovie(id: number): Observable<Movie> {
    return this.http.get(`${moviesUrl}/${id}`).pipe(
      map((data: any) => {
        return new Movie(data);
      })
    );
  }
  getAllGenres(): Observable<Genre[]> {
    return this.http.get(genreUrl).pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new Genre(elem));
      })
    );
  }
}
