import Header from "../home/Header.js";
// import Footer from "../home/Footer.js";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	FlatList,
	Text,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from "react-native";
import GioHang from "./GioHang.js";
import Chitiet from "./Chitiet.js";
import SearchBar from "./SearchBar.js";
import List from "./List.js";

export default function TrangChu({ navigation }) {
	//PRODUCT
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const getProducts = async () => {
		try {
			const response = await fetch(
				"https://65a0fc1d600f49256fb0a360.mockapi.io/api/products/list-product"
			);
			const json = await response.json();
			setData(json);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	//SEARCH
	const [searchPhrase, setSearchPhrase] = useState("");
	const [clicked, setClicked] = useState(false);
	const [fakeData, setFakeData] = useState();

	// get data from the fake api endpoint
	useEffect(() => {
		const getData = async () => {
			const apiResponse = await fetch(
				"https://65a0fc1d600f49256fb0a360.mockapi.io/api/products/list-product"
			);
			const data = await apiResponse.json();
			setFakeData(data);
		};
		getData();
	}, []);

	//ADD TO CART
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

	//NAVIGATE
	const handlePressCart = () => {
		// Chuyển đến trang giỏ hàng khi nhấn vào giỏ hàng
		navigation.navigate("GioHang", { cartItems, setCartItems });
	};

	return (
		<ScrollView>
			<View style={styles.trangchu}>
				<Header
					onPressCart={handlePressCart}
					onSearch={(searchText) => console.log(searchText)}
				/>
				{isLoading ? (
					<Text style={styles.title}>Product</Text>
				) : (
					<FlatList
						numColumns={2}
						data={data}
						keyExtractor={({ id }) => id}
						scrollEnabled={true}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("Chitiet", {
										item,
										cartItems,
										setCartItems,
									})
								}
								style={styles.itemContainer}>
								<Image
									style={styles.image}
									source={{ uri: item.image }}
								/>
								<Text style={styles.name}>{item.name}</Text>
								<TouchableOpacity
									style={styles.addToCartButton}
									onPress={() => handleAddToCart(item)}>
									<Text style={styles.addToCartButtonText}>
										ADD TO CART{" "}
									</Text>
								</TouchableOpacity>
								<Text style={styles.price}>{item.price}</Text>
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	trangchu: {
		flex: 1,
		backgroundColor: "white",
	},
	title: {
		color: "black",
		fontSize: 20,
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
	name: {
		marginTop: 10,
		fontSize: 16,
		color: "#636363",
		textAlign: "center",
	},
	addToCartButton: {
		width: 150,
		marginTop: 10,
		backgroundColor: "#AD40AF",
		padding: 10,
		borderRadius: 20,
	},
	addToCartButtonText: {
		textAlign: "center",
		color: "white",
	},
	price: {
		top: 10,
		fontSize: 18,
		color: "#636363",
	},
});
