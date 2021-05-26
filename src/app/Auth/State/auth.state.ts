import { User } from "../models/user.model";

export interface AuthState {
    user: User | null
}

export const authInitialState: AuthState = {
   user: null
}