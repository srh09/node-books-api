import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogin = true;
  form!: FormGroup;
  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.subscription = this.auth.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.isLogin);
      const username = this.form.value.username;
      const password = this.form.value.password;

      if (this.isLogin) {
        this.auth
          .login(username, password)
          .pipe(catchError((err) => this.handleLoginError(err)))
          .subscribe();
      } else {
        this.auth
          .register(username, password)
          .pipe(catchError((err) => this.alert.handleError(err)))
          .subscribe(() => {
            this.alert.displayAlert('Sucessfully Registered. Please Login.');
            this.isLogin = true;
            this.form.reset();
          });
      }
    }
  }

  private handleLoginError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.alert.displayAlert('Invalid Username or Password.');
    } else {
      this.alert.displayAlert(`${err.status}: ${err.message}`);
    }
    this.form.reset();
    return EMPTY;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
