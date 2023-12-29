import Header from "../home/Header.js";
import Footer from "../home/Footer.js";
import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	FlatList,
	Text,
	TouchableOpacity,
} from "react-native";
import GioHang from "./GioHang.js";

const anh = [
	{
		id: "1",
		name: "Áo thun 1",
		source: require("../../assets/images/product/image.jpg"),
	},
	{
		id: "2",
		name: "Áo thun 2",
		source: require("../../assets/images/product/image.jpg"),
	},
	{
		id: "3",
		name: "Áo thun 3",
		source: require("../../assets/images/product/image.jpg"),
	},
	{
		id: "4",
		name: "Áo thun 4",
		source: require("../../assets/images/product/image.jpg"),
	},
	{
		id: "5",
		name: "Áo thun 5",
		source: require("../../assets/images/product/image.jpg"),
	},
	{
		id: "6",
		name: "Áo thun 6",
		source: require("../../assets/images/product/image.jpg"),
	},
];

export default function TrangChu({ navigation }) {
	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("Chitiet", { item })}
			style={styles.itemContainer}>
			<Image source={item.source} style={styles.image} />
			<Text style={styles.itemText}>{item.name}</Text>
			<TouchableOpacity
				style={styles.addToCartButton}
				onPress={() => handleAddToCart(item)}>
				<Text style={styles.addToCartButtonText}>ADD TO CART </Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);
	const [cartItems, setCartItems] = useState([]);

	const handleAddToCart = (item) => {
		const existingItem = cartItems.find(
			(cartItem) => cartItem.id === item.id
		);

		if (existingItem) {
			setCartItems((prevItems) =>
				prevItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			setCartItems((prevItems) => [
				...prevItems,
				{ ...item, quantity: 1 },
			]);
		}
	};
	const handlePressCart = () => {
		// Chuyển đến trang giỏ hàng khi nhấn vào giỏ hàng
		navigation.navigate("GioHang", { cartItems });
	};
	<GioHang route={{ params: { cartItems, setCartItems } }} />;

	return (
		<View style={styles.trangchu}>
			<Header
				onPressCart={handlePressCart}
				onSearch={(searchText) => console.log(searchText)}
			/>

			<Image
				style={styles.banner}
				source={require("../../assets/images/banner/banner.jpg")}
			/>
			<Text style={styles.title}>Product</Text>
			<FlatList
				data={anh}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				numColumns={2}
			/>
			<Footer></Footer>
		</View>
	);
}

const styles = StyleSheet.create({
	trangchu: {
		flex: 1,
		backgroundColor: "white",
		margin: 10,
	},
	title: {
		color: "black",
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
		textAlign: "center",
	},
	banner: {
		width: 380,
		height: 200,
	},
	itemContainer: {
		flex: 1,
		alignItems: "center",
		margin: 10,
	},
	image: {
		width: 180,
		height: 180,
		marginBottom: 5,
	},
	itemText: {
		marginTop: 10,
		fontSize: 16,
		color: "black",
		textAlign: "center",
	},
	addToCartButton: {
		width: 150,
		marginTop: 10,
		backgroundColor: "#DDC154",
		padding: 10,
		borderRadius: 20,
	},
	addToCartButtonText: {
		textAlign: "center",
	},
});
