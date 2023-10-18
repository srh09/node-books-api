import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Review } from 'src/app/models/db.model';
import { Book } from 'src/app/models/nyt.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-book-comments',
  templateUrl: './book-comments.component.html',
  styleUrls: ['./book-comments.component.scss'],
})
export class BookCommentsComponent {
  text = '';
  book: Book | null = null;
  reviews$!: Observable<Review[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private db: DbService,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.reviews$ = this.db.reviews$;
    this.route.paramMap
      .pipe(
        tap(() => {
          this.book = history.state.book;
        }),
        switchMap(() => this.db.getReviewsByISBN(this.book!.isbn))
      )
      .subscribe();
    console.log('book detail-----');
  }

  onSubmitReview() {
    console.log('review submitted-----');
    console.log(this.text);
    const review: Review = {
      isbn: this.book!.isbn,
      userId: this.auth.user!.id,
      time: new Date().toISOString(),
      text: this.text,
    };
    this.db.createReview(review).subscribe(() => {
      this.text = '';
      this.alert.displayAlert('Review Created!');
    });
  }

  onEditReview(review: Review) {
    console.log('I got edited------');
    console.log(review);
    this.db.updateReviewById(review).subscribe();
  }

  onDeleteReview(review: Review) {
    this.db.deleteReviewById(review).subscribe();
    console.log('I got deleted-----');
  }

  onBack() {
    this.location.back();
  }
}
