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
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,InputTextModule,ButtonModule,PasswordModule, DividerModule, MessageModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  value!: string;
  isError:boolean = false;
  errorMsg:string="";
  constructor(private fb: FormBuilder,private _AuthApiService: AuthApiService, private _Router:Router ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      console.log('Form Submitted:', formData);
      this._AuthApiService.resetPassword(formData).subscribe({
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
    const field = this.resetPasswordForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
  isFieldDirty(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
    return !!field?.dirty;
  }

}
