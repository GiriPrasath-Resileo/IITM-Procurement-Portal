import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './navigation/AuthStack';
import { View, StyleSheet } from 'react-native';
import { createUseResponsive } from '../../../../shared/src/hooks/useResponsive.js';

export default function App() {
  // Create the hook using this app's React instance
  const useResponsive = createUseResponsive(useState, useEffect);
  const { isTV } = useResponsive();
  
  return (
    <SafeAreaProvider>
      <View style={[styles.container, isTV && styles.containerTV]}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  containerTV: {
    padding: 48
  }
});