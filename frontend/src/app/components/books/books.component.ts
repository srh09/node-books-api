import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book, Category } from 'src/app/models/nyt.model';
import { NytService } from 'src/app/services/nyt.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  categories$!: Observable<Category[]>;
  books$!: Observable<Book[]>;

  activeCategoryName: string | null = null;

  constructor(private router: Router, private nytService: NytService) {}

  ngOnInit(): void {
    this.categories$ = this.nytService.categories$;
    this.books$ = this.nytService.books$;
  }

  onSelectCategory(category: Category) {
    if (category.listNameEncoded === this.activeCategoryName) {
      this.activeCategoryName = null;
      this.nytService.clearBooks();
      return;
    }
    this.activeCategoryName = category.listNameEncoded;
    this.nytService.getBooksByCategoryName(category.listNameEncoded);
  }

  onSelectBook(book: Book) {
    const navExtras: NavigationExtras = {
      state: {
        book: book,
      },
    };
    this.router.navigate(['/books/detail', book.isbn], navExtras);
  }

  onRateBook(book: Book) {
    const navExtras: NavigationExtras = {
      state: {
        book: book,
      },
    };
    this.router.navigate(['/books/rating', book.isbn], navExtras);
  }

  onCommentBook(book: Book) {
    const navExtras: NavigationExtras = {
      state: {
        book: book,
      },
    };
    this.router.navigate(['/books/comments', book.isbn], navExtras);
  }
}
