import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  user: User | null = null;
  subscription!: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.auth.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.router.navigate(['/books']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onLogout(): void {
    this.auth.logout().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
