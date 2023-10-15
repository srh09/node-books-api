import { Component, OnInit } from '@angular/core';

import { NytService } from '../../services/nyt.service';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories$ = new Observable<Category[]>();

  constructor(private nytService: NytService) {}

  ngOnInit(): void {
    console.log('on init here-----');
    this.categories$ = this.nytService.categories$;
  }
}
