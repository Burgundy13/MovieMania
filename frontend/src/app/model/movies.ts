export class MovieList {
  count: number;
  results: Movie[];

  constructor(obj?: any) {
    this.count = (obj && obj.count) || 0;
    this.results =
      (obj && obj.results && obj.results.map((elem: any) => new Movie(elem))) ||
      [];
  }
}
export class Movie {
  _id: number;
  name: string;
  description: string;
  director: string;
  genre: string;
  year: number;
  rating: number;
  duration: number;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.name = (obj && obj.name) || '';
    this.description = (obj && obj.description) || '';
    this.director = (obj && obj.director) || '';
    this.genre = (obj && obj.genre) || '';
    this.year = (obj && obj.year) || 0;
    this.rating = (obj && obj.rating) || 0;
    this.duration = (obj && obj.duration) || 0;
  }
}
