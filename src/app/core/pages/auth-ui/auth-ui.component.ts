import { AuthNavbarComponent } from './../auth-navbar/auth-navbar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContWithComponent } from '../cont-with/cont-with.component';

@Component({
  selector: 'app-auth-ui',
  standalone: true,
  imports: [ContWithComponent, RouterOutlet ,AuthNavbarComponent],
  templateUrl: './auth-ui.component.html',
  styleUrl: './auth-ui.component.css'
})
export class AuthUIComponent {

}
