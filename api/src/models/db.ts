export interface Review {
  id?: number;
  isbn: string;
  name: string;
  text: string;
}

export interface Rating {
  id?: number;
  isbn: string;
  name: string;
  rating: number;
}
