import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

const BookScreen = () => {
  return (
    <View style={styles.titleContainer}>
      <ThemedText type='title'>Welcome! Perfil Books Area</ThemedText>
      <HelloWave />
    </View>  
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 8,
  }
});

export default BookScreen;
