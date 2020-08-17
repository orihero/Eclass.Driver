import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import LoginScreen from "react-native-login-screen";
import { connect, ConnectedProps } from "react-redux";
import { requests } from "../../api/requests";
import { userLoaded } from "../../store/actions";
import { RootState } from "../../store/reducers";
import logo from "../../assets/logo.jpg";

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
	userLoaded,
};

let connector = connect(mapStateToProps, mapDispatchToProps);

type StoreProps = ConnectedProps<typeof connector>;

const Login = ({ userLoaded }: StoreProps) => {
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({ password: "", email: "" });
	let navigation = useNavigation();
	let onPasswordChange = (password: string) =>
		setState({ ...state, password });
	let onEmailChange = (email: string) => setState({ ...state, email });
	let onLogin = async () => {
		console.log({ state });
		let { email, password } = state;
		if (!email || !password) {
			Alert.alert("Attention", "Please fill all fields!");
			return;
		}
		setLoading(true);
		try {
			let res = await requests.auth.login(email, password);
			console.log({ loginResponse: res.data });
			userLoaded({ ...res.data, ...state });
			setLoading(false);
		} catch (error) {
			console.log(Object.entries(error));
			console.log({ response: error.response });
			Alert.alert("Attention", "Invalid credentials!");
			setLoading(false);
		}
	};
	return (
		<>
			<LoginScreen
				logoComponent={() => <></>}
				spinnerEnable
				spinnerVisibility={loading}
				logoText="Welcome"
				disableSettings
				disableSignupButton
				passwordOnChangeText={onPasswordChange}
				usernameOnChangeText={onEmailChange}
				onPressLogin={onLogin}
				loginButtonTextStyle={{
					fontWeight: "bold",
					color: "#999",
				}}
				usernamePlaceholder={"Email"}
				usernameTitle={"Email"}
				source={logo}
			></LoginScreen>
		</>
	);
};

export default connector(Login);

const styles = StyleSheet.create({});
