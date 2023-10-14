import express from 'express';
import routes from './routes/index.js';

console.log('Starting Server-----');
const app = express();
const port = 3000;

app.use('/', routes);
app.get('/test', (req, res) => res.send('Hello Test!'));

app.listen(port, () => console.log(`App Listening on Port: ${port}`));
