export interface IComment {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
}

export interface ICommentsInfo {
  filmId: number;
  comments: IComment[];
}
