import { Injectable } from '@angular/core';
import { Book } from '../constants/books';
import { map, Observable } from 'rxjs';
import { IBook } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksKey = 'books';
  private BooksList = Book;
  constructor() { }

  setBooks() {
    let booksString = JSON.stringify(this.BooksList);
    if (localStorage.getItem(this.booksKey) == null) {
      localStorage.setItem(this.booksKey, booksString);
    }
  }

  getBooks() {
    return new Observable<IBook[]>(obs => {

      let bString = localStorage.getItem(this.booksKey);
      if (bString) {
        let booksList: IBook[] = JSON.parse(bString);
        obs.next(booksList);
        obs.complete();
        return;
      }

      obs.next([]);
      obs.complete();

    })
  }

  getBookById(id: number) {
    return new Observable<IBook | undefined>(obs => {

      let bString = localStorage.getItem(this.booksKey);
      if (bString) {
        let booksList: IBook[] = JSON.parse(bString);
        let book = booksList.find(x => x.Id == id)
        obs.next(book);
        obs.complete();
        return;
      }

      obs.next(undefined);
      obs.complete();

    })
  }

  purchaseBook(userId: string, bookId: number): Observable<IBook | undefined> {
    return this.getBooks().pipe(
      map((books: IBook[]) => {
        const purchasedBook = books.find(book => book.Id === bookId);

        if (purchasedBook) {
          purchasedBook.PurchasedBy.push(userId);
          const updatedBooks = books.map(book =>
            book.Id === purchasedBook.Id ? purchasedBook : book
          );

          localStorage.setItem(this.booksKey, JSON.stringify(updatedBooks));
        }

        return purchasedBook;
      })
    );
  }

  saveBookPosition(bookObj: IBook | undefined, scrollPosition: number, chapterIndex: number, userId: string | undefined) {
    if (bookObj && scrollPosition && userId) {
      if (!bookObj.LastReadPosition) {
        bookObj.LastReadPosition = {};
      }
      bookObj.LastReadPosition[userId] = { ChapterIndex: chapterIndex, ContentOffset: scrollPosition };

      this.getBooks().subscribe(res => {
        debugger;
        let bookArray: IBook[] = res;
        if (bookArray.length) {
          const book = bookArray.find(book => book.Id == bookObj.Id);
          if (book) {
            Object.assign(book, bookObj);
            this.BooksList = [...bookArray];
          }
        }

        localStorage.setItem(this.booksKey,JSON.stringify(this.BooksList));
      });
    }
  }



}
