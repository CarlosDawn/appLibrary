import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { useLocalSearchParams, Link } from 'expo-router';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UpdateScreen from './AreaUpdate';

import { Image } from 'expo-image';


export default function BookScreen() {

  function LivroScreen({ navigation }: { navigation: any }) {
    return (
      <View>
        <Text style={styles.titleContainer} >LIVRO</Text>
        <Link href={"/(tabs)/searchBook"}>Voltar Para Pesquisa</Link>

        <Image
          style={styles.image}
          source={{uri: image}}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.titleContainer}>TITULO: {titulo}</Text>
        <Text style={styles.titleContainer}>AUTOR: {autor}</Text>
        <Text style={styles.titleContainer}>ESTADO: {estado == "NÃO" ? 'Não Lido Ainda!' : `${estado}`}</Text>
        <Text style={styles.titleContainer}>GENERO: {genero}</Text>
        <Text style={styles.titleContainer}>PAGINAS: {paginas}</Text>
        <Text style={styles.titleContainer}>LINGUA: {lingua}</Text>

        <Button
          title="ALTERAR"
          onPress={() => navigation.navigate("AreaUptadeScrenn")}
        />
      </View>
    );
    
  }

  /*function AreaUptadeScrenn(){
    return(
      <View>
          <ThemedText style={{color: 'black'}}>
              <ThemedText type='title' style={{color: 'black'}}>Welcome! Area de Alteração</ThemedText>
          </ThemedText>
      </View>
    );
  }*/

  const {titulo, autor, estado, genero, lingua, paginas, image} = useLocalSearchParams<{id: string, 
                                                                                  titulo: string,
                                                                                  autor: string,
                                                                                  estado: string,
                                                                                  genero: string,
                                                                                  lingua: string,
                                                                                  paginas: string, 
                                                                                  image: string
  }>();

  const Stack = createStackNavigator();                         

  return ( 
    <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name="AreaLivro" component={LivroScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AreaUptadeScrenn" component={UpdateScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
    color: 'black'
  },
  
  image: {
    width: 140,
    height: 200,
  },
});

/*<View style={styles.titleContainer}>
      <Text style={styles.titleContainer} >LIVRO</Text>
      <Link href={"/(tabs)/searchBook"}>Voltar Para Pesquisa</Link>

      <Image
        style={styles.image}
        source={{uri: image}}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.titleContainer}>TITULO: {titulo}</Text>
      <Text style={styles.titleContainer}>AUTOR: {autor}</Text>
      <Text style={styles.titleContainer}>ESTADO: {estado}</Text>
      <Text style={styles.titleContainer}>GENERO: {genero}</Text>
      <Text style={styles.titleContainer}>PAGINAS: {paginas}</Text>
      <Text style={styles.titleContainer}>LINGUA: {lingua}</Text>

      <Button title='ALTERAR'/>

      <Stack.Navigator>
        <Stack.Screen name="AreaUpate" component={HomeScreen}/>
      </Stack.Navigator>


    </View>  */