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
					source={require("../../assets/images/header/cart.jpg")}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		marginTop: 20,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		color: "black",
		fontSize: 20,
	},
	searchInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingLeft: 10,
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 15,
	},
	cartIcon: {
		width: 30,
		height: 30,
	},

	logo: {
		width: 40,
		height: 40,
	},
});

export default Header;
