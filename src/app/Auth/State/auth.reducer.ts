import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, singupSuccess } from './auth.actions';
import { authInitialState } from './auth.state';

export const _authReducer = createReducer(
  authInitialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(singupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
