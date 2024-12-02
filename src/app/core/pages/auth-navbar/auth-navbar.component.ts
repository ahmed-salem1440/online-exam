import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [MenubarModule,],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.css'
})
export class AuthNavbarComponent implements OnInit {
  items: MenuItem[] =[];
  selectedLanguage:string = "English";
  ngOnInit() {
      this.items = [
          {
            label:this.selectedLanguage,
            styleClass:"border-none",
            items: [
              
              {
                label: 'English',
                command:()=> this.changeSelectedLanguage("English")
              },
              {
                label: 'عربي',
                command:()=> this.changeSelectedLanguage("عربي")
              },

              ]
          },
          {
              label: 'Login',
              routerLink: "login",
              routerLinkActive: 'router-active',
              routerLinkActiveOptions: { exact: true }
            },
            {
              label: 'Register',
              routerLink: "register",
              routerLinkActive: 'router-active',
              routerLinkActiveOptions: { exact: true }
          }
      ]
  }
  changeSelectedLanguage(language:string){
    this.selectedLanguage = language;
    this.items[0].label = this.selectedLanguage
    }
}

