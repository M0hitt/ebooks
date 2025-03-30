import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private localStorageKey = 'users'; 
  private loggedInUserKey = 'loggedInUser';
  router = inject(Router)


  signup(name: string, email: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const users = this.getUsers();
      
      if (users.some(user => user.email === email)) {
        observer.next(false);
        observer.complete();
        return;
      }

      const newUser = { id: this.generateGUID(), name, email, password };
      users.push(newUser);
      localStorage.setItem(this.localStorageKey, JSON.stringify(users));

      observer.next(true);
      observer.complete();
    });
  }

  private generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
        observer.next(true);
      } else {
        observer.next(false);
      }

      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey);
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user) : null;
  }


  private getUsers(): any[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}
