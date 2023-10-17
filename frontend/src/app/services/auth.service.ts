import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, tap } from 'rxjs';
import { User } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>({
    id: 2,
    username: 'Reid',
  });

  readonly user$: Observable<User | null> = this._user$.asObservable();

  constructor(private http: HttpClient, private alert: AlertService) {}

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${BASE_URL}/auth/login`, { username: username, password: password })
      .pipe(tap((user) => this._user$.next(user)));
  }

  logout(): Observable<Object> {
    return this.http.post<Object>(`${BASE_URL}/auth/logout`, {}).pipe(
      catchError((err) => this.alert.handleError(err)),
      tap(() => this._user$.next(null))
    );
  }

  register(username: string, password: string): Observable<Object> {
    return this.http.post<User>(`${BASE_URL}/auth/register`, {
      username: username,
      password: password,
    });
  }
}
