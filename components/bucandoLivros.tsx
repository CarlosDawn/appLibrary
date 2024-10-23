import { Pressable, PressableProps, View, StyleSheet, Text, Button, TouchableHighlight, } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Link, router } from 'expo-router';
import { Route, useParams } from 'react-router-dom';

import { Image } from 'expo-image';
import React from "react";

import { createStackNavigator } from '@react-navigation/stack';

import {styleScreen} from '@/assets/styles/serach_styles';
import { styleScreenHome } from "@/assets/styles/home_styles_screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";

type Props = PressableProps & {
    data: {
        id: number
        image: string
        titulo: string
        autor: string
        estado: string
        genero: string
        paginas: number
        lingua: string
    }

}
type Empres = PressableProps & {
    data: {
        id: number
        livro_id: number
        nome_pessoa: string
        data_emprestimo: string
        prazo_devolucao: string
    }
}

export function LivroData({data, ...rest}: Props) {

    return (
        <View>
            <View style={styleScreen.rectangle50} />
            <Image
                style={styleScreen.rectangle51}
                source={{uri: data.image}}
                contentFit="cover"
                transition={800}
            />
            <Text style={styleScreen.tITULO}>{data.titulo}</Text>
            <Text style={styleScreen.aUTOR}>{data.autor}</Text>
            <Text style={styleScreen.gENRO}>{data.genero}</Text>
            <Text style={styleScreen.pAGINAS}>{data.paginas} PAGINAS</Text>
            <View style={styleScreen.line5} />
            <Pressable style={styleScreen.rectangle136} >
                <Link href={{pathname: '/areaBook', params:{id: data.id,
                                                                titulo: data.titulo,
                                                                autor: data.autor,
                                                                estado: data.estado,
                                                                genero:data.genero,
                                                                paginas: data.paginas,
                                                                lingua: data.lingua,
                                                                image: data.image}}} style={styleScreenHome.vER}>VER</Link>
            </Pressable>
        </View>
    )
}
export function LivroDataHome({data, ...rest}: Props) {

    return (
        <View>
            <View style={styleScreenHome.rectangle50} />
            <Image
                style={styleScreenHome.rectangle51}
                source={{uri: data.image}}
                contentFit="cover"
                transition={800}
            />
            <Text style={styleScreenHome.tITULO}>{data.titulo}</Text>
            <Text style={styleScreenHome.aUTOR}>{data.autor}</Text>
            <Text style={styleScreenHome.gENRO}>{data.genero}</Text>
            <Text style={styleScreenHome.pAGINAS}>{data.paginas} PAGINAS</Text>
            <View style={styleScreenHome.line5} />
            <View style={{width: 100, height: 24, borderRadius: 12, transform: [{translateY: -50}, {translateX: 275}], backgroundColor: 'blue',}}>
                <Text style={{margin: 'auto', color: 'white', fontStyle: 'italic'}}>{data.estado}</Text>
            </View>
            <Pressable style={styleScreenHome.rectangle136} >
                <Link href={{pathname: '/areaBook', params:{id: data.id,
                                                                titulo: data.titulo,
                                                                autor: data.autor,
                                                                estado: data.estado,
                                                                genero:data.genero,
                                                                paginas: data.paginas,
                                                                lingua: data.lingua,
                                                                image: data.image}}} style={styleScreenHome.vER}>VER</Link>
            </Pressable>
        </View>
    )
}
export function LivroEmprestado({data, ...rest}: Empres) {
    return (
        <View>
            <Pressable {...rest}>
                <Link  href={{pathname: '/areaBook', params:{id: data.id, 
                                                            livro_id: data.livro_id,
                                                            nome_pessoa: data.nome_pessoa,
                                                            data_emprestimo: data.data_emprestimo,
                                                            prazo_devolucao: data.prazo_devolucao}}} style={styles.textoStyle}>
                    {data.livro_id} - {data.nome_pessoa} - {data.data_emprestimo} - {data.prazo_devolucao}
                </Link >
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textoStyle: {
      color: 'black',
      paddingTop: 10,
      bottom: -122
    },
    image: {
        width: 45,
        height: 65,
        alignItems: 'center',
        margin: 'auto'
    }
  });
