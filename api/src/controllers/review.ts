import { Request, Response } from 'express';
import db from '../db/db.js';
import { Review } from '../models/db.js';

export function createReview(req: Request, res: Response) {
  const { isbn, name, text } = req.body as Review;
  db.prepare('INSERT INTO reviews (isbn, name, text) VALUES (?, ?, ?)').run(
    isbn,
    name,
    text
  );
  res.json({ message: 'Review created successfully.' });
}

export function getAllReviews(req: Request, res: Response) {
  const reviews = db.prepare('SELECT * FROM reviews').all();
  res.json(reviews);
}

export function getReviewById(req: Request, res: Response) {
  const reviewId = req.params.id;

  const statement = db.prepare('SELECT * FROM reviews WHERE id = ?');
  const review = statement.get(reviewId);

  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: `Review with ID ${reviewId} not found.` });
  }
}

export function updateReview(req: Request, res: Response) {
  const reviewId = req.params.id;
  const { isbn, name, text } = req.body as Review;

  const statement = db.prepare(
    'UPDATE reviews SET isbn = ?, name = ?, text = ? WHERE id = ?'
  );
  const result = statement.run(isbn, name, text, reviewId);

  if (result.changes > 0) {
    res.json({ message: `Review with ID ${reviewId} updated successfully.` });
  } else {
    res.status(404).json({ error: `Review with ID ${reviewId} not found.` });
  }
}

export function deleteReview(req: Request, res: Response) {
  const reviewId = req.params.id;

  const statement = db.prepare('DELETE FROM reviews WHERE id = ?');
  const result = statement.run(reviewId);

  if (result.changes > 0) {
    res.json({ message: `Review with ID ${reviewId} deleted successfully.` });
  } else {
    res.status(404).json({ error: `Review with ID ${reviewId} not found.` });
  }
}
