import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors, parameters} from '../global/styles';
import Swiper from 'react-native-swiper';
import {SignInContext} from '../contexts/authContext';
import auth from '@react-native-firebase/auth';
import {color} from '../assets/colors/color';

export default function SignInWelcomeScreen({navigation}) {
  const {dispatchSignedIn} = useContext(SignInContext);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: {userToken: 'signed-in'},
        });
      } else {
        dispatchSignedIn({type: 'UPDATE_SIGN_IN', payload: {userToken: null}});
      }
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 26,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 30,
            color: color.primarygreen,
          }}>
          GREENHITCH
        </Text>
      </View>
      <View style={{flex: 8, justifyContent: 'center', marginTop: 30}}>
        <Swiper autoplay={true} style={{marginTop: 5}}>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: 'https://t3.ftcdn.net/jpg/02/94/77/98/360_F_294779803_HfpHnLilMfD38zD8mHK0H7N2gbdBD9TK.jpg',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View style={styles.slide2}>
            <Image
              source={{
                uri: 'https://cdn.dribbble.com/users/221637/screenshots/12282529/rider_4x.gif?compress=1&resize=400x300',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View style={styles.slide3}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1315202286/vector/rider-motorbike-taxi-online-with-profile-rating-and-gps-symbol-set-cartoon-illustration.jpg?s=612x612&w=0&k=20&c=Cmm3iqz9Uy3xphFDQiDnOqciPYe9xOLLwjnwiKfe3no=',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <View style={styles.slide3}>
            <Image
              source={{
                uri: 'https://assets.grab.com/wp-content/uploads/sites/11/2019/08/01200400/Mother_Car.png',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </Swiper>
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 20,
            fontWeight: 'bold',
            color: color.primarygreenop,
            fontSize: 32,
          }}>
          Welcome!
        </Text>
        <Text style={{marginLeft: 30, fontSize: 20, color: colors.black}}>
          Create an account or log in
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          marginBottom: 20,
          marginTop: 60,
        }}>
        <View style={{marginHorizontal: 20, marginLeft: 12}}>
          <TouchableOpacity
            style={parameters.styledButton}
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <Text style={parameters.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20, marginLeft: 12}}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={styles.createButtonTittle}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  createButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1db0e3',
    height: 50,
    paddingHorizontal: 20,
    borderColor: color.primarygreenop,
    width: 300,
    marginLeft: 32,
    marginTop: 20,
  },
  createButtonTittle: {
    color: colors.grey1,
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
});
