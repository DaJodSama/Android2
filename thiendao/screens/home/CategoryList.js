

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryList = ({ categories, onSelectCategory }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectCategory(item)}>
      <View style={styles.categoryItem}>
        <Text style={styles.categoryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Mục</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center"
  },
  categoryItem: {
    padding: 10,
    margin: 20,
    backgroundColor: "#AD40AF",
    borderRadius: 5,
  },
  categoryText: {
    color: 'white',
    fontSize:16
  },title:{
    margin:10,
    fontSize:20,
  }
});

export default CategoryList;