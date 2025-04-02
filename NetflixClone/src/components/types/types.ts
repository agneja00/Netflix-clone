export interface IMovie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
  poster_path?: string;
}

export interface IVideo {
  key: string;
  name: string;
  type: string;
}
