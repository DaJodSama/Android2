import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = ({ onSearch, onPressCart }) => {
	const [searchText, setSearchText] = useState("");

	const handleSearch = () => {
		onSearch(searchText);
	};

	return (
		<View style={styles.header}>
			<View style={styles.topbar}>
				<Text style={styles.texthome}>Home</Text>
				<TouchableOpacity style={styles.logout}>
					<Text style={{color:"white"}}>Logout</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.menu}>
				<Image
					style={styles.logo}
					source={require("../../assets/images/logo/logo.png")}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search"
					onChangeText={(text) => setSearchText(text)}
					onBlur={handleSearch}
				/>
				<TouchableOpacity onPress={onPressCart}>
					<Image
						style={styles.cartIcon}
						source={require("../../assets/images/header/cart.png")}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.cimage}>
				<Image style={styles.image} source={require("../../assets/images/banner/banner.png")}/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {},
	topbar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 4,
	},
	texthome: {
		fontWeight: "bold",
		fontSize: 24,
		padding: 10,
	},
	logout: {
		padding: 10,
		backgroundColor: "#AD40AF",
		borderRadius: "50%",
	},
	menu: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	title: {
		color: "black",
		fontSize: 20,
	},
	searchInput: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		paddingLeft: 10,
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 10,
	},
	cartIcon: {
		width: 50,
		height: 50,
	},

	logo: {
		width: 100,
		height:100,
	},
	cimage:{
		padding:10,
		
	},
	image:{
		width:"auto",
		height:250,borderRadius:30,
	},
});

export default Header;
