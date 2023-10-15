export interface Category {
  listName: string;
  displayName: string;
  listNameEncoded: string;
  oldestPublishedDate: string;
  newestPublishedDate: string;
  updated: string;
}

export interface CategoryRes {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
}

export interface Books {
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

export interface BooksRes {
  list_name: string;
  display_name: string;
  bestsellers_date: string;
  published_date: string;
  rank: number;
  amazon_product_url: string;
  book_details: {
    title: string;
    description: string;
    author: string;
    price: string;
    primary_isbn13: string;
  };
}
