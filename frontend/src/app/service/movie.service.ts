import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieList } from '../model/movies';

const moviesUrl = 'http://localhost:3000/api/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieList> {
    return this.http.get(moviesUrl).pipe(
      map((data: any) => {
        return new MovieList(data);
      })
    );
  }
}
