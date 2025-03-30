import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AccountsService } from '../../core/services/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from '../../core/services/books.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [MatInputModule,MatIconModule,MatButtonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  loginForm! :FormGroup;
  fb = inject(FormBuilder);
  accounts = inject(AccountsService);
  _snackBar = inject(MatSnackBar);
  router = inject(Router);
  bookService = inject(BooksService);

  ngOnInit(){
    this.form();
  }

  form(){
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }  

  Login(){
    if(this.loginForm.valid){
      this.accounts.login(this.email.value,this.password.value).subscribe(res =>{
        if(res){
          this.router.navigateByUrl('');
          this.bookService.setBooks();
        }else{
          this._snackBar.open("Username OR Password is invalid")
          this.loginForm.reset();
        }
      })
    }
  }

  get email(){
    return this.loginForm.get('email') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl;
  }
}
