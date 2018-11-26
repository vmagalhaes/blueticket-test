import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public router: Router,    
    private authService: AuthService
  ) { }

  logout(): void {
    console.log(this.router.url);
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
