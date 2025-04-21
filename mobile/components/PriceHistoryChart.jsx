import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import theme from '../theme/colors';

const PriceHistoryChart = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noData}>No historical data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        data: data.map(item => parseFloat(item.price)),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(81, 45, 168, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: theme.colors.primary,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.text,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noData: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginVertical: 20,
  },
});

export default PriceHistoryChart; 