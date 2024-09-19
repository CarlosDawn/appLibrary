import React, { useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TextInput, Button } from 'react-native';

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { LivroData } from '@/components/bucandoLivros'

import { useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import areaBook from './areaBook';

type User = {
  id: number;
};

function irParaAreaLivro ({ route }: { route: any }, itemID: number) {

  //const navigation = useNavigation();

  //navigation.navigate(areaBook);

  console.log(itemID)

};

export default function SearchScreen({ navigation }: { navigation: any }){
  const [livros, setLivros] = useState<LivroDataBse[]>([])
  const [busca, setBusca] = useState("")

  const Stack = createNativeStackNavigator();

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
        renderItem={({item}) => < LivroData data={item} onPress={() => navigation.navigate('areaBook', { user: {id: item.id}})}/>}
        keyExtractor={(item) => String(item.id)}
      />

      <Stack.Screen name="areaBook" component={areaBook} options={{title: 'Welcome'}}/>
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
  },
  styleAreaBook: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  }
});