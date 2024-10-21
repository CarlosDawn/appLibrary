//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { LivroData } from '@/components/bucandoLivros'
import { LivroDataHome } from '@/components/bucandoLivros'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [livrosLido, setLivros] = useState<LivroDataBse[]>([]);
  const [livrosNaoLido, setLivrosNaoLido] = useState<LivroDataBse[]>([]);
  const [livrosLendo, setLivrosLendo] = useState<LivroDataBse[]>([]);

  const livroDatabase = useDatabase();

//-------------------------------------------------------------------------------------------
  async function listaLivrosLidos() {
    try {
      const response = await livroDatabase.buscaLivrosPorEstatos("LIDO")
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
      const response = await livroDatabase.buscaLivrosPorEstatos("NÃO")
      setLivrosNaoLido(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listaLivrosNaoLidos()
  }, ["NÃO"])
//-------------------------------------------------------------------------------------------

  async function listaLivrosLendo() {
    try {
      const response = await livroDatabase.buscaLivrosPorEstatos("LENDO")
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
    <View>
      <ThemedView style={styles.titleContainer}>
          <ThemedText type='title' style={styles.textoStyle}>Welcome! Home Area</ThemedText>
          <HelloWave />
        </ThemedView>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.textoStyle}>Lendo</ThemedText>
        <FlatList
          data={livrosLendo}
          renderItem={({item}) => < LivroDataHome data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{width: 400, height: 200, borderStyle: 'solid', borderColor: 'purple', borderWidth: 8.5, borderRadius: 20}}
        />
        <ThemedText style={styles.textoStyle}>Lidos</ThemedText>
        <FlatList
          data={livrosLido}
          renderItem={({item}) => < LivroDataHome data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{width: 400, height: 200, borderStyle: 'solid', borderColor: 'purple', borderWidth: 8.5, borderRadius: 20}}
        />
        <ThemedText style={styles.textoStyle}>Não Lidos</ThemedText>
        <FlatList
          data={livrosNaoLido}
          renderItem={({item}) => < LivroDataHome data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{width: 400, height: 200, borderStyle: 'solid', borderColor: 'purple', borderWidth: 8.5, borderRadius: 20}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    transform: [{translateY: 50}]
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