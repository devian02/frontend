import { Injectable, inject } from '@angular/core';
import { CreateUser, SignInUser, UserProfile } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Sign up a new user
  signUp(createUser: CreateUser) {

    return this.http.post<{token: string}>('http://localhost:3000/auth/signUp', createUser).pipe(tap((res) => {
      localStorage.setItem('token', res.token);
    }));

  }

  // Sign in an existing user
  signIn(signInUser: SignInUser) {

    return this.http.post<{token: string}>('http://localhost:3000/auth/signIn', signInUser).pipe(tap((res) => {
      localStorage.setItem('token', res.token);
    }));

  }

  // Get the user's profile information
  getProfile() {
    return this.http.get<UserProfile>('http://localhost:3000/auth/profile');
  }

  // Get the user's JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
