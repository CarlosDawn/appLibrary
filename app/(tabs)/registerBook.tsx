//import * as React from 'react';
import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, TextInput, Button, Alert } from 'react-native';

import { useDatabase } from '@/database/useDataBase';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import * as ImagePicker from 'expo-image-picker';

import RNPickerSelect from "react-native-picker-select";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


export default function RegisterScreen() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState("");
  const [genero, setGenero] = useState("");
  const [pagina, setPaginas] = useState("");
  const [lingua, setLingua] = useState("");

  const [image, setImage] = useState("");

  const paginas: number = parseInt(pagina);//Convertendo o input de 'paginas' para 'number'

  const pickImage = async () => { // Esta Função é para 'pegar' imagem escolhida pelo usuario
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result, paginas);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
//-------------------------------------------------
  //=> Esta área é composta por funções para as funcionalidades do aplicativo ('CRUD')
  const livroDatabase = useDatabase();

  async function registrarLivro() {
    try {
      const response = await livroDatabase.criar({image, titulo, autor, estado, genero, paginas, lingua})

      Alert.alert("Livro Cadastrado !!! ------ ID: " + response.insertedRowId)
    } catch (error) {
      console.log(error)
    }
   console.log(paginas, image)
  }
//------------------------------------------------

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titleContainer}>
          <ThemedText type='title'>Welcome! Register Books Area</ThemedText>
          <HelloWave/>
          <ThemedText style={{color: 'black'}}>NOME</ThemedText>
          <TextInput onChangeText={setTitulo} value={titulo}
            placeholder='Titulo'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
          />
          <ThemedText style={{color: 'black'}}>AUTOR</ThemedText>
          <TextInput onChangeText={setAutor} value={autor}
            placeholder='Autor'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
          />
          <ThemedText style={{color: 'black'}}>ESTADO</ThemedText>
          <RNPickerSelect
              onValueChange={setEstado} value={estado}
              items={[
                  { label: "LIDO", value: "LIDO" },
                  { label: "NÂO LIDO", value: "NÂO LIDO" },
                  { label: "LENDO", value: "LENDO" },
              ]}
              style={pickerSelectStyles}
          />

          <ThemedText style={{color: 'black'}}>GENERO</ThemedText>
          <RNPickerSelect
              onValueChange={setGenero} value={genero}
              items={[
                  { label: "ROMANCE", value: "ROMANCE" },
                  { label: "TERROR", value: "TERROR" },
                  { label: "THRILLER", value: "THRILLER" },
                  { label: "AVENTURA", value: "AVENTURA" },
                  { label: "MISTERIO", value: "MISTERIO" },
                  { label: "FICÇÃO", value: "FICÇÃO" },
              ]}
              style={pickerSelectStyles}
          />


          <ThemedText style={{color: 'black'}}>PAGINAS</ThemedText>
          <TextInput keyboardType="numbers-and-punctuation" onChangeText={setPaginas} value={pagina}
            placeholder='Pagínas'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, maxWidth:120}}
          />

          <ThemedText style={{color: 'black'}}>LINGUA</ThemedText>
          <TextInput onChangeText={setLingua} value={lingua}
            placeholder='Língua'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
          />
          <Button title="Pick an image from camera roll" onPress={pickImage} />

          <Button title='SALVAR' onPress={registrarLivro}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
    color: 'black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 200,
  }
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

/*
<TextInput onChangeText={setEstado} value={estado}
            placeholder='Estado'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}}
          />

<ThemedText style={{color: 'black'}}>GENERO</ThemedText>
          <TextInput onChangeText={setGenero} value={genero}
            placeholder='Genero'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, paddingHorizontal:100}}
          />


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