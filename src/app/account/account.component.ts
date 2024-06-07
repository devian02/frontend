import { JsonPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { UserStore } from '../../state/user.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    JsonPipe,
    CardModule,
    CommonModule,
    DividerModule,
    ButtonModule,
    BadgeModule,
    RouterModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  providers: [UserStore]
})
export class AccountComponent {

  // Inject the user store (to access the user's profile information)
  readonly userStore = inject(UserStore);

  ngOnInit() {

    // Load the user's profile on component initialization
    this.userStore.loadProfile();
  }

}
