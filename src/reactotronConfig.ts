import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { reactotronRedux } from "reactotron-redux";

//@ts-ignore
export default Reactotron.setAsyncStorageHandler(AsyncStorage)
	.configure({ host: "localhost" })
	// .configure()
	.use(reactotronRedux())
	.useReactNative()
	.connect();
