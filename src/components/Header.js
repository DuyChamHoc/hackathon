import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {colors, parameters} from '../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../assets/colors/color';
export default function Header({title, type, navigation}) {
  return (
    <View style={styles.header}>
      <View style={{marginLeft: 20}}>
        <Icon
          name="arrow-left"
          color={colors.headerText}
          size={28}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={{marginEnd: 10}}>
        <Icon1
          type="material-community"
          name="dots-vertical"
          color={colors.headerText}
          size={28}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: color.primarygreen,
    height: parameters.headerHeight,
    justifyContent: 'space-between',
  },
  headerText: {
    color: colors.headerText,
    fontSize: 21,
    fontWeight: 'bold',
    paddingTop: 3,
  },
});
