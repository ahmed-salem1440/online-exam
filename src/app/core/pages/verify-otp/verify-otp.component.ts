import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputOtpModule } from 'primeng/inputotp';
@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [InputOtpModule,CommonModule, ReactiveFormsModule,InputTextModule,ButtonModule,PasswordModule, DividerModule,FormsModule,CheckboxModule, MessageModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOTPComponent {
  otpForm: FormGroup;
  value: any;
  isError:boolean = false;
  errorMsg:string="";
  constructor(private fb: FormBuilder,private _AuthApiService: AuthApiService, private _Router:Router ) {
    this.otpForm = this.fb.group({
      resetCode: ['', [Validators.required]]
    });

  }

  onSubmit() {
    if (this.otpForm.valid) {
      const formData = this.otpForm.value;
      console.log('Form Submitted:', formData);
      
      this._AuthApiService.verifyCode(formData).subscribe({
        next:(res) => {
          console.log("response",res)
          this._Router.navigate(["/auth/reset-password"])
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
    const field = this.otpForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
  isFieldDirty(fieldName: string): boolean {
    const field = this.otpForm.get(fieldName);
    return !!field?.dirty;
  }
}
