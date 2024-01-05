import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Nhập đúng

const Register = () => {
	const navigation = useNavigation(); // Sử dụng đúng

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		navigation.navigate("LoginScreen");
		if (username && password) {
			// Bạn có thể thực hiện xác thực ở đây (gửi thông tin đăng nhập đến máy chủ, v.v.)
			alert(
				`Login với Tên người dùng: ${username} và Mật khẩu: ${password}`
			);
			// Điều hướng đúng
		} else {
			alert("Vui lòng nhập cả tên người dùng và mật khẩu.");
		}
	};
	const handleForgotPassword = () => {
		navigation.navigate("ForgotPassword");
	};
	return (
		<View style={styles.home}>
			{/* <Image
				style={styles.Logo}
				source={require("../../assets/images/logo/logo.png")}
			/> */}
			<Text style={styles.title}>Register Your Account</Text>

			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={(text) => setUsername(text)}
				value={username}
			/>

			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => setPassword(text)}
				value={email}
				secureTextEntry={true}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
			/>

			<TouchableOpacity
				style={styles.button}
				onPress={handleLogin}>
				<Text style={styles.buttonText}>Register</Text>
			</TouchableOpacity>

			<StatusBar style="auto" />
		</View>
	);
};
                                                                             
const styles = StyleSheet.create({
	home: {
		flex: 1,
		backgroundColor: "#0ED2F7",
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	Logo: {
		width: 150,
		height: 150,
		marginBottom: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 50,
		textAlign: "center",
	},
	forgotPassword: {
		width: 150,
		left: 100,
	},
	input: {
		width: 300,
		height: 50,
		padding: 10,
		marginBottom: 15,
		backgroundColor: "#EEEEEE",
		borderWidth: 1,
		borderColor: "#000000",
		borderRadius: 15,
	},
	button: {
		backgroundColor: "black",
		padding: 10,
		borderRadius: 20,
		width: 350,
		height: 50,
		bottom: -10,
	},
	button1: {
		backgroundColor: "black",
		padding: 10,
		borderRadius: 20,
		width: 350,
		height: 50,
		bottom: -20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default Register;
