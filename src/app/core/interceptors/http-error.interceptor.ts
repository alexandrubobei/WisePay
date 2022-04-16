import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Http interceptor instance
 */
export class HttpErrorInterceptor implements HttpInterceptor {
  /**
   * Intercept
   *
   * @param request Sent request
   * @param next Handler
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMsg = '';

            if (error.error instanceof ErrorEvent) {
              console.log('Client error');
              errorMsg = `Error: ${ error.error.message }`;
            } else {
              console.log('Server error');
              errorMsg = `Error Code: ${ error.status },  Message: ${ error.message }`;
            }

            console.log(errorMsg);

            return throwError(errorMsg);
          }
        )
      );
  }
}
