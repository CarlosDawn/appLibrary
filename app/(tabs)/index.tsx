//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert, FlatList, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [livros, setLivros] = useState<LivroDataBse[]>([]);
  const [busca, setBusca] = useState("");

  const livroDatabase = useDatabase();

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} headerImage={<Ionicons size={310} name="home" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title' style={styles.textoStyle}>Welcome! Home Area</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  },
  textoStyle: {
    color: 'white',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  }
});