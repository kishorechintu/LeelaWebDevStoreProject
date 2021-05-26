import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const LOGIN_START = '[auth page] login starts';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SINGUP_SUCCESS = '[auth page] signup success';

export const AUTO_LOGIN_START = '[auth page] auto login start';
export const LOGOUT = '[auth page] logout';

export const loginStart = createAction(LOGIN_START, props<{email: string; password: string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user: User, redirect: boolean}>());
export const loginFail = createAction(LOGIN_FAIL);

export const signUpStart = createAction(SIGNUP_START, props<{email: string, password: string}>());
export const singupSuccess = createAction(SINGUP_SUCCESS, props<{user: User, redirect: boolean}>())

export const autoLoginStart = createAction(AUTO_LOGIN_START);
export const logout = createAction(LOGOUT);