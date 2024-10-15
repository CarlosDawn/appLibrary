import React, { memo, FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { resets } from '@/assets/styles/_resets.module';

interface Props {
    className?: string;
}

export const Group130: FC<Props> = memo(function Group130(props = {}) {
    return (
        <View>
        <View style={resets.line2} />
        <View style={resets.line3} />
        <View style={resets.rectangle49}>
            <Text style={resets.aLTERAR}>ALTERAR</Text>
        </View>
        <View style={resets.rectangle492}>
            <Text style={resets.dELATAR}>DELATAR</Text>
        </View>
        <View style={resets.rectangle47} />
        <Text style={resets.tereLiye}>Tere Liye</Text>
        <Text style={resets.bintang}>Bintang</Text>
        <View style={resets.line4} />
        <View style={resets.rectangle48}>
            <Text style={resets.romance}>Romance</Text>
        </View>
        <Text style={resets._102}>0102</Text>
        <Text style={resets.pAGES}>PAGES</Text>
        <View style={resets.rectangle10} />
        <View style={resets.rectangle5} />
        <View style={resets.rectangle6} />
        <View style={resets.rectangle7} />
        <View style={resets.rectangle8} />
        <Text style={resets._835}>8.35</Text>
        <Text style={resets._4G}>4G</Text>
        <View style={resets.rectangle9} />
        </View>
    );
});
