import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/model/movies';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  movie: Movie = new Movie();
  button: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30),
      Validators.maxLength(250),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    rating: new FormControl(''),
    duration: new FormControl(''),
    director: new FormControl(''),
    genre: new FormControl(''),
    newGenre: new FormControl(''),
  });
  constructor(private service: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.params['id']);
    if (id) {
      this.getMovie();
    }
  }

  getMovie(): void {
    this.route.params.subscribe((params: Params) => {
      this.service.getOneMovie(params['id']).subscribe({
        next: (response: Movie) => {
          this.movie = response;
          this.form.patchValue(response);
        },
        error: (response: any) => {
          console.log('Error : ', response.statusText);
        },
      });
    });
  }
}
