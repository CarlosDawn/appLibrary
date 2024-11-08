import React, { useEffect, useState} from 'react';
import { View, FlatList, TextInput, Text, Alert } from 'react-native';

import { useDatabase, emprestBuscados } from '@/database/useDataBase';

import { styleEmpres } from '@/assets/styles/lista_emprestimos_styles';

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
      const response = await livroDatabase.buscaTodosEmprestados(busca)
      setEmprestimos(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listaLivros()
  }, [busca])
//-------------------------------------------------
  async function removerLivro(id: number) {
      //const idDelete = parseInt(id)
      try {
      await livroDatabase.removeEmprestimo(id);

      Alert.alert("Emprestimo APAGADO !!!");

      } catch (error) {
      console.log(error)
      }
  }

  return (
    <View style={styleEmpres.root}>
      <View>
        <Text style={styleEmpres.hasilScan}>EMPRESTIMOS E PRAZOS</Text>
        <TextInput style={styleEmpres.group95} onChangeText={setBusca}/>
        <MaterialIcons name='search' size={24} style={{transform: [{translateY: 80}, {translateX: 330}], zIndex: -1}}/>

      </View>
      <FlatList
        data={Emprestados}
        renderItem={({item}) => < LivroEmprestado data={item} onDelete={() => removerLivro(item.id)}/>}
        keyExtractor={(item) => String(item.id)}
        style={{width: 397, marginTop: 165, margin: 'auto', borderStyle: 'solid', borderColor: '#90A67F', borderWidth: 1.5, borderRadius: 20}}
      />
      <View style={styleEmpres.retanguloToFlatList}></View>
    </View>
  );
}
