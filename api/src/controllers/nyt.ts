import { Books, BooksRes, Category, CategoryRes } from '../models/nyt.js';
import { nytHttp } from '../services/http.js';

export const getBooksByListName = async (req, res) => {
  const listName: string = req.params.listName;
  console.log('getting books-----');
  const response = await nytHttp.get(`/lists.json?list=${listName}`);
  const books = mapBooksResToBooks(response.data.results);
  res.send(books);
};

export const getCategoryNames = async (req, res) => {
  console.log('getting list names------');
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

      title: res.book_details.title,
      description: res.book_details.description,
      author: res.book_details.author,
      price: res.book_details.price,
      isbn: res.book_details.primary_isbn13,
    };
  });
};
