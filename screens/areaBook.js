import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { useLocalSearchParams, Link } from 'expo-router';

import { Image } from 'expo-image';

export default function BookScreen() {

  const {titulo, autor, estado, genero, lingua, paginas, image} = useLocalSearchParams<{id: string, 
                                                                                  titulo: string,
                                                                                  autor: string,
                                                                                  estado: string,
                                                                                  genero: string,
                                                                                  lingua: string,
                                                                                  paginas: string, 
                                                                                  image: string
  }>("");

                                                                                  

  return (
    <View style={styles.titleContainer}>
      <ThemedText style={styles.titleContainer} type='title'>LIVRO</ThemedText>
      <Link href={"/(tabs)/searchBook"}>Voltar Para Pesquisa</Link>

      <Image
        style={styles.image}
        source={{uri: image}}
        contentFit="cover"
        transition={1000}
      />
      <ThemedText style={styles.titleContainer}>TITULO: {titulo}</ThemedText>
      <ThemedText style={styles.titleContainer}>AUTOR: {autor}</ThemedText>
      <ThemedText style={styles.titleContainer}>ESTADO: {estado}</ThemedText>
      <ThemedText style={styles.titleContainer}>GENERO: {genero}</ThemedText>
      <ThemedText style={styles.titleContainer}>PAGINAS: {paginas}</ThemedText>
      <ThemedText style={styles.titleContainer}>LINGUA: {lingua}</ThemedText>

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