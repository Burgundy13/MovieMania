import { Component, OnInit } from '@angular/core';
import { MovieList } from '../model/movies';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movieList: MovieList = new MovieList();
  constructor(private service: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.service.getAllMovies().subscribe({
      next: (response: MovieList) => {
        this.movieList = response;
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
}
