import React, { useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TextInput, Text } from 'react-native';

import { useDatabase, emprestBuscados } from '@/database/useDataBase';

import { styleEmpres } from '@/assets/styles/lista_emprestimos_styles';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { LivroEmprestado } from '@/components/bucandoLivros'

import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchScreen(){
  const [Emprestados, setEmprestimos] = useState<emprestBuscados[]>([])
  const [busca, setBusca] = useState("")

//-------------------------------------------------
  //=> Esta área é composta por funções para as funcionalidades do aplicativo ('CRUD')
  const livroDatabase = useDatabase();

  async function listaLivros() {
    try {
      const response = await livroDatabase.buscaTodosEmprestados()
      setEmprestimos(response)
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
        data={Emprestados}
        renderItem={({item}) => < LivroEmprestado data={item}/>}
        keyExtractor={(item) => String(item.id)}
      />
    </View>*/
    <View style={styleEmpres.root}>
      <View>
        <Text style={styleEmpres.hasilScan}>EMPRESTIMOS E PRAZOS</Text>
        <TextInput style={styleEmpres.group95} onChangeText={setBusca}/>
        <MaterialIcons name='search' size={24} style={{transform: [{translateY: 80}, {translateX: 330}], zIndex: -1}}/>

      </View>
      <FlatList
        data={Emprestados}
        renderItem={({item}) => < LivroEmprestado data={item} />}
        keyExtractor={(item) => String(item.id)}
        style={{width: 397, marginTop: 165}}
      />
      <View style={styleEmpres.retanguloToFlatList}></View>
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