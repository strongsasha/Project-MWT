import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;

  register() {

  }
}
