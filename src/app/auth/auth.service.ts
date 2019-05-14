import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  createUser(email: string, name: string, password: string) {
    const user = {email, name, password};
    this.http.post('http://localhost:3000/api/user/signup', user)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const user = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
      });
  }
}
