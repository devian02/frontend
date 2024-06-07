import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { UserProfile } from "../models/user.model";
import { inject } from "@angular/core";
import { AuthService } from "../app/auth/auth.service";
import { NgForm } from "@angular/forms";
import { IpsService } from "../app/dashboard/ips.service";

// Define the structure of the store
export type UserState = {
  data: UserProfile | null;
  isLoading: boolean;
};

// Define the initial state of the store
const userInitialState: UserState = {
  data: null,
  isLoading: false,
};

export const UserStore = signalStore(
  withState(userInitialState),
  withMethods((store, authService = inject(AuthService), ispService = inject(IpsService)) => ({
    async loadProfile(): Promise<void> {
      patchState(store, { isLoading: true });

      // Load the user's profile
      authService.getProfile().subscribe((res) => {
        patchState(store, { data: res, isLoading: false });
      });
    },
    logout(): void {
      // Log out the user and remove the token
      localStorage.removeItem("token");
      patchState(store, { data: null });
    },
    async uploadIP(form: NgForm, file: File): Promise<void> {
      // Upload the IP
      patchState(store, { isLoading: true });

      // Upload the file
      ispService.uploadIP({...form.value, file}).subscribe(() => {

        // Load the user's profile again (to update the list of IPs)
        authService.getProfile().subscribe((res) => {
          patchState(store, { isLoading: false });
          patchState(store, { data: res, isLoading: false });
        });

      });
    }
  }))
);

