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

  setBooks(){
    let booksString = JSON.stringify(this.BooksList);
    if (localStorage.getItem(this.booksKey) == null) {
    localStorage.setItem(this.booksKey,booksString);
    }
  }

  getBooks(){
    return new Observable<IBook[]>(obs => {

      let bString = localStorage.getItem(this.booksKey);
      if(bString){
        let booksList:IBook[] = JSON.parse(bString);
        obs.next(booksList);
        obs.complete();
        return;
      }
      
        obs.next([]);
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
  

  
}
