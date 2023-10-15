import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book, Category } from 'src/app/models/category.model';
import { NytService } from 'src/app/services/nyt.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  categories$ = new Observable<Category[]>();
  books$ = new Observable<Book[]>();

  activeCategoryName: string | null = null;

  constructor(private router: Router, private nytService: NytService) {}

  ngOnInit(): void {
    console.log('on init here-----');
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
    console.log('selectedCategory----');
    console.log(category);
  }

  onSelectBook(book: Book) {
    const navExtras: NavigationExtras = {
      state: {
        book: book,
      },
    };
    this.router.navigate(['/books', book.isbn], navExtras);
    console.log('book selected------');
  }
}
