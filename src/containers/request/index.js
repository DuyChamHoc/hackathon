import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import PostItem from '../../components/postItem';

const Allrequest = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 18,
          color: 'black',
          left: 22,
          marginVertical: 20,
        }}>
        Your post
      </Text>
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
              style={{width: 50, height: 50, borderRadius: 30}}
            />
          </TouchableOpacity>
          <View style={{marginTop: 5}}>
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
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: 'white',
                left: 10,
                fontSize: 15,
                fontWeight: '600',
              }}>
              Contact
            </Text>
            <Icon2
              name="arrow-forward-ios"
              size={20}
              color="white"
              style={{right: 5}}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 15, fontWeight: '500'}}>
          Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien he
          0123456789
        </Text>
        <View
          style={{
            height: 35,
            borderWidth: 1,
            borderColor: color.gray,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
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
          <View style={{height: 35, borderWidth: 1, borderColor: color.gray}} />
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
        <View style={{flexDirection: 'row'}}>
          <Icon3 name="calendar" size={25} color="black" />
          <Text style={{left: 10, fontWeight: '400'}}>27/07/2022, 10h</Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Icon3 name="location" size={25} color="black" />
          <Text style={{left: 10, fontWeight: '400'}}>27/07/2022, 10h</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon2 name="my-location" size={25} color="black" />
          <Text style={{left: 10, fontWeight: '400'}}>27/07/2022, 10h</Text>
        </View>
      </View>

      <Text
        style={{
          fontWeight: '700',
          fontSize: 18,
          color: 'black',
          left: 22,
          marginVertical: 20,
        }}>
        Requests
      </Text>

      {/* Approve or disapprove button */}
      <View
        style={{flexDirection: 'row', paddingLeft: 15, alignItems: 'center'}}>
        <TouchableOpacity style={{right: 10}}>
          <Image
            source={require('../../assets/image/avatar.jpg')}
            style={{width: 50, height: 50, borderRadius: 30}}
          />
        </TouchableOpacity>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
            Nguyen Van A
          </Text>
          <Text styl e={{fontSize: 14}}>
            About a day before
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: color.green,
              borderRadius: 15,
              padding: 25,
              marginRight: 5,
            }}>
            <Icon4 name="check" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#FB6565', borderRadius: 15, padding: 25}}>
            <Icon4 name="close" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rejected button */}
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity style={{right: 10}}>
          <Image
            source={require('../../assets/image/avatar.jpg')}
            style={{width: 50, height: 50, borderRadius: 30}}
          />
        </TouchableOpacity>
        <View style={{marginTop: 5, marginRight:45}}>
          <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
            Nguyen Van A
          </Text>
          <Text styl e={{fontSize: 14}}>
            About a day before
          </Text> 
        </View>             
        <TouchableOpacity
          style={{backgroundColor: '#A1A1A1', borderRadius: 15, padding: 25}}>
          <Text style={{color:"white", fontWeight:""}}> Rejected</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Allrequest;

const styles = StyleSheet.create({});
