/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
// import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../services/ResponsiveUIHelpers';
import Chat from '../screens/chat/Chat';
import Home from '../screens/home/Home';
import Settings from '../screens/Settings/Settings';
import Colleges from '../screens/Colleges/Colleges';
import Applied from '../screens/Applied/Applied';
import resources from '../resources';
const Tab = createBottomTabNavigator<any>();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Optionally hide the header
        tabBarStyle: {
          backgroundColor: resources.colors.white, // Custom background color for the tab bar
          borderTopColor: 'transparent', //  border transparent
          height: hp('8%'),
        },
        tabBarLabelStyle: {
          fontSize: hp('1.6%'),
          fontFamily: resources.fonts.Amedium,
          fontWeight: '500',
          letterSpacing: 1,
        },
        tabBarActiveTintColor: resources.colors.primary, // Active tab icon color
        tabBarInactiveTintColor: resources.colors.ash, // Inactive tab icon color
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Colleges"
        component={Colleges}
        options={{
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="graduation" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AI Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color, size}) => (
            <Fontisto name="hipchat" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Applied"
        component={Applied}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="checkbox-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
