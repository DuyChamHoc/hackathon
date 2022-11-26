import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import PostItem from '../../components/postItem';

export default function Home({navigation}) {
  const [tab, setTab] = useState(0);
  return (
    <View>
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
            left: 10,
            backgroundColor: 'white',
            borderRadius: 22.5,
            height: 45,
            width: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="notifications" size={25} color={color.green} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: color.primarygreen,
            width: 190,
            height: 55,
            borderRadius: 27.5,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={[
              styles.tab,
              {left: 7.5},
              tab === 0 ? {backgroundColor: 'white'} : null,
            ]}
            onPress={() => {
              setTab(0);
            }}>
            <Text
              style={[
                styles.textab,
                tab === 0 ? {color: color.primarygreen} : {color: 'white'},
              ]}>
              Rider
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {right: 7.5},
              tab === 1 ? {backgroundColor: 'white'} : null,
            ]}
            onPress={() => {
              setTab(1);
            }}>
            <Text
              style={[
                styles.textab,
                tab === 1 ? {color: color.primarygreen} : {color: 'white'},
              ]}>
              Hitchhiker
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{right: 10}}
          onPress={() => {
            navigation.navigate('myaccount');
          }}>
          <Image
            source={require('../../assets/image/avatar.jpg')}
            style={{width: 45, height: 45, borderRadius: 25, marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <Image source={require('../../assets/image/advertise.png')} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: 'black',
          marginVertical: 10,
          left: 15,
        }}>
        Make a ride
      </Text>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: 30,
          backgroundColor: color.greenop,
          height: 120,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                height: 35,
                width: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 17.5,
              }}>
              <Image
                source={require('../../assets/image/request.png')}
                style={{width: 25, height: 25}}
              />
            </View>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: '700'}}>
              All requests
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 140,
              width: 140,
              borderRadius: 70,
              bottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: color.green1,
                height: 115,
                width: 115,
                borderRadius: 57.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 17.5,
                }}>
                <Icon1 name="like2" size={25} color="black" />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 16,
                  top: 8,
                }}>
                All feed
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                height: 35,
                width: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 17.5,
              }}>
              <Image
                source={require('../../assets/image/request.png')}
                style={{width: 25, height: 25}}
              />
            </View>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: '700'}}>
              All requests
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: 'black',
          marginTop: 30,
          left: 15,
        }}>
        Icoming rides
      </Text>
      <ScrollView style={{marginVertical: 10}}>
        <PostItem />
      </ScrollView>
    </View>
  );
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
    fontSize: 14,
    fontWeight: '600',
  },
});
