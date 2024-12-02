import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthUIComponent } from "./core/pages/auth-ui/auth-ui.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthUIComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Exam';
}
