import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	RefreshControl,
} from "react-native";

const GioHang = ({ route, selected, navigation }) => {
	const { cartItems, setCartItems } = route.params;
	const [quantity, setQuantity] = useState(1);

	const handleRemoveItem = (itemId) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== itemId)
		);
		alert("Remove item");
		navigation.navigate("GioHang", { cartItems, setCartItems });
	};
	const handleQuantityIncrement = (itemId) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId
					? { ...item, quantity: item.quantity + 1 }
					: item
			)
		);
	};

	const handleQuantityDecrement = (itemId) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId && item.quantity > 0
					? { ...item, quantity: item.quantity - 1 }
					: item
			)
		);
	};

	const handlePressThanhToan = () => {
		if (cartItems.length === 0) {
			alert("Chưa có sản phẩm nào trong giỏ!");
		} else {
			navigation.navigate("ThanhToan", { cartItems, setCartItems });
		}
	};

	return (
		<>
			<View style={styles.x}>
				<Text style={styles.title}>Cart</Text>
				<FlatList
					data={cartItems}
					renderItem={({ item }) => (
						<View style={styles.container}>
							<View style={styles.wrapperImageCheck}>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.iconPlus}>V</Text>
								</TouchableOpacity>
								<Image
									source={{ uri: item.image }}
									style={styles.productImage}
								/>
							</View>
							<View
								style={{
									justifyContent: "space-between",
									marginBottom: 10,
								}}>
								<View>
									<Text style={{ fontWeight: "600" }}>
										{item.name}
									</Text>
									<Text>{item.price}</Text>
								</View>
								<View style={styles.wrapperCardBottom}>
									<TouchableOpacity
										onPress={() =>
											handleQuantityDecrement(item.id)
										}
										style={styles.button}>
										<Text style={{ fontWeight: "600" }}>
											-
										</Text>
									</TouchableOpacity>
									<Text style={{ paddingHorizontal: 12 }}>
										{item.quantity}
									</Text>
									<TouchableOpacity
										onPress={() =>
											handleQuantityIncrement(item.id)
										}
										style={[
											styles.button,
											{ borderColor: "green" },
										]}>
										<Text style={styles.iconPlus}>+</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() =>
											handleRemoveItem(item.id)
										}
										style={styles.removeButton}>
										<Text style={styles.removeButtonText}>
											-
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
			<View style={styles.footer}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.iconPlus}>V</Text>
					</TouchableOpacity>
					<Text style={[styles.textFooter, { marginRight: 10 }]}>
						Total Price
					</Text>
					<Text style={styles.textFooter}>$ 0</Text>
				</View>
				<TouchableOpacity
					style={[
						styles.buttonCheckout,
						{ backgroundColor: "orange" },
					]}>
					<Text style={{ color: "black" }}>Checkout</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	x: {
		flex: 1,
		backgroundColor: "white",
	},
	container: {
		flexDirection: "row",
		marginBottom: 20,
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	title: { fontSize: 18, marginBottom: 20 },
	productImage: {
		width: 80,
		height: 80,
		marginHorizontal: 10,
	},
	wrapperImageCheck: {
		flexDirection: "row",
		alignItems: "center",
	},
	button: {
		borderWidth: 0.5,
		borderRadius: 4,
		width: 25,
		height: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	iconPlus: {
		color: "green",
		fontWeight: "600",
	},
	wrapperCardBottom: {
		flexDirection: "row",
		alignItems: "center",
	},
	footer: {
		borderTopWidth: 0.5,
		paddingLeft: 15,
		borderColor: "grey",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textFooter: {
		fontSize: 16,
		fontWeight: "600",
	},
	buttonCheckout: {
		backgroundColor: "#AD40AF",
		paddingHorizontal: 30,
		paddingVertical: 15,
	},
	removeButton: {
		marginTop: 0,
		backgroundColor: "#AD40AF",
		padding: 10,
		borderRadius: "50%",
		left: 120,
	},
	removeButtonText: {
		textAlign: "center",
		color: "white",
	},
});

export default GioHang;
