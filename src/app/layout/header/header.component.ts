import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AccountsService } from '../../core/services';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,MatButtonModule, MatIconModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  accountService = inject(AccountsService)

  logout(){
    this.accountService.logout();
  }
 }
