import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {color} from '../../assets/colors/color';

export default function AddFeed() {
  return (
    <View>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          borderWidth: 1,
          marginVertical: 20,
          marginHorizontal: 20,
          borderColor: color.green,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{right: 10}}>
            <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 60, height: 60, borderRadius: 30}}
            />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 14, fontWeight: '700', color: 'black'}}>
              Nguyen Van A
            </Text>
            <Text style={{fontSize: 14}}>About a day before</Text>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: color.primarygreen,
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              borderRadius: 15,
            }}>
            <Text style={{color: 'white'}}>Contact</Text>
          </TouchableOpacity>
        </View>
        <Text>
                
        </Text>
      </View>
    </View>
  );
}
