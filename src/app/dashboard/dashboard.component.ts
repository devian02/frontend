import { Component, inject } from '@angular/core';
import { PublicIPStore } from '../../state/ip.state';
import { CommonModule, JsonPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { UserStore } from '../../state/user.state';
import { BadgeModule } from 'primeng/badge';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    JsonPipe,
    CardModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DividerModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    RouterModule,
    DialogModule,
    InputTextareaModule,
    FloatLabelModule,
    InputNumberModule,
    FileUploadModule,
    ProgressSpinnerModule,
    TagModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [PublicIPStore, UserStore]
})
export class DashboardComponent {

  // Inject the public IP store and user store
  readonly publicIPStore = inject(PublicIPStore);
  readonly userStore = inject(UserStore);

  // Show the dialog by default (and hide the upload form)
  isDialogOpen = false;
  isUploading = false;

  // Store the uploaded file
  uploadedFile?: File;

  // Load all public IPs and the user's profile on component initialization
  ngOnInit() {
    this.publicIPStore.loadAll();
    this.userStore.loadProfile();
  }

}
