export interface Category {
  listName: string;
  displayName: string;
  listNameEncoded: string;
  oldestPublishedDate: string;
  newestPublishedDate: string;
  updated: string;
}

export interface Book {
  listName: string;
  displayName: string;
  bestsellersDate: string;
  publishedDate: string;
  rank: number;
  amazonProductUrl: string;

  title: string;
  description: string;
  author: string;
  price: string;
  isbn: string;
}
