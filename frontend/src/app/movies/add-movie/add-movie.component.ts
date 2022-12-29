import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Genre } from 'src/app/model/genre';
import { Movie } from 'src/app/model/movies';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  movie: Movie = new Movie();
  genres: Genre[] = [];
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

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get year() {
    return this.form.get('year');
  }
  get newGenre() {
    return this.form.get('newGenre');
  }
  get genre() {
    return this.form.get('genre');
  }

  constructor(
    private service: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.params['id']);
    if (id) {
      this.getMovie();
    }
    this.getGenres();
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
  getGenres(): void {
    this.service.getAllGenres().subscribe({
      next: (response: Genre[]) => {
        this.genres = response;
      },
      error: (response: any) => {
        console.log('Error :', response.statusText);
      },
    });
  }

  onSave(): void {
    let id: number = Number(this.route.snapshot.params['id']);
    let newMovie = new Movie(this.form.value);
    if (id) {
      newMovie._id = id;
      this.service.putMovie(newMovie).subscribe({
        next: (response: Movie) => {
          this.router.navigate(['movies']);
        },
        error: (response: any) => {
          console.log('Error :', response.statusText);
        },
      });
    } else {
      this.service.postMovie(newMovie).subscribe({
        next: (response: Movie) => {
          console.log(newMovie);
        },
        error: (response: any) => {
          console.log('Error :', response.statusText);
        },
      });
    }
  }
  onPlusClick(): void {
    this.button = !this.button;
  }
  addNewGenre(): void {
    let newGenre: Genre = new Genre();
    newGenre.name = this.newGenre?.value;

    this.service.postGenre(newGenre).subscribe({
      next: (response: any) => {
        this.getGenres();
        this.form.patchValue({ genre: newGenre.name });
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
    this.button = false;
  }
}
