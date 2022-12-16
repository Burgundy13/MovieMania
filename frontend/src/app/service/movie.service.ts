import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieList } from '../model/movies';

const moviesUrl = 'http://localhost:3000/api/movies';

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
}
