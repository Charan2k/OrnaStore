import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Share, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { fetchOrnaments } from '../../api/ornamentsApi';
import { Buffer } from 'buffer';
import theme from '../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ScreenCapture from 'expo-screen-capture';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scrollContent: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: 'white'
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
    lineHeight: 24,
    marginBottom: 20
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginRight: 10
  },
  price: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  }
});

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent screenshots when component mounts
    const preventScreenshots = async () => {
      try {
        // For iOS, we need to be more aggressive with the prevention
        if (Platform.OS === 'ios') {
          // First, check if we can prevent screenshots
          const isAvailable = await ScreenCapture.isAvailableAsync();
          if (isAvailable) {
            // Prevent screenshots
            await ScreenCapture.preventScreenCaptureAsync();
            
            // Add a listener for when the app goes to background
            const subscription = ScreenCapture.addScreenshotListener(() => {
              // This will be called when a screenshot is attempted
              console.log('Screenshot attempted');
            });
            
            // Return the subscription for cleanup
            return subscription;
          }
        } else {
          // For Android, the standard approach works well
          await ScreenCapture.preventScreenCaptureAsync();
        }
      } catch (error) {
        console.error('Error preventing screenshots:', error);
      }
    };
    
    const subscription = preventScreenshots();

    // Cleanup: allow screenshots when component unmounts
    return () => {
      if (Platform.OS === 'ios') {
        // For iOS, we need to remove the listener and allow screenshots
        if (subscription) {
          subscription.remove();
        }
      }
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetchOrnaments(1, 1, '', id, '', '');
        if (response.data.ornaments && response.data.ornaments.length > 0) {
          const rawItem = response.data.ornaments[0];
          
          if (rawItem.image?.data) {
            const base64 = Buffer.from(rawItem.image.data).toString('base64');
            const mimeType = 'image/jpeg';
            rawItem.imageBase64 = `data:${mimeType};base64,${base64}`;
          }
          
          setItem(rawItem);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleShare = async () => {
    try {
      // Create both web and deep link URLs
      const webUrl = `https://ornastore.com/items/${item.id}`;
      const deepLink = `ornastore://items/${item.id}`;
      
      // Create a message that includes both URLs
      const message = `Check out this beautiful ornament: ${item.name}\n\nView on web: ${webUrl}\n\nOpen in app: ${deepLink}`;
      
      const result = await Share.share({
        message,
        title: 'Share Ornament',
      });

      // If the share was successful and the user wants to open the link
      if (result.action === Share.sharedAction) {
        if (result.activityType === Share.activityType) {
          // Try to open the deep link first
          const canOpen = await Linking.canOpenURL(deepLink);
          if (canOpen) {
            await Linking.openURL(deepLink);
          } else {
            // Fallback to web URL if deep link can't be opened
            await Linking.openURL(webUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {item.imageBase64 && (
          <View>
            <Image source={{ uri: item.imageBase64 }} style={styles.image} />
            <Pressable style={styles.backButton} onPress={handleBack}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primary} />
            </Pressable>
            <Pressable style={styles.shareButton} onPress={handleShare}>
              <MaterialCommunityIcons name="share" size={24} color={theme.colors.primary} />
            </Pressable>
          </View>
        )}
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
    </View>
  );
}
