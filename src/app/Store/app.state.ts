import { AuthReducer } from "../Auth/State/auth.reducer";
import { AUTH_STATE_NAME } from "../Auth/State/auth.selector";
import { AuthState } from "../Auth/State/auth.state";
import { SharedReducer } from "./Shared/shared.reducer";
import { SHARED_STATE_NAME } from "./Shared/shared.selector";
import { SharedState } from "./Shared/shared.state";


export interface AppState {
    [SHARED_STATE_NAME]: SharedState,
    [AUTH_STATE_NAME]: AuthState
}

export const appReducer = {
   [SHARED_STATE_NAME]: SharedReducer,
   [AUTH_STATE_NAME]: AuthReducer
}