import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Rating, Review } from '../models/db.model';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';

const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private _reviews$ = new BehaviorSubject<Review[]>([]);

  readonly reviews$: Observable<Review[]> = this._reviews$.asObservable();

  constructor(private http: HttpClient, private alert: AlertService) {}

  // Ratings
  getRatingsByISBNAndUserID(isbn: string, userId: number): Observable<Rating> {
    return this.http
      .get<Rating>(`${URL}/ratings?isbn=${isbn}&userId=${userId}`)
      .pipe(catchError((err) => this.alert.handleError(err)));
  }

  createOrUpdateRating(rating: Rating): Observable<Rating> {
    return this.http
      .post<Rating>(`${URL}/ratings`, rating)
      .pipe(catchError((err) => this.alert.handleError(err)));
  }

  deleteRatingByISBNAndUserID(isbn: string, userId: number): Observable<void> {
    return this.http
      .delete<void>(`${URL}/ratings?isbn=${isbn}&userId=${userId}`)
      .pipe(catchError((err) => this.alert.handleError(err)));
  }

  // Reviews
  getReviewsByISBN(isbn: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${URL}/reviews/${isbn}`).pipe(
      catchError((err) => this.alert.handleError(err)),
      tap((reviews) => this._reviews$.next(reviews))
    );
  }

  createReview(review: Review) {
    return this.http
      .post<Object>(`${URL}/reviews`, {
        isbn: review.isbn,
        userId: review.userId,
        time: review.time,
        text: review.text,
      })
      .pipe(
        catchError((err) => this.alert.handleError(err)),
        switchMap(() => this.getReviewsByISBN(review.isbn))
      );
  }

  updateReviewById(review: Review) {
    return this.http
      .put(`${URL}/reviews/${review.id}`, {
        isbn: review.isbn,
        userId: review.userId,
        time: review.time,
        text: review.text,
      })
      .pipe(
        catchError((err) => this.alert.handleError(err)),
        switchMap(() => this.getReviewsByISBN(review.isbn))
      );
  }

  deleteReviewById(review: Review) {
    return this.http.delete(`${URL}/reviews/${review.id}`).pipe(
      catchError((err) => this.alert.handleError(err)),
      switchMap(() => this.getReviewsByISBN(review.isbn))
    );
  }
}
