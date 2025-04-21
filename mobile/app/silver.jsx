import React from 'react';
import { View, StyleSheet } from 'react-native';
import InfiniteTilesPage from '../components/InfiniteTilesPage';
import theme from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
});

export default function SilverScreen() {
  return (
    <View style={styles.container}>
      <InfiniteTilesPage metalType="silver" />
    </View>
  );
}
