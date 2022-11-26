import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from "react-native-vector-icons/MaterialIcons"
import Icon3 from 'react-native-vector-icons/EvilIcons';
export default function SearchFeed() {
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
      {/* //SEARCH */}
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <TextInput
      style={{height:45,borderWidth:1,marginHorizontal:20,borderRadius:10,marginVertical:20,width:300}}
        placeholder="Search"
      />
      <Icon1
      name='search1'
        size={30}
        color={color.green}
        style={{position:"absolute",right:0,marginRight:75}}
      />
      <Icon1
      name='filter'
      size={30}
      color={color.green}
      style={{right:5}}
      />
      </View>
      {/* OVERHERE */}
      <TouchableOpacity style={{
         borderWidth: 1,
         borderRadius: 10,
         borderColor: '#6CC165',
         marginHorizontal:10,
         padding:10,
         marginTop:5
      }}>
        <View style={{flexDirection:"row",right:10}}>
      <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 60, height: 60, borderRadius: 30}}
            />
            <View>
            <View style={{flexDirection:"row",marginTop:10}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
              Nguyen Van A
            </Text>
            </View>
            <Text>2 hour ago</Text>
            </View>
        <View>
          </View>
        </View>
        <View style={{flexDirection:"row"}}>
      <Text style={{width: 190}}>
        Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien he
        0123456789
      </Text>
      <View style={{left:10}}>
          <View style={{flexDirection:"row"}}>
            <Icon3 name="calendar" size={25} color='black' />
            <Text style={{width:115,left:5}}>27/07/2022, 10h</Text>
          </View>
          <View style={{flexDirection:"row",marginVertical:5}}>
            <Icon3 name="location" size={25} color="black" />
            <Text style={{left:5,width:115}}>27/07/2022, 10h</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <Icon2 name="my-location" size={25} color="black" />
            <Text style={{width:115,left:5}}>27/07/2022, 1dddddddddddddddddddddd</Text>
          </View>
      </View>
      </View>
    </TouchableOpacity>
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
