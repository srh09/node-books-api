import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.user$;
  }
}
