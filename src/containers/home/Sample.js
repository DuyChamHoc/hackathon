import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';

const Sample = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: 100,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'lightgrey',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: '60%',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../../src/assets/image/Leaf.png')}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 17, color: '#D68100'}}>
              3 <Text style={{color: 'black'}}>trees</Text>
            </Text>
            <Text style={{fontSize: 15, width: '75%'}}>
              It takes around 3 trees to absorb this emission in a year.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 100,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'lightgrey',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: '60%',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Image
            style={{width: 40, height: 40, resizeMode: 'contain'}}
            source={require('../../../src/assets/image/Phone.png')}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 17, color: '#D68100'}}>
              15<Text style={{color: 'black'}}> charged smartphones</Text>
            </Text>
            <Text style={{fontSize: 15, width: '50%'}}>
              Charging 15 smartphones would emit the same amount of CO2eq than
              this emission.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Sample;

const styles = StyleSheet.create({});
