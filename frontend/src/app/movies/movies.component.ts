import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieList } from '../model/movies';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movieList: MovieList = new MovieList();
  params = {
    page: 1,
    pageSize: 6,
    sort: '',
    sortDirection: '',
  };
  constructor(private service: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.route.params.subscribe((params: Params) => {
      this.service.getAllMovies(this.params).subscribe({
        next: (response: MovieList) => {
          this.movieList = response;
        },
        error: (response: any) => {
          console.log('Error: ', response.statusText);
        },
      });
    });
  }
}
