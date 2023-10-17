import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/nyt.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-book-rating',
  templateUrl: './book-rating.component.html',
  styleUrls: ['./book-rating.component.scss'],
})
export class BookRatingComponent {
  isRated = false;
  book!: Book;
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService,
    private db: DbService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.book = history.state.book;
      this.db
        .getRatingsByISBNAndUserID(history.state.book.isbn, this.auth.user!.id)
        .subscribe((rating) => {
          console.log('the rating is here----');
          console.log(rating);
          if (rating) {
            this.rating = rating.rating;
            this.isRated = true;
          }
        });
    });
  }

  onRate(rating: number) {
    this.rating = rating;
    console.log('rated------');
    console.log(rating);
    this.db
      .createOrUpdateRating({
        isbn: this.book.isbn,
        userId: this.auth.user!.id,
        rating: rating,
      })
      .subscribe(() => {
        this.isRated = true;
      });
  }

  onDelete() {
    this.db
      .deleteRatingByISBNAndUserID(this.book!.isbn, this.auth.user!.id)
      .subscribe(() => {
        this.rating = 0;
        this.isRated = false;
      });
  }

  onBack() {
    this.location.back();
  }
}
