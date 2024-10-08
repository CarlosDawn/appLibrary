import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, TextInput, Alert, KeyboardAvoidingView  } from 'react-native';

import { useDatabase } from '@/database/useDataBase';

import { ThemedText } from '@/components/ThemedText';

import { useLocalSearchParams, Link } from 'expo-router';

import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import RNPickerSelect from "react-native-picker-select";

export default function BookScreen() {

  const {id, titulo, autor, estado, genero, lingua, paginas, image} = useLocalSearchParams<{
    id: string,
    titulo: string,
    autor: string,
    estado: string,
    genero: string,
    lingua: string,
    paginas: string, 
    image: string
  }>();


  const Stack = createStackNavigator();    

  function LivroScreen({ navigation }: { navigation: any }) {
    const irParaTelaUpdate = () => {
      navigation.navigate("AreaUptadeScrenn");
    };

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

        <Button title='ALTERAR' onPress={irParaTelaUpdate}/>
      </View>
    );
    
  }

  function AreaUptadeScrenn({ navigation }: { navigation: any }){
    const [tituloUp, setTitulo] = useState(titulo);
    const [autorUp, setAutor] = useState(autor);
    const [estadoUp, setEstado] = useState(estado);
    const [generoUp, setGenero] = useState(genero);
    const [paginaToUp, setPaginas] = useState(paginas);
    const [linguaUp, setLingua] = useState(lingua);

    const [imageUp, setImage] = useState(image);

    const paginasUp: number = parseInt(paginaToUp);//Convertendo o input de 'paginas' para 'number'
    const idUp: number = parseInt(id);

    const pickImage = async () => { // Esta Função é para 'pegar' imagem escolhida pelo usuario
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    //-------------------------------------------------
    //=> Esta área é composta por funções para as funcionalidades do aplicativo ('CRUD')
    const livroDatabase = useDatabase();

    async function atualizarLivro() {
      try {

        livroDatabase.update({idUp, imageUp, tituloUp, autorUp, estadoUp, generoUp, paginasUp, linguaUp})

        Alert.alert("Livro atualizado !!!")

        navigation.navigate("AreaLivro");
      } catch (error) {
        console.log(error)
      }

    }
    //------------------------------------------------
    return (
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.titleContainer}>
            <ThemedText type='title'>Welcome! Update Books Area</ThemedText>
            <ThemedText style={{color: 'black'}}>NOME</ThemedText>
            <KeyboardAvoidingView behavior="padding">
              <TextInput onChangeText={setTitulo} value={tituloUp}
                placeholder='Titulo'
                style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
              />
            </KeyboardAvoidingView>

            <ThemedText style={{color: 'black'}}>AUTOR</ThemedText>
            <TextInput onChangeText={setAutor} value={autorUp}
              style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
            />
            <ThemedText style={{color: 'black'}}>ESTADO</ThemedText>
            <RNPickerSelect
                onValueChange={setEstado} value={estadoUp}
                items={[
                    { label: "LIDO", value: "LIDO" },
                    { label: "NÃO", value: "NÃO" },
                    { label: "LENDO", value: "LENDO" },
                ]}
                style={pickerSelectStyles}
            />
            <ThemedText style={{color: 'black'}}>GENERO</ThemedText>
            <RNPickerSelect
                onValueChange={setGenero} value={generoUp}
                items={[
                    { label: "ROMANCE", value: "ROMANCE" },
                    { label: "TERROR", value: "TERROR" },
                    { label: "THRILLER", value: "THRILLER" },
                    { label: "AVENTURA", value: "AVENTURA" },
                    { label: "MISTERIO", value: "MISTERIO" },
                    { label: "FICÇÃO", value: "FICÇÃO" },
                    { label: "OUTROS", value: "OUTROS" }
                ]}
                style={pickerSelectStyles}
            />
            <ThemedText style={{color: 'black'}}>PAGINAS</ThemedText>
            <TextInput keyboardType="numeric" onChangeText={setPaginas} value={paginaToUp}
              placeholder='Pagínas'
              style={{height: 40, width: 100, borderWidth: 1, borderColor: "#999", borderRadius: 9, textAlign: 'center'}}
            />
            <ThemedText style={{color: 'black'}}>LINGUA</ThemedText>
            <TextInput onChangeText={setLingua} value={linguaUp}
              placeholder='Língua'
              style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
            />
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <Button title='SALVAR' onPress={atualizarLivro}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }                    

  return ( 
    <Stack.Navigator>
        <Stack.Screen name="AreaLivro" component={LivroScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AreaUptadeScrenn" component={AreaUptadeScrenn} />
    </Stack.Navigator>
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      maxWidth: 150,
      margin: 'auto',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
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