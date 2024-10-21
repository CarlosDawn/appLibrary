import React, { useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TextInput, Text } from 'react-native';

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import {styleScreen} from '@/assets/styles/serach_styles';
import Group from '@/assets/styles/Group95/Group';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { LivroData } from '@/components/bucandoLivros'

import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SearchScreen(this: any){
  const [livros, setLivros] = useState<LivroDataBse[]>([])
  const [busca, setBusca] = useState("")

//-------------------------------------------------
  //=> Esta área é composta por funções para as funcionalidades do aplicativo ('CRUD')
  const livroDatabase = useDatabase();

  async function listaLivros() {
    try {
      const response = await livroDatabase.buscaNomeLivro(busca)
      setLivros(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listaLivros()
  }, [busca])
//-------------------------------------------------

  return (
    /*<View style={styles.titleContainer}>
      <ThemedText style={styles.textoStyle} type='title'>Welcome! Serach Books Area</ThemedText>
      <HelloWave />

      <TextInput style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} onChangeText={setBusca}/>
    
      <FlatList
        data={livros}
        renderItem={({item}) => < LivroData data={item}/>}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
    
    <Group95 className={styles.group95} />
    <BookOpen_Size48
          className={styles.bookOpen}
          swap={{
          icon: <BookOpenIcon className={styles.icon} />,
          }}
      />
    */
    <View style={styleScreen.root}>
      <View>
        <Text style={styleScreen.hasilScan}>BUSCAR LIVROS</Text>
        <TextInput style={styleScreen.group95} onChangeText={setBusca}/>
      </View>
      <FlatList
        data={livros}
        renderItem={({item}) => < LivroData data={item} />}
        keyExtractor={(item) => String(item.id)}
        style={{width: 397, marginTop: 165}}
      />
      <View style={styleScreen.retanguloToFlatList}></View>
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