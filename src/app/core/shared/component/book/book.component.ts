import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, input, Input, Output, output } from '@angular/core';
import { IBook, IUser } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressPipe } from '../../pipes/progress.pipe';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book',
  imports: [CommonModule,MatButtonModule,MatProgressBarModule,ProgressPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  @Input() bookObj!:IBook; 
  @Input() userObj!:IUser;
  @Output() event = new EventEmitter<boolean>;

  _snackBar = inject(MatSnackBar);
  router = inject(Router);
  bookService = inject(BooksService);

  purchaseBook(bookId:number | undefined){
    debugger;
    let userId = this.userObj.id;
    if(userId && bookId){
      this.bookService.purchaseBook(userId,bookId).subscribe(res =>{
        this.event.emit(true);
      })
    }else{
      this._snackBar.open("Something Went Wrong!!")
    }
    
  }

  viewBook(id:number){
    this.router.navigateByUrl(`/book/${id}`)
  }

 }
