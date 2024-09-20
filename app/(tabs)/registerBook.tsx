//import * as React from 'react';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

import { useDatabase } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState("");
  const [genero, setGenero] = useState("");
  const [paginas, setPaginas] = useState("");
  const [lingua, setLingua] = useState("");

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const livroDatabase = useDatabase();

  async function registrarLivro() {
    try {
      const response = await livroDatabase.criar({image, titulo, autor, estado, genero, paginas, lingua})

      Alert.alert("Livro Cadastrado !!! ------ ID: " + response.insertedRowId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title'>Welcome! Register Books Area</ThemedText>
      <HelloWave/>
      <ThemedText style={{color: 'black'}}>NOME</ThemedText>
      <TextInput onChangeText={setTitulo} value={titulo}
        placeholder='Titulo'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />

      <ThemedText style={{color: 'black'}}>AUTOR</ThemedText>
      <TextInput onChangeText={setAutor} value={autor}
        placeholder='Autor'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />
      
      <ThemedText style={{color: 'black'}}>ESTADO</ThemedText>
      <TextInput onChangeText={setEstado} value={estado}
        placeholder='Estado'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />

      <ThemedText style={{color: 'black'}}>GENERO</ThemedText>
      <TextInput onChangeText={setGenero} value={genero}
        placeholder='Genero'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />

      <ThemedText style={{color: 'black'}}>PAGINAS</ThemedText>
      <TextInput onChangeText={setPaginas} value={genero}
        placeholder='Pagínas'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />

      <ThemedText style={{color: 'black'}}>LINGUA</ThemedText>
      <TextInput onChangeText={setLingua} value={genero}
        placeholder='Língua'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />

      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <Button title='SALVAR' onPress={registrarLivro}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

/*
<Image
        style={styles.image}
        source={{uri: image}}
        contentFit="cover"
        transition={1000}
      />




const styles2 = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'blue',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 25,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    margin: 'auto',
    alignItems: 'center',
    backgroundColor: 'white',
    top: 8,
    zIndex: 999,
    paddingHorizontal: 25,
    fontSize: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});*/