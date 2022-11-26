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
import Icon2 from "react-native-vector-icons/MaterialIcons"
import Icon3 from 'react-native-vector-icons/EvilIcons';

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
      {tab===0?
      <View>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <Image source={require('../../assets/image/advertise.png')} 
        style={{width:350}}
        />
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
          backgroundColor: color.greenop,
          height: 120,
          width:350,
          alignSelf:"center"
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
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
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 140,
              width: 140,
              borderRadius: 70,
              bottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={()=>{navigation.navigate('AddFeed')}}>
            
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
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 17.5,
                }}>
                <Image
                source={require('../../assets/image/feed.png')}
                style={{width: 35, height: 35}}
              />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 16,
                  top: 8,
                }}>
                Add a ride
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 35,
                width: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 17.5,
              }}>
              <Image
                source={require('../../assets/image/ride.png')}
                style={{width: 25, height: 25}}
              />
            </View>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: '700'}}>
              Your rides
            </Text>
          </TouchableOpacity>
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
        Incoming rides
      </Text>
      <ScrollView style={{marginVertical: 10}}>
      <TouchableOpacity style={{
         borderWidth: 1,
         borderRadius: 10,
         borderColor: '#6CC165',
         marginHorizontal:10,
         padding:10,
         marginTop:5,
         backgroundColor:"white"
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
      </View>
    :
    <View>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <Image source={require('../../assets/image/advertise.png')} 
        style={{width:350}}
        />
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
          backgroundColor: color.greenop,
          height: 120,
          width:350,
          alignSelf:"center"
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
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
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 140,
              width: 140,
              borderRadius: 70,
              bottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={()=>{navigation.navigate('AddFeed')}}>
            
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
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 17.5,
                }}>
                <Image
                source={require('../../assets/image/feed.png')}
                style={{width: 35, height: 35}}
              />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 16,
                  top: 8,
                }}>
                Add a ride
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 35,
                width: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 17.5,
              }}>
              <Image
                source={require('../../assets/image/ride.png')}
                style={{width: 25, height: 25}}
              />
            </View>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: '700'}}>
              Your rides
            </Text>
          </TouchableOpacity>
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
        Incoming rides
      </Text>
      <ScrollView style={{marginVertical: 10}}>
      <TouchableOpacity style={{
         borderWidth: 1,
         borderRadius: 10,
         borderColor: '#6CC165',
         marginHorizontal:10,
         padding:10,
         marginTop:5,
         backgroundColor:"white"
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
            <Text style={{width:115,left:5}}>27/07/2022</Text>
          </View>
      </View>
      </View>
    </TouchableOpacity>
      </ScrollView>
      </View>}
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
