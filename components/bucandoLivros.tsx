import { Pressable, PressableProps, View, StyleSheet } from "react-native";
import { ThemedText } from '@/components/ThemedText';


type Props = PressableProps & {
    titulo: string
    autor: string
    estado: string
    genero: string
}

export function LivroData({titulo, autor, estado, genero, ...rest}: Props) {
    return (
        <View>
            <Pressable {...rest}>
                <ThemedText style={styles.textoStyle}>
                    {titulo} - {autor} - {estado} - {genero}
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
