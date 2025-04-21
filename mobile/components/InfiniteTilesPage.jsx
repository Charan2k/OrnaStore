import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { fetchOrnaments } from '../api/ornamentsApi';
import { Buffer } from 'buffer';
import theme from '../theme/colors';
import FilterBar from './FilterBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsText: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 10,
  },
  noItemsSubtext: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.7,
  }
});

const NoItemsFound = ({ filters }) => {
  const getFilterDescription = () => {
    const parts = [];
    if (filters.gender) parts.push(filters.gender);
    if (filters.ornamentType) parts.push(filters.ornamentType);
    return parts.join(' ');
  };

  return (
    <View style={styles.noItemsContainer}>
      <Text style={styles.noItemsText}>No items found</Text>
      <Text style={styles.noItemsSubtext}>
        {getFilterDescription() ? 
          `No ${getFilterDescription()} items available at the moment.` :
          'No items available at the moment.'}
      </Text>
    </View>
  );
};

const ErrorView = ({ error, onRetry }) => {
  return (
    <View style={styles.noItemsContainer}>
      <Text style={styles.noItemsText}>Something went wrong</Text>
      <Text style={styles.noItemsSubtext}>
        {error.includes('500') 
          ? 'The server encountered an error. Please try again later.'
          : 'Unable to load items. Please check your connection and try again.'}
      </Text>
      <Pressable 
        onPress={onRetry}
        style={({ pressed }) => [
          {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            marginTop: 15,
            opacity: pressed ? 0.8 : 1
          }
        ]}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Try Again</Text>
      </Pressable>
    </View>
  );
};

export default function InfiniteTilesPage({ metalType }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    gender: '',
    ornamentType: ''
  });

  const fetchItems = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    
    setLoading(true);
    setError(null); // Clear any previous errors
    
    try {
      const response = await fetchOrnaments(
        reset ? 1 : page,
        10,
        filters.gender,
        '',
        filters.ornamentType,
        metalType
      );
      const rawItems = response.data.ornaments || [];

      // Convert image buffer to base64
      const newItems = rawItems.map((item) => {
        if (item.image?.data) {
          const base64 = Buffer.from(item.image.data).toString('base64');
          const mimeType = 'image/jpeg';
          return {
            ...item,
            imageBase64: `data:${mimeType};base64,${base64}`,
          };
        }
        return item;
      });

      if (newItems.length > 0) {
        setItems(prev => reset ? newItems : [...prev, ...newItems]);
        setPage(prev => reset ? 2 : prev + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
        if (reset) {
          setItems([]);
        }
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err.message || 'An unexpected error occurred');
      if (reset) {
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setItems([]);
    setHasMore(true);
    fetchItems(true);
  }, [filters]);

  const renderItem = ({ item }) => (
    <Pressable 
      style={styles.tile}
      onPress={() => {
        console.log("clicked");
        console.log(`${item.id}`);
        router.push(`/item/${item.id}`)
      }}
    >
      <Image source={{ uri: item.imageBase64 }} style={styles.image} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={{ color: theme.colors.text }}>{item.description}</Text>
    </Pressable>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <FilterBar 
          filters={filters} 
          setFilters={setFilters} 
          metalType={metalType}
        />
        <ErrorView 
          error={error} 
          onRetry={() => {
            setPage(1);
            setHasMore(true);
            fetchItems(true);
          }} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        metalType={metalType}
      />
      {items.length === 0 && !loading ? (
        <NoItemsFound filters={filters} />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={() => fetchItems()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <Text style={styles.loading}>Loading more items...</Text> : null
          }
        />
      )}
    </View>
  );
}
