import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { IBook, IBookContent, IUser } from '../../core/interfaces';
import { ActivatedRoute } from '@angular/router';
import { AccountsService, BooksService } from '../../core/services';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-book',
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBookComponent {
  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChild('marker') markerElement!: ElementRef;
  bookObj = signal<IBook | undefined>(undefined);
  currentPage = signal<IBookContent | undefined>(undefined);
  currentPageIndex = signal<number>(0);
  userObj = signal<IUser>({});
  bookId = signal<number | null>(null);

  activeRoute = inject(ActivatedRoute);
  bookService = inject(BooksService);
  _snackBar = inject(MatSnackBar);
  aService = inject(AccountsService);

  ngOnInit() {
    this.getUser();
    
  }
  
  ngAfterViewInit(){
    this.bookId.set(Number(this.activeRoute.snapshot.paramMap.get('id')));
    this.bookId() ? this.getBook(this.bookId()) : null;
  }

  getUser(){
    this.userObj.set(this.aService.getLoggedInUser());
  }

  getBook(id: number | null) {
    if (id) {
      this.bookService.getBookById(id).subscribe(res => {
        if (res) {
          this.bookObj.set(res);
          let key = this.userObj()?.id;
          if (key && res.LastReadPosition?.[key]) {
            let chapterIndex = res.LastReadPosition[key].ChapterIndex;
              this.currentPage.set(res.Data[chapterIndex | 0]);
              this.currentPageIndex.set(chapterIndex | 0);
              setTimeout(() => {   
                this.loadPosition(res.LastReadPosition[key].ContentOffset)
              }, 0);
          }else{
            this.currentPage.set(res.Data[0])
            this.currentPageIndex.set(0);
          }

     
        }
      });
    }
  }

  loadPosition(offSet:number){
    if(this.textContainer){
        const textElement = this.textContainer.nativeElement;
      debugger;
        textElement.style.position = 'relative';
        const rect = textElement.getBoundingClientRect();
    
        const position = (offSet / 100) * rect.height;
          const marker = this.markerElement;  
          if (marker) {
            marker.nativeElement.style.top = `${position}px`;
            marker.nativeElement.style.display = 'block';
            marker.nativeElement.style.left = '50%';
            marker.nativeElement.style.transform = 'translateX(-50%)';

            setTimeout(() => {
              marker.nativeElement.style.display = 'none';
            }, 10000);
          }  
      
    }

  }

  savePosition(e:any){
    const textElement = this.textContainer.nativeElement;
    const rect = textElement.getBoundingClientRect();
    const clickPosition = e.clientY - rect.top;
  
    const percentagePosition = (clickPosition / rect.height) * 100;


    this.bookService.saveBookPosition(this.bookObj(),percentagePosition,this.currentPageIndex(),this.userObj()?.id)
    this._snackBar.open("Your History Saved" )
  }
  

  nextPreviousPage(operation: 'next' | 'previous') {
    const bookData = this.bookObj()?.Data;
    const currentIndex = this.currentPageIndex();
    
    if (!bookData || bookData.length === 0) return;
  
    if (operation === 'next' && currentIndex < bookData.length - 1) {
      this.currentPage.set(bookData[currentIndex + 1]);
      this.currentPageIndex.set(currentIndex + 1);
    } else if (operation === 'previous' && currentIndex > 0) {
      this.currentPage.set(bookData[currentIndex - 1]);
      this.currentPageIndex.set(currentIndex - 1);
    }
  }

}
