import { RootState } from "./../store/reducers/index";
import React from "react";
import axios from "axios";
import { store } from "../store/configureStore";

export let url = "https://eclass.bigappleacademy.com/driver";

let configureAxios = () => {
	axios.interceptors.request.use((config) => {
		config.headers = {
			...config.headers,
			Authorization: `Bearer  ${store.getState().auth.access_token}`,
		};
		return config;
	});
};

export let requests = {
	auth: {
		login: (email: string, password: string) =>
			axios.post(`${url}/apilogin?email=${email}&password=${password}`),
	},
	main: {
		updateLocation: (
			latitute: string | number,
			longitude: string | number,
			routeId: string | number,
			email: string | number
		) =>
			axios.post(
				`${url}/apiupdate?attitude=${latitute}&longitude=${longitude}&routeId=${routeId}&email=${email}`
			),
	},
};
