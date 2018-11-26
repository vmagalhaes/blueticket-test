import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { AuthService } from '../core/services/auth.service';
import { setTimeout } from 'timers';

class Account {
  login: string;
  password: string;
  profilePic: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  message: string;

  registredUser = false;

  submitted = false;
  registering = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  get form() {
    if (!this.registering) {
      return this.loginForm.controls;
    } else {
      return this.registerForm.controls;
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
  }
  
  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.checkUser()){
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.form.login.value);
        this.router.navigate(['/panel']);
      } else {
        this.message = "Por favor, verifique o seu login e a sua senha.";
      }
    }    
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      let users = JSON.parse(localStorage.getItem('users')) || [];

      if (_.find(users, ['login', this.form.login.value])) {
        this.message = 'Esse usuário já existe!';
        return;
      } else {
        users.push({ login: this.form.login.value, password: this.form.password.value });        
      }

      localStorage.setItem('users', JSON.stringify(users));
      this.registering = false;
      this.registredUser = true;
      
      setInterval(() => {
        this.registredUser = false;
      }, 3000);
      this.resetForm();
    }
  }

  checkUser() {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = _.find(users, ['login', this.form.login.value]);

    if (user) {
      if (user.password === this.form.password.value) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isRegistering() {
    this.registering = !this.registering;
    this.resetForm();
  }

  resetForm() {
    this.message = '';    
    this.submitted = false;
    this.loginForm.reset();
    this.registerForm.reset();
  }
}