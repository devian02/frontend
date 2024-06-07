import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    importProvidersFrom([
      BrowserAnimationsModule,
    ]),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
};
