import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() { }

  form = {
    login:true,
    register:false,
    forgotPassword: false
  }

  registerPage(){
    this.form.login=false;
    this.form.register = true;
    this.form.forgotPassword = false;
  }

  loginPage(){
    this.form.login = true;
    this.form.register = false;
    this.form.forgotPassword = false;
  }

  forgotPassword(){
    this.form.login = false;
    this.form.register = false;
    this.form.forgotPassword = true;
  }

  ngOnInit() {
  }

}
