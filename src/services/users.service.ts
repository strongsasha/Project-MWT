import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../entities/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient);
  users:User[] = [new User("JankoService", "janko@janko.sk"),
           new User("MarienkaService", "marienka@janko.sk", 2, new Date('2025-01-01')),
           {name:"JožkoService", email: "jozko@janko.sk", password: "heslo"}
  ];
  
  getUsersSynchronous():User[] {
    return this.users;
  }

  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users').pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser)))
    );
  }

  login(auth:Auth): Observable<string> {
    return this.http.post('http://localhost:8080/login',auth, {responseType: 'text'})
  }
}
