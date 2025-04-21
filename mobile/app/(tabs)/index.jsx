import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchMetalPrices } from "../../api/metalApi.js";

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

  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const getMetalPrices = async () => {
          try {
              const data = await fetchMetalPrices();
              setPrices(data);
          } catch (error) {
            setPrices({
              gold_price: "5567.5",
              silver_price: "342.1",
              updated_at: "12/21/2024"
            });
              setError("Error fetching metal prices.");
          } finally {
              setLoading(false);
          }
      };

      getMetalPrices();
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.priceCard}>
          <Text style={styles.metalTitle}>Gold Price</Text>
          <Text style={styles.priceText}>₹{prices.gold_price}/gram</Text>
          <Text style={styles.updateText}>Updated at: {new Date(prices.updated_at).toLocaleString()}</Text>
        </View>

        <View style={styles.silverCard}>
          <Text style={styles.silverTitle}>Silver Price</Text>
          <Text style={styles.priceText}>₹{prices.silver_price}/gram</Text>
          <Text style={styles.updateText}>Updated at: {new Date(prices.updated_at).toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
}
