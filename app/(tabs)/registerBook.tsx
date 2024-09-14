//import * as React from 'react';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

import { useDatabase } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

export default function RegisterScreen() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState("");
  const [genero, setGenero] = useState("");

  const livroDatabase = useDatabase();

  async function registrarLivro() {
    try {
      const response = await livroDatabase.criar({titulo, autor, estado, genero})

      Alert.alert("Livro Cadastrado !!! ------ ID: " + response.insertedRowId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title'>Welcome! Register Books Area</ThemedText>
      <HelloWave/>
      <TextInput onChangeText={setTitulo} value={titulo}
        placeholder='Titulo'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />
      <TextInput onChangeText={setAutor} value={autor}
        placeholder='Autor'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />
      <TextInput onChangeText={setEstado} value={estado}
        placeholder='Estado'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />
      <TextInput onChangeText={setGenero} value={genero}
        placeholder='Genero'
        style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}} 
      />

      <Button title='SALVAR' onPress={registrarLivro}/>
    </View>  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  }
});

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
});