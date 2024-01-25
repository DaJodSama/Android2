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
	TextInput,
} from "react-native";
import GioHang from "./GioHang.js";
import Chitiet from "./Chitiet.js";
import SearchBar from "./SearchBar.js";
import List from "./List.js";
import CategoryList from "./CategoryList";

export default function TrangChu({ navigation }) {
	//PRODUCT
	const [products, setProducts] = useState([]);
	const [isModalVisible, setModalVisible] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [displayedFashion, setDisplayedFashion] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("Tất cả");
	const [cartItems, setCartItems] = useState([]);

	const getProducts = () => {
		return fetch(
			"https://65a0fc1d600f49256fb0a360.mockapi.io/api/products/list-product"
		)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
				setDisplayedFashion(data);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		getProducts();
	}, []);

	//category
	const getCategory = (data) => {
		const allCategories = data.map((item) => item.cat);
		return ["Tất cả", ...new Set(allCategories)];
	};

	const handleSelectCategory = (category) => {
		setSelectedCategory(category);
		if (category === "Tất cả") {
			setDisplayedFashion(products);
		} else {
			const filteredProducts = products.filter(
				(item) => item.cat === category
			);
			setDisplayedFashion(filteredProducts);
		}
	};

	//render item
	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("Chitiet", {
					item,
					cartItems,
					setCartItems,
				})
			}
			style={styles.itemContainer}>
			<Image source={{ uri: item.image }} style={styles.image} />
			<Text style={styles.itemText}>{item.name}</Text>
			<Text style={styles.itemTextPrice}>{item.price}$</Text>
			<TouchableOpacity
				style={styles.addToCartButton}
				onPress={() => handleAddToCart(item)}>
				<Text style={styles.addToCartButtonText}>
					{item.id === "no_result" ? "Không phù hợp" : "Add to Cart"}
				</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);

	//ADD TO CART
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
		navigation.navigate("GioHang", { cartItems, setCartItems });
	};

	//search
	const handleSearch = () => {
		const filteredFashion = products.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);

		if (filteredFashion.length > 0) {
			setDisplayedFashion(filteredFashion);
		} else {
			setDisplayedFashion([
				{ id: "no_result", name: "Không có sản phẩm này" },
			]);
		}
	};

	return (
		<ScrollView>
			<View style={styles.trangchu}>
				<TextInput
					style={styles.searchInput}
					placeholder="Tìm kiếm sản phẩm"
					onChangeText={(text) => setSearchText(text)}
					onBlur={handleSearch}
				/>
				<Header
					onPressCart={handlePressCart}
					onSearch={(searchText) => handleSearch(searchText)}
				/>

				<CategoryList
					categories={getCategory(products)}
					onSelectCategory={handleSelectCategory}
				/>

				<Text style={styles.title}>Sản phẩm</Text>
				<FlatList
					data={displayedFashion}
					numColumns={2}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					scrollEnabled={true}
				/>
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
	searchInput: {
		position: "absolute",
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		paddingLeft: 10,
		flex: 1,
		borderRadius: 10,
		top: 100,
		left: 120,
		width: 220,
		zIndex: 20,
	},
});
