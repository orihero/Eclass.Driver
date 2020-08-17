import AsyncStorage from "@react-native-community/async-storage";
import { compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import reactotronConfig from "../reactotronConfig";
import rootReducer from "./reducers";
// Middleware: Redux Persist Config
const persistConfig = {
	// Root
	key: "root",
	// Storage Method (React Native)
	storage: AsyncStorage,
	// Whitelist (Save Specific Reducers)
	whitelist: ["auth"],
	// Blacklist (Don't Save Specific Reducers)
	blacklist: [],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
	persistedReducer,
	//@ts-ignore
	compose(reactotronConfig.createEnhancer())
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export { store, persistor };
