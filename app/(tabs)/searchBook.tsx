import React, { useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TextInput, Button } from 'react-native';

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { LivroData } from '@/components/bucandoLivros'

import { createStackNavigator } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import areaBook from '@/app/(tabs)/areaBook';

function irParaAreaLivro (itemID: number) {

  const navigation = useNavigation();

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText>Home Screen</ThemedText>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('areaBook', itemID)}
      />
    </View>
  );
};

export default function SearchScreen(){
  const [livros, setLivros] = useState<LivroDataBse[]>([])
  const [busca, setBusca] = useState("")

  const Stack = createStackNavigator();

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

      <Stack.Navigator>
        <Stack.Screen name='areaBook' component={areaBook}></Stack.Screen>  
      </Stack.Navigator>

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