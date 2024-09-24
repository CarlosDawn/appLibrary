import React, { useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { useDatabase, LivroDataBse } from '@/database/useDataBase';

import { useLocalSearchParams, Link } from 'expo-router';

import { Image } from 'expo-image';

export default function BookScreen() {

  const {id} = useLocalSearchParams<{id: string}>()

  const [livro, setLivro] = useState<LivroDataBse[]>([])

  const livroDatabase = useDatabase();

  async function dadosLivro() {
    try {
      const response = await livroDatabase.buscaLivro(id)
      setLivro(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dadosLivro()
  }, [id])

  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title'>Welcome! Perfil Books Area</ThemedText>
      <HelloWave />
      <Link href={"/(tabs)/searchBook"}>Voltar Para Pesquisa</Link>

      <Image
        style={styles.image}
        source={{uri: livro.image}}
        contentFit="cover"
        transition={1000}
      />
    </View>  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
    color: 'black'
  },
  
  image: {
    width: 140,
    height: 200,
  },
});