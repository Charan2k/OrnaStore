import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  priceCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center'
  },
  silverCard: {
    backgroundColor: '#E2E3E5',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center'
  },
  metalTitle: {
    fontSize: 24,
    color: '#856404',
    marginBottom: 8,
  },
  silverTitle: {
    fontSize: 24,
    color: '#383d41',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  updateText: {
    fontSize: 14,
    color: '#666',
  }
});

export default function Home() {
  // Simple current prices without historical data
  const currentGold = 500;
  const currentSilver = 50;
  const updatedAt = new Date().toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.priceCard}>
          <Text style={styles.metalTitle}>Gold Price</Text>
          <Text style={styles.priceText}>₹{currentGold}/gram</Text>
          <Text style={styles.updateText}>Updated: {updatedAt}</Text>
        </View>

        <View style={styles.silverCard}>
          <Text style={styles.silverTitle}>Silver Price</Text>
          <Text style={styles.priceText}>₹{currentSilver}/gram</Text>
          <Text style={styles.updateText}>Updated: {updatedAt}</Text>
        </View>
      </View>
    </View>
  );
}
