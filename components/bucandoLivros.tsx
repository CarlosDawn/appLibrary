import { Pressable, PressableProps, View, StyleSheet } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Route, useParams } from 'react-router-dom';

import { Image } from 'expo-image';


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

export function LivroData({data, ...rest}: Props) {
    return (
        <View>
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
