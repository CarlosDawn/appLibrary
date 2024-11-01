//import * as React from 'react';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, TextInput, Alert, Text } from 'react-native';

import { useDatabase } from '@/database/useDataBase';

import { ThemedText } from '@/components/ThemedText';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

import RNPickerSelect from "react-native-picker-select";

import 'react-phone-number-input/style.css'

import { stylesRegister } from '@/assets/styles/register_styles'
import { MaterialIcons } from '@expo/vector-icons';

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
      setTitulo("")
      setAutor("")
      setEstado("")
      setGenero("")
      setPaginas("")
      setLingua("")
      setImage("")

      Alert.alert("Livro Cadastrado !!! ")
    } catch (error) {
      console.log(error)
    }
  }
//------------------------------------------------

  return (
    <ScrollView>
      <View style={stylesRegister.root}>
        <Text style={stylesRegister.cADASTRARLIVRO}>CADASTRAR LIVRO</Text>

        <ThemedText style={{color: 'black', transform: [{translateY: 400}, {translateX: 50}]}}>TITULO</ThemedText>
        <ThemedText style={{color: 'black', transform: [{translateY: 470}, {translateX: 50}]}}>AUTOR</ThemedText>

        <Image
          source={{uri: image}}
          style={stylesRegister.fotoPagina}
        />

        <Pressable style={stylesRegister.chooseImage} onPress={pickImage}>
          <MaterialIcons name='camera-alt' size={26}/>
        </Pressable>

        <TextInput onChangeText={setTitulo} value={titulo} textAlign='center'
            placeholder='Titulo'
            style={stylesRegister.rectangle24}
        />
        <TextInput onChangeText={setAutor} value={autor} textAlign='center'
            placeholder='Autor'
            style={stylesRegister.rectangle242}
        />

        <View style={{transform: [{translateY: 310}, {translateX: 147}]}}>
          <ThemedText style={{color: 'black', transform: [{translateY: 0}, {translateX: 10}]}}>STATUS ATUAL</ThemedText>
          <RNPickerSelect
                onValueChange={setEstado} value={estado}
                items={[
                    { label: "LIDO", value: "LIDO" },
                    { label: "NÃO LIDO", value: "NÃO" },
                    { label: "LENDO", value: "LENDO" },
                ]}
                style={pickerSelectStyles}
          />
          <ThemedText style={{color: 'black', transform: [{translateY: 0}, {translateX: 10}]}}>GENERO OU TIPO</ThemedText>
          <RNPickerSelect
                onValueChange={setGenero} value={genero}
                items={[
                    { label: "ESTUDOS", value: "ESTUDOS" },
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
        </View>

        <ThemedText style={{color: 'black', transform: [{translateY: 325}, {translateX: 50}]}}>NÚMERO DE PAGÍNAS</ThemedText>
        <TextInput keyboardType="numeric" onChangeText={setPaginas} value={pagina} textAlign='center'
            placeholder='Pagínas'
            style={stylesRegister.rectangle245}
        />

        <ThemedText style={{color: 'black', transform: [{translateY: 334}, {translateX: 50}]}}>IDIOMA</ThemedText>
        <TextInput onChangeText={setLingua} value={lingua} textAlign='center'
            placeholder='Língua'
            style={stylesRegister.rectangle246}
        />
        <Pressable style={stylesRegister.rectangle247} onPress={registrarLivro}>
          <Text style={stylesRegister.sALVAR}>SALVAR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      color: 'black',
      borderWidth: 3,
      borderColor: '#00000026',
      borderStyle: 'solid',
      borderRadius: 15,
      backgroundColor: '#f7f7f7',
  }
});
