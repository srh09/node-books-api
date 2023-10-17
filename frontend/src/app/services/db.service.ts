import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Rating } from '../models/db.model';
import { Observable, catchError } from 'rxjs';

const URL = 'http://localhost:3000/ratings';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient, private alert: AlertService) {}

  getRatingsByISBNAndUserID(isbn: string, userId: number): Observable<Rating> {
    return this.http
      .get<Rating>(`${URL}?isbn=${isbn}&userId=${userId}`)
      .pipe(catchError((err) => this.alert.handleError(err)));
  }

  createOrUpdateRating(rating: Rating): Observable<Rating> {
    return this.http
      .post<Rating>(URL, rating)
      .pipe(catchError((err) => this.alert.handleError(err)));
  }

  deleteRatingByISBNAndUserID(isbn: string, userId: number): Observable<void> {
    return this.http
      .delete<void>(`${URL}?isbn=${isbn}&userId=${userId}`)
      .pipe(catchError((err) => this.alert.handleError(err)));
  }
}
