import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import {
  autoLoginStart,
  loginStart,
  loginSuccess,
  logout,
  signUpStart,
  singupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/Store/Shared/shared.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ errorMessage: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUsertoLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errRes) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errRes.error.error.message
            );
            return of(setErrorMessage({ errorMessage: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ errorMessage: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(singupSuccess),
        tap(() => {
          this.store.dispatch(setErrorMessage({ errorMessage: '' }));
          this.router.navigate(['/']);
        })
      );
    },
    {
      dispatch: false,
    }
  );

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUsertoLocalStorage(user);
            return singupSuccess({ user, redirect: true });
          }),
          catchError((errRes) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errRes.error.error.message
            );
            return of(setErrorMessage({ errorMessage: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLoginStart),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
          return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['./auth']);
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
