import React, { useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';

import { useDatabase, livrosEmprestados } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { LivroEmprestado } from '@/components/bucandoLivros'

import 'react-native-gesture-handler';

export default function SearchScreen(){
  const [livros, setLivros] = useState<livrosEmprestados[]>([])
  const [busca, setBusca] = useState("")

//-------------------------------------------------
  //=> Esta área é composta por funções para as funcionalidades do aplicativo ('CRUD')
  const livroDatabase = useDatabase();

  async function listaLivros() {
    try {
      const response = await livroDatabase.buscaTodosEmprestados()
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
    
    <View style={styles.titleContainer}>
      <ThemedText style={styles.textoStyle} type='title'>Welcome! Serach Books Area</ThemedText>
      <HelloWave />

      <TextInput style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} onChangeText={setBusca}/>
    
      <FlatList
        data={livros}
        renderItem={({item}) => < LivroEmprestado data={item}/>}
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
    color: 'black',
  }
});