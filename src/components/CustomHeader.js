import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FontAwe5 from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
export default function CustomHeader({ title, colorheader, colorbgicon }) {
    const navigation = useNavigation();
    return (
        <View style={[styles.header]}>
            <View
                style={[
                    styles.bgicon,
                    {
                        borderColor: colorbgicon,
                        backgroundColor: colorbgicon,
                    },
                ]}>
                <FontAwe5
                    name="chevron-left"
                    size={27}
                    color={colorheader}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Text style={[styles.headerText, { color: colorheader }]}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 50,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 26,
        width: windowWidth - 124,
        textAlign: 'center',
    },
    bgicon: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 42,
        width: 42,
    },
});
