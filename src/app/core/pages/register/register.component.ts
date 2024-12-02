import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,InputTextModule,ButtonModule,PasswordModule, DividerModule, MessageModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  registrationForm: FormGroup;
  value!: string;
  isError:boolean = false;
  errorMsg:string="";
  constructor(private fb: FormBuilder,private _AuthApiService: AuthApiService, private _Router:Router ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{4,25}$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required,this.matchPassword]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/),]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log('Form Submitted:', formData);
      this._AuthApiService.signup(formData).subscribe({
        next:(res) => {
          console.log('Registration successful:',res)
          this._Router.navigate(['/auth/login'])
        },
        error:(err) => {
          this.isError = true;
          this.errorMsg = err.error.message;
          console.error('Error during registration:',err);
        },
      })
    } else {
      console.log('Form is invalid');
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
  isFieldDirty(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!field?.dirty;
  }
  matchPassword(control: any) {
    const password = control?.parent?.get('password')?.value;
    if (password !== control.value) {
      return { passwordMismatch: true }; 
    }
    return null;
  }
}