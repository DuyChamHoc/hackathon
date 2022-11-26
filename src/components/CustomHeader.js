
import React from 'react';
import {  StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../assets/colors/color';
import {useNavigation} from '@react-navigation/native';

export default function CustomHeader({id}) {
  const navigation = useNavigation();
    return(
    <View
    style={{
      flexDirection: 'row',
      backgroundColor: 'green',
      height: 80,
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <TouchableOpacity
      style={{
        left: 15,
        backgroundColor: color.primarygreen,
        borderRadius: 22.5,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={()=>navigation.goBack()}>
      <Icon name="keyboard-arrow-left" size={25} color={color.green} />
    </TouchableOpacity>
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: color.primarygreen,
        width: 190,
        height: 55,
        borderRadius: 27.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}>
     
      <TouchableOpacity
        style={[
          styles.tab,
        ]}
       >
        <Text
          style={[
            styles.textab,
          
          ]}>
          {id===0?'Add a new ride':'Add new hitchhike'}
        </Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      style={{right: 15}}
      >
      <Image
        source={require('../assets/image/avatar.jpg')}
        style={{width: 45, height: 45, borderRadius: 25}}
      />
    </TouchableOpacity>
  </View>
    )
}
const styles = StyleSheet.create({
    tab: {
      height: 40,
      width: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    textab: {
      fontSize: 16,
      color: 'white',
      width:140,
      alignSelf:"center",
      fontWeight: '600',
    },
  });
  

