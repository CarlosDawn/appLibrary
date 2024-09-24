import { Pressable, PressableProps, View, StyleSheet } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Route, useParams } from 'react-router-dom';


type Props = PressableProps & {
    data: {
        id: number
        image: string
        titulo: string
        autor: string
        estado: string
        genero: string
        pagnias: string
        lingua: string
}
    }

export function LivroData({data, ...rest}: Props) {
    return (
        <View>
            <Pressable {...rest}>
                <Route  path="/post/:id">
                    {data.titulo} - {data.autor} - {data.estado} - {data.genero} - {data.pagnias} - {data.lingua}
                </Route >
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textoStyle: {
      color: 'black',
      backgroundColor: 'pink',
    }
  });

/*<Route  href={{pathname: '/areaBook', params:{id: data.id}}} style={styles.textoStyle}>
                    {data.titulo} - {data.autor} - {data.estado} - {data.genero} - {data.pagnias} - {data.lingua}
                </Route >*/ 
