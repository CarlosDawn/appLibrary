import { Pressable, PressableProps, View, StyleSheet, Text, Button, TouchableHighlight, Alert, } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Link, router } from 'expo-router';
import { Route, useParams } from 'react-router-dom';

import { Image } from 'expo-image';
import React, { useEffect, useState } from "react";

import { createStackNavigator } from '@react-navigation/stack';

import {styleScreen} from '@/assets/styles/serach_styles';
import { styleScreenHome } from "@/assets/styles/home_styles_screen";
import { styleEmpres } from "@/assets/styles/lista_emprestimos_styles";

import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";

import { useDatabase } from "@/database/useDataBase";

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
        nome_livro: string
        image_livro: string
        nome_pessoa: string
        data_emprestimo: string
        prazo_devolucao: string
    }

    onDelete: () => void
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
            <View style={{width: 100, height: 24, borderRadius: 12, transform: [{translateY: -50}, {translateX: 275}], backgroundColor: 'blue',}}>
                <Text style={{margin: 'auto', color: 'white', fontStyle: 'italic'}}>{data.estado === 'NÃO' ? 'NÃO LIDO' : data.estado}</Text>
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
export function LivroEmprestado({data, onDelete, ...rest}: Empres) {
    
    const [dataAtual, setDataAtual] = useState(new Date());

    /*useEffect(() => {
        const intervalId = setInterval(() => {
            setDataAtual(new Date())
        }, 10000);
    
        return () => clearInterval(intervalId);
      }, []);*/

      const dia = dataAtual.getDay()-4;
      const mes = dataAtual.getMonth()+1;
      const ano = dataAtual.getFullYear();

      const atualData = dia+"/"+mes+"/"+ano;
      const devolucao = data.prazo_devolucao;
      console.log(dia+"/"+mes+"/"+ano);
      console.log(data.prazo_devolucao);

    return (
        <View>
            <View style={styleEmpres.rectangle50} />
            <Image
                style={styleEmpres.rectangle51}
                source={{uri: data.image_livro}}
                contentFit="cover"
                transition={800}
            />
            <Text style={styleEmpres.tITULO}>{data.nome_livro}</Text>
            <Text style={styleEmpres.pESSOA}>Emprestado para: {data.nome_pessoa}</Text>
            <View style={styleEmpres.line5} />
            <View style={styleEmpres.rectangle136} >
                <Text style={styleEmpres.eMPRESTIMO}>EMPRESTIMO: {data.data_emprestimo}</Text>
            </View>
            <View style={[styleEmpres.rectangle137, atualData === devolucao && styleEmpres.diaDePrazo]}>
                <Text style={styleEmpres.dEVOLUCAO}>DEVOLUÇÃO: {data.prazo_devolucao}</Text>
            </View>

            <Pressable onPress={onDelete}>
                <MaterialIcons name="delete" size={50} style={{transform: [{translateY: -50}, {translateX: 330}]}}/>
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

/*<Link  href={{pathname: '/areaBook', params:{id: data.id, 
                                                            livro_id: data.livro_id,
                                                            nome_pessoa: data.nome_pessoa,
                                                            data_emprestimo: data.data_emprestimo,
                                                            prazo_devolucao: data.prazo_devolucao}}} style={styles.textoStyle}>
                    {data.livro_id} - {data.nome_pessoa} - {data.data_emprestimo} - {data.prazo_devolucao}
                </Link > */
