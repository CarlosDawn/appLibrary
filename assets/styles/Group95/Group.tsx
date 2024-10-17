import React from 'react';
import { View, Text, Image } from 'react-native';

//import resets from '../../_resets.module.scss';
//import { Book_Size48 } from '../Book_Size48/Book_Size48.js';
//import { Bookmark_filled } from '../Bookmark_filled/Bookmark_filled.js';
import BookIcon from './BookIvon';
import Bookmark_filledIcon from './Bookmark_filledIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import {styles} from './stylesGroup95';

interface Props {
  className?: string;
}

const Group95 = ({ className }: Props) => {
  return (
    <View style={[styles.root]}>
      <View style={styles.rectangle52} />
      <Text style={styles.nAOLIDOS}>NÃO LIDOS</Text>
      <View style={styles.rectangle522} />
      <Text style={styles.lIDOS}>LIDOS</Text>
      <View style={styles.rectangle523} />
      <Text style={styles.lENDO}>LENDO</Text>
      <Ionicons name='book' style={styles.icon}></Ionicons>
    </View>
  );
};

/* <Bookmark_filledIcon style={styles.bookmark_filled} />
      <BookIcon style={styles.book} />*/

export default Group95;