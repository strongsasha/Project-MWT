import { Component, inject } from '@angular/core';
import { Auth } from '../../entities/auth';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usersService = inject(UsersService);
  auth = new Auth("Peter", "sovy");

  login() {
    this.usersService.login(this.auth).subscribe(token => console.log('token', token));
  }
}
