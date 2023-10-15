import './config.js';
import cors from 'cors';
import express from 'express';

import routes from './routes/index.js';

// Create App
console.log('Creating Server-----');
const app = express();

// Middleware
app.use(cors());

// Routing
app.use('/', routes);
app.get('/test', (req, res) => res.send('Hello Test!'));

// Start Server
const port = 3000;
app.listen(port, () => console.log(`App Listening on Port: ${port}`));
