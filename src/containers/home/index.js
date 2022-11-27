import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import CurrentPosition from '../redux/CurrentPosition';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
export default function Home({navigation}) {
  //get current position
  const [getRider, setRider] = useState([]);
  const [getHitch, setHitch] = useState([]);
  useEffect(() => {
    firestore()
      .collection('Feeds')
      .doc('FeedsRider')
      .get()
      .then(documentSnapshot => {
        setRider(documentSnapshot.data().feeds);
      });
    firestore()
      .collection('Feeds')
      .doc('FeedsHitch')
      .get()
      .then(documentSnapshot => {
        setHitch(documentSnapshot.data().feeds);
      });
  }, []);

  const dispatch = useDispatch();
  const requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Hotel Booking App needs access to your location ' +
            'so you can see your current location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };
  const componentDidMount = () => {
    Geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        console.log(lat, long);
        dispatch(
          CurrentPosition.actions.addCurrentPosition({
            latitude: lat,
            longitude: long,
          }),
        );
      },
      // error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  useEffect(() => {
    componentDidMount();
  }, []);
  const [tab, setTab] = useState(0);
  const ListItemRider = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#6CC165',
            marginHorizontal: 10,
            padding: 10,
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', right: 10}}>
            <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 50, height: 50, borderRadius: 30,left:10}}
            />
            <View style={{marginLeft:20}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  Nguyen Van A
                </Text>
              </View>
              <Text>2 hour ago</Text>
            </View>
            <View></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: 190,top:10}}>
              Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien
              he 0123456789
            </Text>
            <View style={{left: 10,top:10}}>
              <View style={{flexDirection: 'row'}}>
                <Icon3 name="calendar" size={25} color="black" />
                <Text style={{width: 115, left: 5}}>27/07/2022</Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Icon3 name="location" size={25} color="black" />
                <Text style={{left: 5, width: 115}}>District 1, HCM City</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon2 name="my-location" size={25} color="black" />
                <Text style={{width: 115, left: 5}}>GO Supermarket, Thu Duc, HCM City</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const ListItemHitch = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#6CC165',
            marginHorizontal: 10,
            padding: 10,
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', right: 10}}>
            <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 50, height: 50, borderRadius: 30,left:10}}
            />
            <View style={{marginLeft:20}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  Nguyen Van A
                </Text>
              </View>
              <Text>2 hour ago</Text>
            </View>
            <View></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: 190,top:10}}>
              Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien
              he 0123456789
            </Text>
            <View style={{left: 10,top:10}}>
              <View style={{flexDirection: 'row'}}>
                <Icon3 name="calendar" size={25} color="black" />
                <Text style={{width: 115, left: 5}}>27/07/2022</Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Icon3 name="location" size={25} color="black" />
                <Text style={{left: 5, width: 115}}>District 1, HCM City</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon2 name="my-location" size={25} color="black" />
                <Text style={{width: 115, left: 5}}>GO Supermarket, Thu Duc, HCM City</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    requestLocation(),
    (
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
        {tab === 0 ? (
          <View>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View style={{height: 200}}>
                <Swiper
                  activeDot={
                    <View
                      style={{
                        backgroundColor: color.green,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                      }}
                    />
                  }
                  autoplay={true}
                  style={{
                    alignContent: 'center',
                    marginLeft: 25,
                    justifyContent: 'center',
                    marginTop: 40,
                    height: 170,
                  }}>
                  <View style={{height: 150, width: 348}}>
                    <Image
                      source={{uri: 'https://i.imgur.com/noRIECL.png'}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                  <View style={{height: 150, width: 348}}>
                    <Image
                      source={{uri: 'https://i.imgur.com/xXb186h.png'}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                  <View style={{height: 150, width: 348}}>
                    <Image
                      source={{uri: 'https://i.imgur.com/tPKSn8j.png'}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                </Swiper>
              </View>
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
                width: 350,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}>
                <TouchableOpacity
                  style={{alignItems: 'center', justifyContent: 'center'}}>
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
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: '700',
                    }}>
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
                  onPress={() => {
                    navigation.navigate('AddFeed', {id: 0});
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
                <TouchableOpacity
                  style={{alignItems: 'center', justifyContent: 'center'}}>
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
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: '700',
                    }}>
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
            <ScrollView style={{marginVertical: 10, height: 500}}>
              <FlatList
                data={getRider}
                renderItem={({item, index}) => <ListItemRider item={item} />}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <View style={{height: 200}}>
                <Swiper
                  activeDot={
                    <View
                      style={{
                        backgroundColor: color.green,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                      }}
                    />
                  }
                  autoplay={true}
                  style={{
                    alignContent: 'center',
                    marginLeft: 25,
                    justifyContent: 'center',
                    marginTop: 40,
                    height: 170,
                  }}>
                  <View style={{height: 150, width: 348}}>
                    <Image
                      source={{uri: 'https://i.imgur.com/VRhrkJM.png'}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                  <View style={{height: 150, width: 348}}>
                    <Image
                      source={{uri: 'https://i.imgur.com/xXb186h.png'}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                  <View style={{height: 150, width: 348}}>
                    <Image
                      source={{uri: 'https://i.imgur.com/tPKSn8j.png'}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                </Swiper>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
                marginVertical: 10,
                left: 15,
              }}>
              Find your front-seat buddy
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#FF5D53',
                borderRadius: 20,
                height: 65,
                marginHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('AddFeed', {id: 1});
              }}>
              <Image
                source={require('../../assets/image/feed.png')}
                style={{width: 30, height: 30, right: 10}}
              />
              <Text
                style={{
                  left: 10,
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Add new hitchhike
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
                marginVertical: 10,
                left: 15,
              }}>
              Incoming ride
            </Text>
            <ScrollView style={{marginVertical: 10}}>
              <FlatList
                data={getHitch}
                renderItem={({item, index}) => <ListItemHitch item={item} />}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        )}
      </View>
    )
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
});
