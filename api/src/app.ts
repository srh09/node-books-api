import './config.js';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import routes from './routes/index.js';
import { isAuthenticated } from './controllers/auth.js';

// Create App
console.log('Creating Server-----');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routing
app.use('/', routes);
app.get('/test', isAuthenticated, (req, res) => res.send('Hello Test!'));

// Start Server
const port = 3000;
app.listen(port, () => console.log(`App Listening on Port: ${port}`));
