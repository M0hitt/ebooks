import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-book',
  imports: [],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBookComponent { }
