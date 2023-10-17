import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, catchError, tap } from 'rxjs';

import { Book, Category } from '../models/nyt.model';
import { AlertService } from './alert.service';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class NytService {
  private _categories$ = new BehaviorSubject<Category[]>([]);
  private _books$ = new BehaviorSubject<Book[]>([]);

  readonly categories$: Observable<Category[]> = this._categories$.asObservable();
  readonly books$: Observable<Book[]> = this._books$.asObservable();

  constructor(private http: HttpClient, private alert: AlertService) {
    console.log('init the service-----');
    this.initCategories();
  }

  getBooksByCategoryName(categoryName: string) {
    return this.http
      .get<Book[]>(`${BASE_URL}/nyt/books/${categoryName}`)
      .pipe(catchError((err) => this.alert.handleError(err)))
      .subscribe((books) => this._books$.next(books));
  }

  clearBooks() {
    this._books$.next([]);
  }

  private initCategories(): Subscription {
    return this.http
      .get<Category[]>(`${BASE_URL}/nyt/category-names`)
      .pipe(catchError((err) => this.alert.handleError(err)))
      .subscribe((categories) => this._categories$.next(categories));
  }
}
