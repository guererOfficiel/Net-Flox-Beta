export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>
  runtime: number
  status: string
  tagline: string | null
  homepage: string | null
}