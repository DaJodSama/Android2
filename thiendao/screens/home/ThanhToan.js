import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import Modal from 'react-native-modal';

const ThanhToan = ({ route, navigation }) => {
  const { cartItems, setCartItems } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    // Xử lý khi người dùng xác nhận thanh toán
    // Đây có thể là nơi gọi API thanh toán, lưu dữ liệu, vv.
    // Sau khi xử lý xong, bạn có thể chuyển người dùng đến màn hình kết quả hoặc màn hình khác.

    // Làm trống giỏ hàng
    setCartItems([]);

    // Mở modal thông báo
    toggleModal();
    navigation.navigate('ThongBao', { cartItems });
  };

  const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông Tin Thanh Toán</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text>Số lượng: {item.quantity}</Text>
            <Text>Giá: {item.price}$</Text>
            <Text>Size: {item.size}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Number: {calculateTotalQuantity(cartItems)}</Text>
        <Text style={styles.summaryText}>Price: {calculateTotalPrice(cartItems)}$</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Thanh Toán</Text>
      </TouchableOpacity>

      {/* Modal thông báo */}
      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Thanh Toán Thành Công!</Text>
          <Button title="OK" onPress={() => navigation.navigate('TrangChu')} />
        </View>
      </Modal>
    </View>
  );
};

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:"white",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    display:"flex",
    borderWidth: "none",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryContainer: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
  },
  summaryText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#AD40AF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft:90,
    width:240,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"white",
  },
  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemImage: {
    width: '50%', // Hiển thị hình ảnh với chiều rộng tối đa
    height: 200, // Điều chỉnh kích thước theo nhu cầu của bạn
    borderRadius: 8,
    marginBottom: 5,
  },
});

export default ThanhToan;