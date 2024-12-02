import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { ForgetPasswordComponent } from './core/pages/forget-password/forget-password.component';
import { VerifyOTPComponent } from './core/pages/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './core/pages/reset-password/reset-password.component';

export const routes: Routes = [

    {path:"",redirectTo:"auth",pathMatch:"full"},
    {path:"auth",loadComponent:()=> 
        import('./core/pages/auth-ui/auth-ui.component').then(c => c.AuthUIComponent),
        children:[
            {path:"",redirectTo:"login",pathMatch:"full"},
            {path:"login",component:LoginComponent},
            {path:"forget-password",component:ForgetPasswordComponent},
            {path:"verify-otp",component:VerifyOTPComponent},
            {path:"reset-password",component:ResetPasswordComponent},
            {path:"register",component:RegisterComponent}
        ]
    },
    {path:"home",loadComponent:()=> 
        import('./core/pages/home/home.component').then(c => c.HomeComponent)
    }
];
