import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { getToken } from '../State/auth.selector';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
    take(1),
    exhaustMap((token)=>{
      if(!token) {
        return next.handle(request);
      }
      let modifiedReq = request.clone({
        params: request.params.append('auth', String(token)),
      })
      return next.handle(modifiedReq);
    })
    );
  }
}
