import { Component, inject, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user';
import { DatePipe } from '@angular/common';
import { GroupsToStringPipe } from '../../pipes/groups-to-string.pipe';
import {MatIconModule} from '@angular/material/icon';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-extended-users',
  imports: [MatTableModule, MatIconModule, DatePipe, GroupsToStringPipe],
  templateUrl: './extended-users.component.html',
  styleUrl: './extended-users.component.css'
})
export class ExtendedUsersComponent implements OnInit {
  usersService = inject(UsersService);
  msgService = inject(MessageService);
  users: User[] = [];
  columnsToDisplay = ['id', 'name', 'email', 'active', 'lastLogin', 'groups', 'permissions', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getExtendedUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id!).subscribe(success => {
      this.msgService.success('User '+ user.name +' deleted');
      this.loadUsers();
    })
  }
}
