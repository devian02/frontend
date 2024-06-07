import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  const messageService = inject(MessageService);

  // Clone the request and add the authorization header if the token exists
  const clonedRequest = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  // Handle the request
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        // Remove the token from localStorage if the response status is 401
        localStorage.removeItem('token');
      }

      // Show an error message (using PrimeNG MessageService and Toast component)
      messageService.add({severity: 'error', summary: 'Error', detail: error.error.message, key: 'err'});

      return throwError(() => error);
    })
  );

};


