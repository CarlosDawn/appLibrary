import { Pressable, PressableProps, View, StyleSheet, Text } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Route, useParams } from 'react-router-dom';

import { Image } from 'expo-image';
import React from "react";

import {styleScreen} from '@/assets/styles/serach_styles';

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
        /*<View>
            <Pressable {...rest}>
                <Image
                    style={styles.image}
                    source={{uri: data.image}}
                    contentFit="cover"
                    transition={1000}
                />
                <Link  href={{pathname: '/areaBook', params:{id: data.id, 
                                                            titulo: data.titulo, 
                                                            autor: data.autor,
                                                            estado: data.estado,
                                                            genero:data.genero,
                                                            paginas: data.paginas,
                                                            lingua: data.lingua, 
                                                            image: data.image}}} style={styles.textoStyle}>
                    {data.titulo} - {data.autor} - {data.estado == "NÃO" ? 'Não Lido Ainda!' : `${data.estado}`} - {data.genero} - {data.paginas} - {data.lingua}
                </Link >
            </Pressable>
        </View>*/
        <View>
            <View style={styleScreen.rectangle50} />
            <Text style={styleScreen.tITULO}>{data.titulo}</Text>
            <Text style={styleScreen.aUTOR}>{data.autor}</Text>
            <Text style={styleScreen.gENRO}>{data.genero}</Text>
            <Text style={styleScreen.pAGINAS}>{data.paginas} PAGINAS</Text>
            <View style={styleScreen.line5} />
            <View style={styleScreen.rectangle136} />
            <Text style={styleScreen.vER}>VER</Text>
            <Text style={styleScreen._835}>8.35</Text>
            <Text style={styleScreen._4G}>4G</Text>
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
      backgroundColor: 'pink',
    },
    image: {
        width: 45,
        height: 65,
        alignItems: 'center',
        margin: 'auto'
    }
  });

/*<Route  href={{pathname: '/areaBook', params:{id: data.id, image: data.image}}} style={styles.textoStyle}>
                    {data.titulo} - {data.autor} - {data.estado} - {data.genero} - {data.pagnias} - {data.lingua}
                </Route >*/ 
