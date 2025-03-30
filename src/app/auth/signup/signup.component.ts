import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AccountsService } from '../../core/services/accounts.service';


@Component({
  selector: 'app-signup',
  imports: [MatInputModule,MatButtonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  signupForm!: FormGroup;
  fb = inject(FormBuilder);
  accounts = inject(AccountsService);
  _snackBar = inject(MatSnackBar);
  router = inject(Router);

  ngOnInit() {
    this.form();
  }

  form() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(){
    if(this.signupForm.valid){
      this.accounts.signup(this.name.value,this.email.value,this.password.value).subscribe(res =>{
        if(res){
          this._snackBar.open("You Are Registered Successfully")
          this.router.navigateByUrl('/auth/login');
        }
      })
    }
  }

  get email(){
    return this.signupForm.get('email') as FormControl;
  }

  get name(){
    return this.signupForm.get('name') as FormControl;

  }

  get password(){
    return this.signupForm.get('password') as FormControl;
  }
}
