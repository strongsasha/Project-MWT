import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../entities/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users:User[] = [new User("Janko", "janko@janko.sk"),
           new User("Marienka", "marienka@janko.sk", 2, new Date('2025-01-01')),
           {name:"Jožko", email: "jozko@janko.sk", password: "heslo"}
  ];
  selectedUser?: User;

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
