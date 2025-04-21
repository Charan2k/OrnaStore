import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NoItemsFound = ({ message = 'No items found for this category' }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/no-items.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Items Found</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});

export default NoItemsFound; 