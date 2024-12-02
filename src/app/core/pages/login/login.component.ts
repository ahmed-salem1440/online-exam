import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { AuthApiService } from 'auth-api';
import { Router, RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,CommonModule, ReactiveFormsModule,InputTextModule,ButtonModule,PasswordModule, DividerModule,FormsModule,CheckboxModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  value!: string;
  isError:boolean = false;
  // rememberMe: boolean = false;
  errorMsg:string="";
  constructor(private fb: FormBuilder,private _AuthApiService: AuthApiService, private _Router:Router ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],

    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Submitted:', formData);
      
      this._AuthApiService.signin(formData).subscribe({
        next:(res) => {
          console.log('login successful:',res)
          this._Router.navigate(['/home'])
        },
        error:(err) => {
          this.isError = true;
          this.errorMsg = err.error.message;
          console.error('Error during login:',err);
        },
      })
    } else {
      console.log('Form is invalid');
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
  isFieldDirty(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!field?.dirty;
  }

}
