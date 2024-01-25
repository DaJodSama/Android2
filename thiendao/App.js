import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./screens/home/Header";
import TrangChu from "./screens/home/TrangChu";
import Chitiet from "./screens/home/Chitiet";
import GioHang from "./screens/home/GioHang";
import LoginScreen from "./screens/login/LoginScreen";
import Register from "./screens/login/Register";
import ThanhToan from "./screens/home/ThanhToan";
// import ForgotPassword from "./screens/login/ForgotPassword";
const Stack = createStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="LoginScreen">
				<Stack.Screen name="Header" component={Header} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="TrangChu" component={TrangChu} />
				<Stack.Screen name="Chitiet" component={Chitiet} />
				<Stack.Screen name="GioHang" component={GioHang} />
				<Stack.Screen name="ThanhToan" component={ThanhToan} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
