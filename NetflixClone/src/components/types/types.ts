export interface IMovie {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  backdrop_path?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genres?: IGenre[];
}

export interface IVideo {
  key: string;
  name: string;
  type: string;
}

export interface IGenre {
  id: number;
  name: string;
}
