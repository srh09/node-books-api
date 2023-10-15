import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

import { Category } from '../models/category.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class NytService {
  private _categories$ = new BehaviorSubject<Category[]>([]);

  readonly categories$: Observable<Category[]> = this._categories$.asObservable();

  constructor(private http: HttpClient) {
    console.log('init the service-----');
    this.initCategories();
  }

  private initCategories(): Subscription {
    return this.http
      .get<Category[]>(`${BASE_URL}/nyt/list-names`)
      .pipe(
        tap((categories) => {
          console.log(categories);
          return this._categories$.next(categories);
        })
      )
      .subscribe();
  }
}
