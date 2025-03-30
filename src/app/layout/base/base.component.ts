import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [ HeaderComponent,RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent { }
