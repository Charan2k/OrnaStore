import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fetchMetalPrices, fetchHistoricalMetalPrices } from "../../api/metalApi.js";
import { axiosInstance, API } from "../../api/apiConfigs";
import PriceHistoryChart from "../../components/PriceHistoryChart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
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
  const [prices, setPrices] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
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
          updated_at: new Date().toISOString()
        });
        setError("Error fetching metal prices.");
      } finally {
        setLoading(false);
      }
    };

    const getHistoricalPrices = async () => {
      try {
        const data = await fetchHistoricalMetalPrices();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    // Fetch both current and historical prices
    getMetalPrices();
    getHistoricalPrices();
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.priceCard}>
          <Text style={styles.metalTitle}>Gold Price</Text>
          <Text style={styles.priceText}>₹{prices.gold_price}/gram</Text>
          <Text style={styles.updateText}>Updated at: {new Date(prices.updated_at).toLocaleString()}</Text>
        </View>

        {historicalData && (
          <PriceHistoryChart 
            data={historicalData.map(item => ({
              date: item.date,
              price: item.gold_price
            }))}
            title="Gold Price History"
          />
        )}

        <View style={styles.silverCard}>
          <Text style={styles.silverTitle}>Silver Price</Text>
          <Text style={styles.priceText}>₹{prices.silver_price}/gram</Text>
          <Text style={styles.updateText}>Updated at: {new Date(prices.updated_at).toLocaleString()}</Text>
        </View>

        {historicalData && (
          <PriceHistoryChart 
            data={historicalData.map(item => ({
              date: item.date,
              price: item.silver_price
            }))}
            title="Silver Price History"
          />
        )}
      </View>
    </ScrollView>
  );
}
