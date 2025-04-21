import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native';
import { fetchOrnaments } from '../api/ornamentsApi';
import { Buffer } from 'buffer';
import theme from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10
  },
  tile: {
    width: '48%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginTop: 5,
    color: theme.colors.text
  },
  loading: {
    padding: 10,
    textAlign: 'center'
  }
});

export default function InfiniteTilesPage({ metalType }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetchOrnaments(page, 10, '', '', '', metalType);
      const rawItems = response.data.ornaments || [];

    // Convert image buffer to base64
      const newItems = rawItems.map((item) => {
        if (item.image?.data) {
          const base64 = Buffer.from(item.image.data).toString('base64');
          const mimeType = 'image/jpeg'; // or determine dynamically
          return {
            ...item,
            imageBase64: `data:${mimeType};base64,${base64}`,
          };
        }
      return item;
      });

      console.log(response);
      
      if (newItems.length > 0) {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.tile}>
      <Image source={{ uri: item.imageBase64 }} style={styles.image} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={{ color: theme.colors.text }}>{item.description}</Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={fetchItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <Text style={styles.loading}>Loading more items...</Text> : null
        }
      />
    </View>
  );
}
