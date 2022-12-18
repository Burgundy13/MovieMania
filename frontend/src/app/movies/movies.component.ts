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
  onPageChange(): void {
    this.getMovies();
  }
  onChange(event: any): void {
    this.params.sort = event.target.value;
  }
  onClickDirection(): void {
    this.params.sortDirection =
      this.params.sortDirection == 'asc' ? 'desc' : 'asc';
    this.ngOnInit();
  }
}
