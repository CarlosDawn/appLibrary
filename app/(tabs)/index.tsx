//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { LivroData } from '@/components/bucandoLivros'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [livrosLido, setLivros] = useState<LivroDataBse[]>([]);
  const [livrosNaoLido, setLivrosNaoLido] = useState<LivroDataBse[]>([]);
  const [livrosLendo, setLivrosLendo] = useState<LivroDataBse[]>([]);

  const livroDatabase = useDatabase();

//-------------------------------------------------------------------------------------------
  async function listaLivrosLidos() {
    try {
      const response = await livroDatabase.buscaLivrosLidos("LIDO")
      setLivros(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listaLivrosLidos()
  }, ["LIDO"])
//-------------------------------------------------------------------------------------------
  async function listaLivrosNaoLidos() {
    try {
      const response = await livroDatabase.buscaLivrosLidos("NÃO LIDO")
      setLivrosNaoLido(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listaLivrosNaoLidos()
  }, ["NÃO LIDO"])
//-------------------------------------------------------------------------------------------

  async function listaLivrosLendo() {
    try {
      const response = await livroDatabase.buscaLivrosLidos("LENDO")
      setLivrosLendo(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listaLivrosLendo()
  }, ["LENDO"])
//-------------------------------------------------------------------------------------------

  return (
    <View style={styles.titleContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title' style={styles.textoStyle}>Welcome! Home Area</ThemedText>
        <HelloWave />
      </ThemedView>

      <FlatList
        data={livrosLido}
        renderItem={({item}) => < LivroData data={item}/>}
        keyExtractor={(item) => String(item.id)}
      />
      <FlatList
        data={livrosNaoLido}
        renderItem={({item}) => < LivroData data={item}/>}
        keyExtractor={(item) => String(item.id)}
      />
      <FlatList
        data={livrosLendo}
        renderItem={({item}) => < LivroData data={item}/>}
        keyExtractor={(item) => String(item.id)}
      />

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
    color: 'white',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  }
});