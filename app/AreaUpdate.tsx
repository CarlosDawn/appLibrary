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
import { useRoute } from '@react-navigation/native';

const UpdateScreen = ({route = useRoute()}) => {
  const [tituloUp, setTitulo] = useState("");
  const [autorUp, setAutor] = useState("");
  const [estadoUp, setEstado] = useState("");
  const [generoUp, setGenero] = useState("");
  const [paginas, setPaginas] = useState("");
  const [linguaUp, setLingua] = useState("");

  const [imageUp, setImage] = useState("");

  const paginasUp: number = parseInt(paginas);//Convertendo o input de 'paginas' para 'number'

  //const route = useRoute();
  const idUp = route.params;
  //const idUp: number = parseInt(id);

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

  async function atualizarLivro() {
    try {
      //await livroDatabase.update({idUp, imageUp, tituloUp, autorUp, estadoUp, generoUp, paginasUp, linguaUp})

      Alert.alert("Livro Atualizado !!! ")
    } catch (error) {
      console.log(error)
    }
  }
//------------------------------------------------

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titleContainer}>
          <ThemedText type='title'>Welcome! Register Books Area</ThemedText>
          <HelloWave/>
          <ThemedText style={{color: 'black'}}>AREA UPDATE</ThemedText>
          <TextInput onChangeText={setTitulo} value={tituloUp}
            placeholder='Titulo'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200}}
          />
          <ThemedText style={{color: 'black'}}>AUTOR</ThemedText>
          <TextInput onChangeText={setAutor} value={autorUp}
            placeholder='Autor'
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
          <TextInput keyboardType="numbers-and-punctuation" onChangeText={setPaginas} value={paginas}
            placeholder='Pagínas'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, maxWidth:120}}
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

export default UpdateScreen;

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
