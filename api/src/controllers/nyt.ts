import { Request, Response } from 'express';
import { Books, BooksRes, Category, CategoryRes } from '../models/nyt.js';
import { nytHttp } from '../services/http.js';

export const getBooksByCategoryName = async (req: Request, res: Response) => {
  const categoryName: string = req.params.categoryName;
  const response = await nytHttp.get(`/lists.json?list=${categoryName}`);
  const books = mapBooksResToBooks(response.data.results);
  res.send(books);
};

export const getCategoryNames = async (req: Request, res: Response) => {
  const response = await nytHttp.get('/lists/names.json');
  const categories = mapCategoryResToCategories(response.data.results);
  res.send(categories);
};

const mapCategoryResToCategories = (resList: CategoryRes[]): Category[] => {
  return resList.map((res) => {
    return {
      listName: res.list_name,
      displayName: res.display_name,
      listNameEncoded: res.list_name_encoded,
      oldestPublishedDate: res.oldest_published_date,
      newestPublishedDate: res.newest_published_date,
      updated: res.updated,
    };
  });
};

const mapBooksResToBooks = (resList: BooksRes[]): Books[] => {
  return resList.map((res) => {
    return {
      listName: res.list_name,
      displayName: res.display_name,
      bestsellersDate: res.bestsellers_date,
      publishedDate: res.published_date,
      rank: res.rank,
      amazonProductUrl: res.amazon_product_url,

      title: res.book_details[0].title,
      description: res.book_details[0].description,
      author: res.book_details[0].author,
      price: res.book_details[0].price,
      isbn: res.book_details[0].primary_isbn13,
    };
  });
};
