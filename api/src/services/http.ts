import axios from 'axios';

export const nytHttp = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3',
  params: {
    'api-key': process.env.NYT_API_KEY,
  },
});
