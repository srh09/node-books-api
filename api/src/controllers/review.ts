import { Request, Response } from 'express';
import db from '../db/db.js';

export const getReviewsByIsbn = (req: Request, res: Response) => {
  const isbn = req.params.isbn;
  const reviews = db.prepare('SELECT * FROM reviews WHERE isbn = ?').all(isbn);
  res.json(reviews);
};

export const createReview = (req: Request, res: Response) => {
  const { isbn, userId, time, text } = req.body;
  const stmt = db.prepare(`
    INSERT INTO reviews (isbn, userId, time, text) 
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(isbn, userId, time, text);
  res.json({ message: 'Review created successfully.' });
};

export const updateReviewById = (req: Request, res: Response) => {
  const id = req.params.id;
  const { isbn, userId, time, text } = req.body;
  const stmt = db.prepare(`
    UPDATE reviews 
    SET isbn = ?, userId = ?, time = ?, text = ? 
    WHERE id = ?
  `);
  stmt.run(isbn, userId, time, text, id);
  res.json({ message: 'Review updated successfully.' });
};

export const deleteReviewById = (req: Request, res: Response) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
  stmt.run(id);
  res.json({ message: 'Review deleted successfully.' });
};
