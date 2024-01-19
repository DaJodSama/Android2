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
	const [err, setErr] = useState({});

	// Dữ liệu cứng
	const handleLogin = async () => {
		let err = {};
		if (username && password) {
			// Tài khoản mẫu mà bạn muốn sử dụng
			const defaultUsername = "td";
			const defaultPassword = "123";

			// Lấy thông tin người dùng từ AsyncStorage
			const storedUsername = await AsyncStorage.getItem("username");
			const storedPassword = await AsyncStorage.getItem("password");

			// Kiểm tra thông tin đăng nhập
			if (
				(username === storedUsername && password === storedPassword) ||
				(username === defaultUsername && password === defaultPassword)
			) {
				navigation.navigate("TrangChu");
			} else {
				err.password = "Sai tên người dùng hoặc mật khẩu";
			}
		} else if (!username) {
			err.username = "Username không được để trống";
		} else if (!password) {
			err.password = "Password không được để trống";
		}
		setErr(err);
		return Object.keys(err).length === 0;
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
			<Text style={styles.title}>Login</Text>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Username"
					onChangeText={(text) => setUsername(text)}
					value={username}
				/>
				{err.username ? (
					<Text style={styles.errTextU}>{err.username}</Text>
				) : null}
			</View>

			<View style={styles.p}>
				<TextInput
					style={styles.inputpasword}
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
				/>
				<TouchableOpacity>
					<Text style={styles.forgot}>Forgot?</Text>
				</TouchableOpacity>
				{err.password ? (
					<Text style={styles.errTextP}>{err.password}</Text>
				) : null}
			</View>

			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText} onPress={handleRegister}>
					Register
				</Text>
			</TouchableOpacity>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	home: {
		flex: 1,
		padding: 0,
		margin: 0,
		backgroundColor: "white",
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
		marginBottom: 50,
		top: 70,
		right: 110,
	},
	p: {
		alignItems: "center",
	},
	forgot: {
		color: "#AD40AF",
		fontWeight: "bold",
		bottom: 4,
		left: 123,
	},
	input: {
		width: 300,
		height: 50,
		padding: 10,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		marginBottom: 20,
		top: 50,
	},

	inputpasword: {
		width: 300,
		height: 50,
		padding: 10,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		marginBottom: 20,
		top: 50,
	},
	button: {
		width: 300,
		backgroundColor: "#AD48AF",
		padding: 20,
		borderRadius: 10,
		marginBottom: 20,
		top: 70,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},
	errTextU: {
		color: "red",
		top: 40,
	},
	errTextP: {
		color: "red",
		top: 30,
	},
});

export default LoginScreen;
