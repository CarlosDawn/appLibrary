import React, { useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { LivroData } from '@/components/bucandoLivros'

import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import areaBook from '@/app/(tabs)/areaBook';


export default function SearchScreen() {
  const [livros, setLivros] = useState<LivroDataBse[]>([])
  const [busca, setBusca] = useState("")

  //const navigation = NavigationContainer ();
  const Stack = createStackNavigator();
  /*const irParaAreaLivro = (itemId: number ) => {
    navigation.navigate('areaBook', {itemId});
  };*/

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

  return (
    
    <View style={styles.titleContainer}>

      <ThemedText style={styles.textoStyle} type='title'>Welcome! Serach Books Area</ThemedText>
      <HelloWave />

      <TextInput style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} placeholder='Buscar' onChangeText={setBusca}/>

      <FlatList
        data={livros}
        renderItem={({item}) => < LivroData data={item} onPress={() => irParaAreaLivro(item.id)}/>}
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