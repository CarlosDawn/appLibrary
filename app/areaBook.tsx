import React, { useState, memo, FC } from 'react';
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView, TextInput, Alert, KeyboardAvoidingView, Pressable  } from 'react-native';

import { useDatabase } from '@/database/useDataBase';

import { ThemedText } from '@/components/ThemedText';

import { useLocalSearchParams, Link } from 'expo-router';

import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from '@react-native-community/datetimepicker';

import RNPickerSelect from "react-native-picker-select";

import { router } from 'expo-router';

import { resets } from '@/assets/styles/_resets.module';
import { stylesRegister } from '@/assets/styles/register_styles'
import { MaterialIcons } from '@expo/vector-icons';
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

  function LivroScreen({ navigation }: { navigation: any })  {
    const irParaTelaUpdate = () => {
      navigation.navigate("AreaUptadeScrenn");
    };
    

    const irEmprestar = () =>  {
      navigation.navigate("AreaEmprestarLivro")
    };

    const livroDatabase = useDatabase();

    async function removerLivro(id: string) {
      const idDelete = parseInt(id)
      try {
        await livroDatabase.remove(idDelete);

        Alert.alert("Livro APAGADO !!!")

        router.push('/(tabs)/searchBook')
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <View style={styles.root}>
        <Link style={{marginLeft: 'auto', marginRight: 'auto', textDecorationLine: 'underline'}} href={"/(tabs)/searchBook"}>-Voltar Para Pesquisa-</Link>
        <Image
          source={{uri: image}}
          style={resets.rectangle47}
        />
        <Text style={resets.tereLiye}>{estado === 'NÃO' ? 'NÃO LIDO' : estado}</Text>
        <Text style={resets.AUTOR}>AUTOR: {autor}</Text>
        <Text style={resets.bintang}>{titulo}</Text>
        <View style={resets.line4} />
        <View style={resets.rectangle48}>
            <Text style={resets.romance}>{genero}</Text>
        </View>
        <Text style={resets._102}>{paginas}</Text>
        <Text style={resets.pAGES}>PAGINAS</Text>
        <Text style={{transform: [{translateY: -230}], margin:'auto', borderStyle: 'solid', borderColor: '#90A67F', borderWidth: 1.5}}>IDIOMA: {lingua}</Text>
        <View style={resets.rectangleAlterar}>
          <Text style={resets.aLTER} onPress={irParaTelaUpdate}>ALTERAR</Text>
        </View>
        <View style={resets.rectangleAlterar}>
          <Text style={resets.eMPRES} onPress={irEmprestar}>EMPRESTAR</Text>
        </View>
        <View style={resets.rectangle492}>
          <Text style={resets.dELATAR} onPress={() => removerLivro(id)} >DELATAR</Text>
        </View>
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
    <ScrollView>
      <View style={stylesRegister.root}>
        <Text style={stylesRegister.cADASTRARLIVRO}>CADASTRAR LIVRO</Text>

        <ThemedText style={{color: 'black', transform: [{translateY: 400}, {translateX: 50}]}}>TITULO</ThemedText>
        <ThemedText style={{color: 'black', transform: [{translateY: 470}, {translateX: 50}]}}>AUTOR</ThemedText>

        <Image
          source={{uri: imageUp}}
          style={stylesRegister.fotoPagina}
        />

        <Pressable style={stylesRegister.chooseImage} onPress={pickImage}>
          <MaterialIcons name='camera-alt' size={26}/>
        </Pressable>

        <TextInput onChangeText={setTitulo} value={tituloUp}
            style={stylesRegister.rectangle24}
        />
        <TextInput onChangeText={setAutor} value={autorUp}
            style={stylesRegister.rectangle242}
        />

        <View style={{transform: [{translateY: 310}, {translateX: 147}]}}>
          <ThemedText style={{color: 'black', transform: [{translateY: 0}, {translateX: 10}]}}>STATUS ATUAL</ThemedText>
          <RNPickerSelect
                onValueChange={setEstado} value={estadoUp}
                items={[
                    { label: "LIDO", value: "LIDO" },
                    { label: "NÃO", value: "NÃO" },
                    { label: "LENDO", value: "LENDO" },
                ]}
                style={pickerSelectStyles}
          />
          <ThemedText style={{color: 'black', transform: [{translateY: 0}, {translateX: 10}]}}>GENERO OU TIPO</ThemedText>
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
        </View>

        <ThemedText style={{color: 'black', transform: [{translateY: 325}, {translateX: 50}]}}>NÚMERO DE PAGÍNAS</ThemedText>
        <TextInput keyboardType="numeric" onChangeText={setPaginas} value={paginaToUp}
            style={stylesRegister.rectangle245}
        />

        <ThemedText style={{color: 'black', transform: [{translateY: 334}, {translateX: 50}]}}>IDIOMA</ThemedText>
        <TextInput onChangeText={setLingua} value={linguaUp}
            style={stylesRegister.rectangle246}
        />
        <Pressable style={stylesRegister.rectangle247} onPress={atualizarLivro}>
          <Text style={stylesRegister.sALVAR}>SALVAR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
  }
  
  function AreaEmprestarLivro() {
    const [nome_pessoa, setnome] = useState("");
    const [dataEmprestimo, setdtaEmpre] = useState(new Date());
    const [prazoDevolucao, setPrazo] = useState(new Date());

    const livroDatabase = useDatabase();

    async function emprestarLivro() {

      try {

        const livro_id = parseInt(id);

        const dataFullEmpres: string = dataEmprestimo.getDate()+"/"+dataEmprestimo.getMonth()+"/"+dataEmprestimo.getFullYear();
        const dataFullPrazo: string = prazoDevolucao.getDate()+"/"+prazoDevolucao.getMonth()+"/"+prazoDevolucao.getFullYear();

        await livroDatabase.emprestar({livro_id, nome_pessoa, dataFullEmpres, dataFullPrazo});

        Alert.alert("Livro EMPRESTADO !!!")

      } catch (error) {
        console.log(error)
      }
    }

    return(
      <View>
        <Text>Area de emprestar</Text>
        <Image
          source={{uri: image}}
          style={styles.image}
        />
        <Text style={styles.titleContainer}>TITULO: {titulo}</Text>
        <Text style={styles.titleContainer}>AUTOR: {autor}</Text>
        <Text style={styles.titleContainer}>GENERO: {genero}</Text>
        <Text style={styles.titleContainer}>LINGUA: {lingua}</Text>
        
        <TextInput onChangeText={setnome} value={nome_pessoa}
            placeholder='Titulo'
            style={{height: 40, borderWidth: 1, borderColor: "#999", borderRadius: 9, width: 150, maxWidth: 200, margin: 'auto'}}
        />

        <Text style={styles.titleContainer}>Selecione Data de Emprestimo</Text>
        <DatePicker
          style={styles.titleContainer}
          value={dataEmprestimo}
          mode="date" // or "datetime" for both date and time
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || dataEmprestimo;
            setdtaEmpre(currentDate);
          }}
        />

        <Text style={styles.titleContainer}>Selecione Data de Devolução</Text>
        <DatePicker
          style={styles.titleContainer}
          value={prazoDevolucao}
          mode="date" // or "datetime" for both date and time
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || prazoDevolucao;
            setPrazo(currentDate);
          }}
        />

        <View style={styles2.buttonContainer}>
          <Button title='EMPRESTAR' onPress={emprestarLivro}/>
        </View>
      </View>
    );
  }

  return ( 
    <Stack.Navigator>
        <Stack.Screen name="AreaLivro" component={LivroScreen}/>
        <Stack.Screen name="AreaUptadeScrenn" component={AreaUptadeScrenn} />
        <Stack.Screen name="AreaEmprestarLivro" component={AreaEmprestarLivro} />
    </Stack.Navigator>
  );
}

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

const styles = StyleSheet.create({
  root: {
    width: 425,
    fontFamily: 'sans-serif',
    backgroundColor: '#F3FFE0',
    flex: 1, // Replace 'flex-basis: 100%' with 'flex: 1'
    overflow: 'scroll', // Replace 'overflow-y: auto' with 'overflowY: 'scroll''
    justifyContent: 'space-between'
  },
  titleContainer: {

  },
  image: {

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

    const styles2 = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
      },
      image: {
        width: 100,
        height: 150,
        borderRadius: 8,
      },
      title: {
        // Estilos para o título
      },
      author: {
        // Estilos para o autor
      },
      pages: {
        // Estilos para o número de páginas
      },
      buttonContainer: {
        // Estilos para o container dos botões
      },
      // ... outros estilos
    });