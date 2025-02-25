import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user';
import { catchError, EMPTY, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../entities/auth';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient);
  msgService = inject(MessageService); 
  users:User[] = [new User("JankoService", "janko@janko.sk"),
           new User("MarienkaService", "marienka@janko.sk", 2, new Date('2025-01-01')),
           {name:"JožkoService", email: "jozko@janko.sk", password: "heslo"}
  ];
  token = '';
  
  getUsersSynchronous():User[] {
    return this.users;
  }

  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users').pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser))),
      catchError(err => this.processError(err))
    );
  }

  login(auth:Auth): Observable<boolean> {
    return this.http.post('http://localhost:8080/login',auth, {responseType: 'text'}).pipe(
      tap(token => {
        this.token = token;
        this.msgService.success("user "+ auth.name +" is logged in");
      }),
      map(token => true),
      catchError(error => this.processError(error))
    );
  }

  processError(error:any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.msgService.error('Server not available');
        return EMPTY;
      }
      if (error.status >= 400 && error.status < 500) {
        const message = error.error?.errorMessage ? error.error.errorMessage : JSON.parse(error.error).errorMessage;
        this.msgService.error(message);
        return EMPTY;
      }
      console.error(error);
      this.msgService.error("Server error, please contact administrator");
    } else {
      console.error(error);
      this.msgService.error("Your angular developer did something wrong");
    }
    return EMPTY;
  }
}
