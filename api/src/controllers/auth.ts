import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import db from '../db/db.js';

export const register = (req: Request, res: Response) => {
  console.log('registering-------');
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  insertUser.run(username, hashedPassword);
  res.json({ message: 'User registered successfully.' });
};

export const login = (req, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const storedUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  console.log('login user-----');
  console.log(storedUser);
  console.log(username);
  const isValid = storedUser && bcrypt.compareSync(password, storedUser.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  req.session.user = {
    userId: storedUser.id,
    username: storedUser.username,
  };
  res.json({ message: 'Login successful.' });
};

export const logout = (req, res: Response, next: NextFunction) => {
  req.session.user = null;
  res.json({ message: 'Logged out.' });
};

export const isAuthenticated = (req, res, next) => {
  if (req.session.user) next();
  else res.status(401).json({ message: 'Unauthorized.' });
};
