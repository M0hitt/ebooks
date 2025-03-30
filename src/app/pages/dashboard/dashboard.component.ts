import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IBook, IUser } from '../../core/interfaces';
import { BookComponent } from '../../core/shared/component/book/book.component';
import { AccountsService, BooksService } from '../../core/services';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { 
  booksService = inject(BooksService);
  accountService = inject(AccountsService);
  BooksList =  signal<IBook[]>([]);
  user = signal<IUser>({});


  ngOnInit(){
    this.getBooks();
    this.getLoggedInUser();
  }

  getBooks(){
    this.booksService.getBooks().subscribe(res =>{
      this.BooksList.set(res)
    })
  }

  getLoggedInUser(){
    let user = this.accountService.getLoggedInUser();
    if(user){
      this.user.set(user);
    }
  }
}
