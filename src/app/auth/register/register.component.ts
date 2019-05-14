import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  signUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }
}
