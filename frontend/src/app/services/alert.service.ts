import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  displayAlert(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }

  handleError(error: any) {
    let message = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Error: ${error.error.message}`;
    } else if (error instanceof HttpErrorResponse) {
      message = `${error.status}: ${error.message}`;
    }

    this.displayAlert(message);
    return EMPTY;
  }
}
