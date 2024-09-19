import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

type User = {
    id: number;
};

export default function BookScreen({ route }: { route: any }) {
  const {user} = route.params;
  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title'>Welcome! Perfil Books Area</ThemedText>
      <HelloWave />
      <Text>{user.id}</Text>
    </View>  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  }
});