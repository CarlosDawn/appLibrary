import { Pressable, PressableProps, View, StyleSheet } from "react-native";
import { ThemedText } from '@/components/ThemedText';


type Props = PressableProps & {
    data: {
        id: number
        titulo: string
        autor: string
        estado: string
        genero: string
}
    }

export function LivroData({data, ...rest}: Props) {
    return (
        <View>
            <Pressable {...rest}>
                <ThemedText style={styles.textoStyle}>
                    {data.titulo} - {data.autor} - {data.estado} - {data.genero}
                </ThemedText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textoStyle: {
      color: 'black',
    }
  });
