import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme/colors';
import { Stack } from 'expo-router';

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  }
});

export default function Layout() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Ornastore</Text>
      </View>
      
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="item/[id]"
          options={{
            headerShown: true,
            headerTitle: "Item Details",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
