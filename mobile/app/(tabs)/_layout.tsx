import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stack } from 'expo-router';
import IndexScreen from './index';
import GoldScreen from './gold';
import SilverScreen from './silver';

const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="index"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="index"
        component={IndexScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="gold"
        component={GoldScreen}
        options={{
          tabBarLabel: 'Gold',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="gold" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="silver"
        component={SilverScreen}
        options={{
          tabBarLabel: 'Silver',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name="silverware" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 