import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './index';
import GoldScreen from './gold';
import SilverScreen from './silver';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme/colors';

const Tab = createMaterialBottomTabNavigator();

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
      
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Gold"
          component={GoldScreen}
          options={{
            tabBarLabel: 'Gold',
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="gold" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Silver"
          component={SilverScreen}
          options={{
            tabBarLabel: 'Silver',
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name="silverware" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
