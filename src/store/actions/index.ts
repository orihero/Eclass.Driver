import { USER_LOADED } from "./../types";
export const userLoaded = (payload: any) => ({
	type: USER_LOADED,
	payload,
});
