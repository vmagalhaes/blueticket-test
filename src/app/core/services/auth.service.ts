import { Injectable } from '@angular/core';

class ILogin {
  userid: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  } 

}