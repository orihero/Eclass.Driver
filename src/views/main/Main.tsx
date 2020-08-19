import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Platform,
} from "react-native";
import Picker, { Item, PickerStyle } from "react-native-picker-select";
import Icon from "react-native-vector-icons/AntDesign";
import Spinner from "react-native-spinkit";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import { requests } from "../../api/requests";
import { RootState } from "../../store/reducers";
import { connect, ConnectedProps } from "react-redux";
import { USER_LOGGED_OUT } from "../../store/types";

let regionIds: Item[] = [
	{
		label: "1",
		value: "1",
	},
	{
		label: "2",
		value: "2",
	},
	{
		label: "3",
		value: "3",
	},
	{
		label: "4",
		value: "4",
	},
	{
		label: "5",
		value: "5",
	},
	{
		label: "6",
		value: "6",
	},
	{
		label: "7",
		value: "7",
	},
	{
		label: "7",
		value: "7",
	},
	{
		label: "8",
		value: "8",
	},
	{
		label: "9",
		value: "9",
	},
	{
		label: "10",
		value: "10",
	},
];

const mapStateToProps = ({ auth: { email } }: RootState) => ({ email });

const mapDispatchToProps = {};

let connector = connect(mapStateToProps);

type StoreProps = ConnectedProps<typeof connector>;

const Main = ({ email, dispatch }: StoreProps) => {
	const [routeId, setRouteId] = useState("");
	const [sending, setSending] = useState(false);
	let onStart = () => {
		setSending(!sending);
	};

	let onLogoutPress = () => {
		dispatch({ type: USER_LOGGED_OUT });
	};

	useEffect(() => {
		if (!sending) {
			BackgroundGeolocation.stop();
		} else {
			BackgroundGeolocation.configure({
				desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
				stationaryRadius: 50,
				distanceFilter: 50,
				notificationTitle: "Background tracking",
				notificationText: "enabled",
				debug: false,
				startOnBoot: false,
				stopOnTerminate: true,
				locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
				interval: 10000,
				fastestInterval: 10000,
				activitiesInterval: 10000,
				stopOnStillActivity: false,
			});

			BackgroundGeolocation.on("location", (location) => {
				// handle your locations here
				// to perform long running operation on iOS
				// you need to create background task
				BackgroundGeolocation.startTask(async (taskKey) => {
					// execute long running task
					// eg. ajax post location
					// IMPORTANT: task has to be ended by endTask
					console.log({ location });

					try {
						let res = requests.main.updateLocation(
							location.latitude,
							location.longitude,
							routeId,
							email
						);
					} catch (error) {
						console.log(error);
						console.log(error.response);
					}
					BackgroundGeolocation.endTask(taskKey);
				});
			});
			BackgroundGeolocation.start();
		}
	}, [sending]);
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Text style={styles.title}>SELECT ROUTE</Text>
				<Picker
					value={routeId}
					onValueChange={(e) => setRouteId(e?.toString())}
					items={regionIds}
					style={pickerStyles}
					placeholder={{ label: "--" }}
					Icon={() => (
						<Icon
							name="down"
							size={20}
							style={{
								left: 20,
								top: Platform.select({ android: 20, ios: 2 }),
							}}
							color="#999"
						/>
					)}
				/>
			</View>
			<View>
				<View style={styles.center}>
					{sending && (
						<View
							style={{
								position: "absolute",
								...styles.center,
							}}
						>
							<Spinner type="Pulse" size={160} />
						</View>
					)}
					<TouchableOpacity onPress={onStart}>
						<View style={styles.icon}>
							{!sending ? (
								<Icon
									name="caretright"
									color="#333"
									size={40}
								/>
							) : (
								<Icon name="pause" color="#333" size={40} />
							)}
						</View>
					</TouchableOpacity>
				</View>
				<Text
					onPress={onStart}
					style={{ ...styles.title, marginTop: 40 }}
				>
					{!sending ? "START" : "STOP"}
				</Text>
			</View>
			<TouchableOpacity onPress={onLogoutPress} style={styles.row}>
				<Icon name="exit" />
				<Text style={styles.title}>LOGOUT</Text>
			</TouchableOpacity>
		</View>
	);
};

export default connector(Main);

let pickerStyles: PickerStyle = {
	inputAndroid: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#999",
	},
	inputIOS: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#999",
	},
	viewContainer: {
		width: 30,
	},
};

const styles = StyleSheet.create({
	center: { justifyContent: "center", alignItems: "center" },
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#333",
	},
	title: {
		color: "#999",
		fontSize: 18,
		fontWeight: "bold",
		paddingHorizontal: 20,
	},
	icon: {
		width: 80,
		height: 80,
		borderRadius: 80,
		backgroundColor: "#999",
		justifyContent: "center",
		alignItems: "center",
	},
	row: {
		flexDirection: "row",
	},
});
