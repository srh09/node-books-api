export interface Review {
  id?: number;
  isbn: string;
  userId: number;
  time: string;
  text: string;
}

export interface Rating {
  id?: number;
  isbn: string;
  userId: string;
  rating: number;
}
