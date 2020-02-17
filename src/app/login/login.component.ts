import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  signInForm: FormGroup;
  signUpForm: FormGroup;

  ngOnInit() {
    this.signInForm = new FormGroup({
      // example controls
      'username': new FormControl(null),
      'password': new FormControl(null)
    });

    this.signUpForm = new FormGroup({
      // example controls
      'name': new FormControl(null),
      'username': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  onSubmit() {
    this.apiService.getUser(this.signInForm.get('username').value, this.signInForm.get('password').value).then(
      (data) => {
        console.log("data:" + data)
        if (data == null) {
          console.log("SIGN UP")
        }
        else {
          console.log("got data?")
        }
      }
    );
  }

  onSignUp() {
    this.apiService.setUser(this.signUpForm.get('name').value, this.signUpForm.get('username').value, this.signUpForm.get('password').value)
  }
}
