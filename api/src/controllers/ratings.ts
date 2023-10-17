import { Request, Response } from 'express';
import db from '../db/db.js';
import { Rating } from '../models/db.js';

export const getRatingByISBNAndUserID = (req: Request, res: Response) => {
  const { isbn, userId } = req.query;
  console.log('here----');
  console.log(isbn);
  const stmt = db.prepare('SELECT * FROM ratings WHERE isbn = ? AND userId = ?');
  const rating = stmt.get(isbn, userId);
  console.log('getRating----');
  console.log(rating);
  res.json(rating);
};

export const upsertRating = (req: Request, res: Response) => {
  console.log(req.body);
  const { isbn, userId, rating } = req.body as Rating;

  // Check if a rating record with the given isbn and userId exists
  const existingRating = db
    .prepare('SELECT * FROM ratings WHERE isbn = ? AND userId = ?')
    .get(isbn, userId);

  if (existingRating) {
    console.log('updating old---');
    // If the record exists, update it
    db.prepare('UPDATE ratings SET rating = ? WHERE id = ?').run(
      rating,
      existingRating.id
    );
  } else {
    console.log('creating new----');
    // If the record doesn't exist, create a new one
    db.prepare('INSERT INTO ratings (isbn, userId, rating) VALUES (?, ?, ?)').run(
      isbn,
      userId,
      rating
    );
  }

  // Send OK response
  res.json({ message: 'Rating upserted.' });
};

export const deleteRatingByISBNAndUserID = (req: Request, res: Response) => {
  const { isbn, userId } = req.query;
  const stmt = db.prepare('DELETE FROM ratings WHERE isbn = ? AND userId = ?');
  const result = stmt.run(isbn, userId);
  res.json({ success: result.changes > 0 });
};
