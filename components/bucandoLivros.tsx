import { Pressable, PressableProps, View, StyleSheet } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';


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
                <Link href={{pathname: '/areaBook', params:{id: data.id, image: data.image}}} style={styles.textoStyle}>
                    {data.titulo} - {data.autor} - {data.estado} - {data.genero} - {data.pagnias} - {data.lingua}
                </Link>
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
