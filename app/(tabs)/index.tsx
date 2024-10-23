//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text } from 'react-native';

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
    <View style={{backgroundColor: '#F3FFE0',
      height: 800}}>
      <View style={{height: 100, margin: 'auto'}}>
        <Text style={{ fontFamily: 'Times New Roman', fontSize: 50, height: 53, color: 'black', transform: [{translateY: 50}] }}>HOME</Text>
      </View>
      <View style={styles.titleContainer}>
        <FlatList
          data={livrosLendo}
          renderItem={({item}) => < LivroDataHome data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{width: 400, height: 160, top: -120, borderStyle: 'solid', borderColor: '#90A67F', borderWidth: 5.5, borderRadius: 20, marginBottom: 12}}
        />

        <FlatList
          data={livrosLido}
          renderItem={({item}) => < LivroDataHome data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{width: 400, height: 160, top: -120, borderStyle: 'solid', borderColor: '#90A67F', borderWidth: 5.5, borderRadius: 20, marginBottom: 12}}
        />

        <FlatList
          data={livrosNaoLido}
          renderItem={({item}) => < LivroDataHome data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{width: 400, height: 160, top: -120, borderStyle: 'solid', borderColor: '#90A67F', borderWidth: 5.5, borderRadius: 20}}
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