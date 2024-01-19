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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
	const navigation = useNavigation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState({});

	const handleSignUp = async () => {
		let err = {};
		if (username && password) {
			// Lưu thông tin người dùng đã đăng ký vào AsyncStorage
			await AsyncStorage.setItem("username", username);
			await AsyncStorage.setItem("password", password);
			handleLoginRedirect();
		} else if (!username) {
			err.username = "Username không được để trống";
		} else if (!password) {
			err.password = "Password không được để trống";
		}
		setErr(err);
		return Object.keys(err).length === 0;
	};
	const handleLogin = async () => {
		const storedUsername = await AsyncStorage.getItem("username");
		const storedPassword = await AsyncStorage.getItem("password");

		if (storedUsername && storedPassword) {
			// Thực hiện logic đăng nhập (ví dụ: kiểm tra thông tin với máy chủ)
			alert(
				`Đăng ký với Tên người dùng: ${storedUsername} và Mật khẩu: ${storedPassword}`
			);
			navigation.navigate("Login"); // Điều hướng
		} else {
			alert(
				"Không thể đăng nhập tự động. Vui lòng đăng nhập bằng tên người dùng và mật khẩu."
			);
		}
	};

	const handleLoginRedirect = () => {
		navigation.navigate("LoginScreen");
	};

	return (
		<View style={styles.home}>
			<Image
				style={styles.Logo}
				source={require("../../assets/images/logo/logo.png")}
			/>
			<Text style={styles.title}>Register</Text>

			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={(text) => setUsername(text)}
				value={username}
			/>
			{err.username ? (
				<Text style={styles.errTextU}>{err.username}</Text>
			) : null}
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
			/>
			{err.password ? (
				<Text style={styles.errTextP}>{err.password}</Text>
			) : null}

			<TouchableOpacity style={styles.button} onPress={handleSignUp}>
				<Text style={styles.buttonText}>Register</Text>
			</TouchableOpacity>
			<Text style={styles.textlogin} onPress={handleLoginRedirect}>
				Have Account?
			</Text>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	home: {
		flex: 1,
		backgroundColor: "white",
		margin: 0,
		padding: 0,
		alignItems: "center",
	},
	Logo: {
		width: 300,
		height: 150,
		marginBottom: 20,
		top: 50,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 30,
		top: 70,
		right: 100,
	},
	input: {
		width: 300,
		height: 50,
		padding: 10,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		marginBottom: 20,
		top: 70,
	},
	textlogin: {
		color: "#AD40AF",
		fontWeight: "bold",
		top: 70,
	},
	button: {
		width: 300,
		backgroundColor: "#AD48AF",
		padding: 20,
		borderRadius: 10,
		marginBottom: 50,
		top: 90,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},
	errTextU: {
		color: "red",
		top: 60,
	},
	errTextP: {
		color: "red",
		top: 60,
	},
});

export default Register;
