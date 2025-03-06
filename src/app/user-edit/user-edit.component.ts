import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  titleS = signal('New user');
  hide = true;

  userModel = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  save() {
  }
  printErrors(e: ValidationErrors) {
    return JSON.stringify(e);
  }
  get name(): FormControl<string> {
    return this.userModel.get('name') as FormControl<string>;
  }
  get email(): FormControl<string> {
    return this.userModel.get('email') as FormControl<string>;
  }
  get password(): FormControl<string> {
    return this.userModel.get('password') as FormControl<string>;
  }
}
