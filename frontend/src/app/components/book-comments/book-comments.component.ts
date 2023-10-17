import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/nyt.model';

@Component({
  selector: 'app-book-comments',
  templateUrl: './book-comments.component.html',
  styleUrls: ['./book-comments.component.scss'],
})
export class BookCommentsComponent {
  book: Book | null = null;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.book = history.state.book;
    });
    console.log('book detail-----');
  }

  onBack() {
    this.location.back();
  }
}
