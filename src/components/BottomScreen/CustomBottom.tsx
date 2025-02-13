import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>Settings Screen</Text>
  </View>
);

const CustomBottom = () => {
  const [activeTab, setActiveTab] = useState('Home'); // To track the active tab
  const navigation = useNavigation<any>();
  const renderScreen = () => {
    if (activeTab === 'Home') {
      navigation.navigate('Home');
    }
    if (activeTab === 'Settings') {
      return <SettingsScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the active screen */}

      {/* Custom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Home' && styles.activeTab]}
          onPress={() => setActiveTab('Home')}>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Settings' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Settings')}>
          <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 20,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#222',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#ff6347', // Highlight color for the active tab
    borderRadius: 20,
  },
  tabLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomBottom;
