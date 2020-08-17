import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./src/views/auth/Loading";
import AppNavigator from "./src/views";
import { configureAxios } from "./src/api/requests";

const App = () => {
	configureAxios();
	return (
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<AppNavigator />
			</PersistGate>
		</Provider>
	);
};

const styles = StyleSheet.create({});

export default App;
