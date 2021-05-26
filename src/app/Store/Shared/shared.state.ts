export interface SharedState {
    showLoading: boolean;
    errorMessage: string;
}

export const loadingInitialState: SharedState = {
    showLoading: false,
    errorMessage: ''
}