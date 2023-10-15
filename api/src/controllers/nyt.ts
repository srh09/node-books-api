import { nytHttp } from '../services/http.js';

export const getBooksByListName = async (req, res) => {
  const listName: string = req.params.listName;
  console.log('getting books-----');
  const response = await nytHttp.get(`/lists.json?list=${listName}`);
  res.send(response.data);
};

export const getListNames = async (req, res) => {
  console.log('getting list names------');
  const response = await nytHttp.get('/lists/names.json');
  res.send(response.data);
};
