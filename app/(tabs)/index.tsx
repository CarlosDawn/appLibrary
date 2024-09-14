//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert, FlatList, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const [livros, setLivros] = useState<LivroDataBse[]>([]);
  const [busca, setBusca] = useState("");

  const livroDatabase = useDatabase();

  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title' style={styles.textoStyle}>Welcome! Home Area</ThemedText>
      <HelloWave />
    </View> 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  },
  textoStyle: {
    color: 'black',
  }
});