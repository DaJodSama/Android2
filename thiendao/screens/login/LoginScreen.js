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
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
	const navigation = useNavigation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (username && password) {
			// Tài khoản mẫu mà bạn muốn sử dụng
			const defaultUsername = "dajod";
			const defaultPassword = "123";

			// Lấy thông tin người dùng từ AsyncStorage
			const storedUsername = await AsyncStorage.getItem("username");
			const storedPassword = await AsyncStorage.getItem("password");

			// Kiểm tra thông tin đăng nhập
			if (
				(username === storedUsername && password === storedPassword) ||
				(username === defaultUsername && password === defaultPassword)
			) {
				alert("Đăng nhập thành công");
				navigation.navigate("TrangChu");
			} else {
				alert("Sai tên người dùng hoặc mật khẩu");
			}
		} else {
			alert("Vui lòng nhập tên người dùng và mật khẩu.");
		}
	};

	const handleRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<View style={styles.home}>
			<Image
				style={styles.Logo}
				source={require("../../assets/images/logo/logo.png")}
			/>
			<Text style={styles.title}>Login to Your Account</Text>

			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={(text) => setUsername(text)}
				value={username}
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
			/>

			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button1}>
				<Text style={styles.buttonText} onPress={handleRegister}>
					Sign up
				</Text>
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

export default LoginScreen;
