import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export const DashboardScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to your Dashboard!</Text>
    </View>
  );
};
