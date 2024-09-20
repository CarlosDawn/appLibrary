import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

import { useLocalSearchParams, Link } from 'expo-router';

import { Image } from 'expo-image';

export default function BookScreen() {

  const { id, image } = useLocalSearchParams();

  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title'>Welcome! Perfil Books Area {id}</ThemedText>
      <HelloWave />
      <Link href={"/(tabs)/searchBook"}>Voltar Para Pesquisa</Link>

      <Image
        style={styles.image}
        source={{uri: image}}
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