import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserStore } from '../../state/user.state';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CardModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    DividerModule
  ],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [UserStore]
})
export class AuthComponent {

  // Show the sign in form by default (and hide the sign up form)
  showSignIn = true;
  showSignUp = false;

  // Show the loading spinner when signing in or signing up
  isSigningIn = false;
  isSigningUp = false;

  // Inject the auth service and router
  private authService = inject(AuthService);
  private router = inject(Router);

  // Inject the user store
  readonly userStore = inject(UserStore);

  onSignIn(form: NgForm) {

    this.isSigningIn = true;

    // Sign in the user
    this.authService.signIn(form.value).subscribe(() => {
      this.isSigningIn = false;

      // Load the user's profile
      this.userStore.loadProfile();

      // Redirect to the dashboard
      this.router.navigate(['/dashboard']);

    }, () => {
      this.isSigningIn = false;
    });

  }


  onSignUp(form: NgForm) {

    this.isSigningUp = true;

    // Sign up the user
    this.authService.signUp(form.value).subscribe(() => {
      this.isSigningUp = false;

      // Load the user's profile
      this.userStore.loadProfile();

      // Redirect to the dashboard
      this.router.navigate(['/dashboard']);

    }, () => {
      this.isSigningUp = false;
    });

  }
}
