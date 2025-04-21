import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { fetchOrnamentById } from '../api/ornamentsApi';
import { Buffer } from 'buffer';
import theme from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24
  }
});

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetchOrnamentById(id);
        const rawItem = response.data;
        
        if (rawItem.image?.data) {
          const base64 = Buffer.from(rawItem.image.data).toString('base64');
          const mimeType = 'image/jpeg';
          rawItem.imageBase64 = `data:${mimeType};base64,${base64}`;
        }
        
        setItem(rawItem);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    const shareUrl = `ornastore://items/${item.id}`;
    try {
      await Sharing.shareAsync(shareUrl, {
        dialogTitle: 'Share this item',
        mimeType: 'text/plain'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      {item.imageBase64 && (
        <Image source={{ uri: item.imageBase64 }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}
