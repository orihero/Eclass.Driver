import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants";
import Login from "./auth/Login";
import { ConnectedProps, connect } from "react-redux";
import Main from "./main/Main";

const Stack = createStackNavigator();

const mapStateToProps = ({ auth }: { auth: { access_token: string } }) => ({
	auth,
});

let connector = connect(mapStateToProps);

type StoreProps = ConnectedProps<typeof connector>;

let AppNavigator = ({ auth }: StoreProps) => {
	return (
		<NavigationContainer>
			<Stack.Navigator headerMode={"none"}>
				{!auth.access_token && (
					<Stack.Screen name={SCREENS.LOGIN} component={Login} />
				)}
				<Stack.Screen name={SCREENS.MAIN} component={Main} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default connector(AppNavigator);
