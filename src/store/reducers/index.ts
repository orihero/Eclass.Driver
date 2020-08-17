import { USER_LOADED, USER_LOGGED_OUT } from "./../types";
import { combineReducers, AnyAction } from "redux";
const initialState = {
	access_token: "",
	email: "",
	password: "",
};

interface AuthState {
	access_token: string;
	email: string;
	password: string;
}

let auth = (state = initialState, { type, payload }: AnyAction): AuthState => {
	switch (type) {
		case USER_LOADED:
			return payload;
		case USER_LOGGED_OUT:
			return initialState;
		default:
			return state;
	}
};

let rootReducer = combineReducers({ auth });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
