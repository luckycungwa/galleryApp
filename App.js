import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet, Platform } from 'react-native';



import CamScreen from './components/CamScreen';
import GalleryScreen from './components/GalleryScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>DEFAULT SCREEN!</Text>
      <StatusBar style="auto" />
      <View>
        {/* <CamScreen/> */}
        <GalleryScreen/>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
