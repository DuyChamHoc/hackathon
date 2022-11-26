import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from "react-native-vector-icons/MaterialIcons"
import Icon3 from 'react-native-vector-icons/EvilIcons';
import PostItem from '../../components/postItem';

export default function DetailFeed() {
  const data=[{
    id:1,
  },
  {
    id:2,
  }
]
  return (
    <ScrollView style={{marginVertical:30}}>
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
          <View style={{marginTop:5}}>
            <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
              Nguyen Van A
            </Text>
            <Text style={{fontSize: 14}}>About a day before</Text>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: color.primarygreen,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 100,
              borderRadius: 15,
              flexDirection:"row",
              marginTop:5
            }}>
            <Text style={{color: 'white',left:10,fontSize:15,fontWeight:"600"}}>Contact</Text>
            <Icon2
            name='arrow-forward-ios'
            size={20}
            color="white"
            style={{right:5}}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:15,fontWeight:'500'}}>
          Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien he 0123456789
        </Text>
        <View
          style={{
            height: 35,
            borderWidth: 1,
            borderColor:color.gray,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical:15
          }}>
          <View
            style={{
              flexDirection: 'row',
              left: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="newspaper-variant" size={20} color="black" />
            <Text
              style={{
                left: 25,
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
              }}>
              Share
            </Text>
          </View>
          <View style={{height: 35, borderWidth: 1,borderColor:color.gray}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              right: 28,
            }}>
            <Icon1
              name="car-sport-outline"
              size={20}
              color="black"
              style={{right: 25}}
            />
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              Car {'('}2 people{')'}
            </Text>
          </View>
        </View>
        <View style={{flexDirection:"row"}}>
            <Icon3 name="calendar" size={25} color='black' />
            <Text style={{left:10,fontWeight:'400'}}>27/07/2022, 10h</Text>
          </View>
          <View style={{flexDirection:"row",marginVertical:10}}>
            <Icon3 name="location" size={25} color="black" />
            <Text style={{left:10,fontWeight:'400'}}>27/07/2022, 10h</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <Icon2 name="my-location" size={25} color='black' />
            <Text style={{left:10,fontWeight:'400'}}>27/07/2022, 10h</Text>
          </View>
          <View style={{borderWidth:0.5,marginTop:30,borderColor:color.gray,width:300,alignSelf:"center"}}/>
          <Text style={{fontWeight:'700',fontSize:18,color:"black",left:8,marginVertical:20}}>Comments</Text>
          
          <View style={{flexDirection:"row",marginTop:5}}>
            <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 60, height: 60, borderRadius: 30}}
            />
            <View>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:5}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
              Nguyen Van A
            </Text>
            <Text>12h ago</Text>
            </View>
            <Text style={{width:270,fontWeight:"500"}}>
            Cho em hoi chuyen nay minh con nhan aaaAA
            </Text>
            </View>
          </View>
          <View style={{marginVertical:30,flexDirection:"row"}}>
            <TextInput
            placeholder='Write your comment...'
            style={{backgroundColor:color.gray1,marginTop:20,width:"100%",borderRadius:10}}
            />
             <Icon2
            name='arrow-forward-ios'
            size={25}
            color="black"
            style={{right:5,alignSelf:"center",bottom:11,position:"absolute"}}
            />
          </View>
      </View>
      <Text style={{fontWeight:'700',fontSize:18,color:"black",left:22,marginVertical:20}}>Related rides</Text>
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
    </ScrollView>
  );
}