import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  PanResponder,
  Dimensions,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Entypo';

import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const BOTTOM_SHEET_MAX_HIGHT = Dimensions.get('window').height * 0.5;
const BOTTOM_SHEET_MIN_HIGHT = Dimensions.get('window').height * 0.1;

const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HIGHT - BOTTOM_SHEET_MAX_HIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

export default function AddPost({navigation, route}) {
  const user = auth().currentUser;
  const itemData = route.params.data;
  const id = route.params.id;
  const currentPos = useSelector(state => state.currentPosition);
  console.log('currentPos', currentPos);
  //Bottom sheet
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gestrure) => {
        animatedValue.setValue(gestrure.dy);
      },
      onPanResponderRelease: (e, gestrure) => {
        animatedValue.flattenOffset();
        if (gestrure.dy > 0) {
          if (gestrure.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          if (gestrure.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;
  const springAnimation = direction => {
    if (direction === 'up') {
      lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
    } else {
      lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
    }
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const [origin, setOrigin] = useState({
    latitude: currentPos.latitude,
    longitude: currentPos.longitude,
  });
  const [destination, setDestination] = useState({
    latitude: null,
    longitude: null,
  });
  const handleMap = data => {
    const place_id = data.place_id;
    //get langtitude and longitude from place_id
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=AIzaSyD0zidvGwC4jlQi1lLGhZ9JDb5QFx3zF2E`,
    )
      .then(response => response.json())
      .then(responseJson => {
        setDestination({
          latitude: responseJson.result.geometry.location.lat,
          longitude: responseJson.result.geometry.location.lng,
        });
        setDestinationName(data.description);
      });
  };
  const [name, setName] = useState('Loading...');
  const [destinationName, setDestinationName] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const currentname = async () => {
    springAnimation('up');
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin.latitude},${origin.longitude}&key=AIzaSyD0zidvGwC4jlQi1lLGhZ9JDb5QFx3zF2E`,
    )
      .then(response => response.json())
      .then(json => {
        setName(json.results[0].formatted_address);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const [isShowChooseLocation, setIsShowChooseLocation] = useState(true);
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(true);
  const [isShowIconBack, setIsShowIconBack] = useState(true);
  const [isChooseBike, setIsChooseBike] = useState(true);

  const [isChooseTip, setIsChooseTip] = useState(true);
  const [isChooseShare, setIsChooseShare] = useState(false);
  const [isChooseFree, setIsChooseFree] = useState(false);

  const [isExsistH, setIsExsistH] = useState(true);
  useEffect(() => {
    firestore()
      .collection('Feeds')
      .doc('FeedsHitch')
      .get()
      .then(documentSnapshot => {
        setIsExsistH(documentSnapshot.exists);
      });
  });
  const handleDoneHitch = () => {
    let data = {
      user: user.displayName,
      _useruid: auth().currentUser.uid,
      origin: origin,
      destination: destination,
      dateStart: itemData.dateStart,
      timeStart: itemData.timeStart,
      description: itemData.description,
      destinationName: destinationName,
      originName: name,
      comment: [],
    };
    if (isExsistH) {
      firestore()
        .collection('Feeds')
        .doc('FeedsHitch')
        .update({
          feeds: firestore.FieldValue.arrayUnion(data),
        })
        .then(() => {
          console.log('Post added!xxx');
        });
    } else {
      firestore()
        .collection('Feeds')
        .doc('FeedsHitch')
        .set({
          feeds: firestore.FieldValue.arrayUnion(data),
        })
        .then(() => {
          console.log('Post added!');
        });
    }
    navigation.navigate('Home');
  };

  const handleNext = () => {
    if (destinationName === '') {
      ToastAndroid.show('Please enter destination', ToastAndroid.SHORT);
    } else {
      setIsShowChooseLocation(false);
    }
  };
  const [isExsist, setIsExsist] = useState(true);
  useEffect(() => {
    firestore()
      .collection('Feeds')
      .doc('FeedsRider')
      .get()
      .then(documentSnapshot => {
        setIsExsist(documentSnapshot.exists);
      });
  });
  const handleDone = () => {
    let data = {
      user: user.displayName,
      _useruid: auth().currentUser.uid,
      origin: origin,
      destination: destination,
      dateStart: itemData.dateStart,
      timeStart: itemData.timeStart,
      description: itemData.description,
      vehicle: isChooseBike ? 'Bike' : 'Car',
      numPeople: isChooseBike ? 1 : numPeople,
      options: isChooseTip ? 'tip' : isChooseShare ? 'share' : 'free',
      destinationName: destinationName,
      originName: name,
      comment: [],
    };
    if (isExsist) {
      firestore()
        .collection('Feeds')
        .doc('FeedsRider')
        .update({
          feeds: firestore.FieldValue.arrayUnion(data),
        })
        .then(() => {
          console.log('Post added!xxx');
        });
    } else {
      firestore()
        .collection('Feeds')
        .doc('FeedsRider')
        .set({
          feeds: firestore.FieldValue.arrayUnion(data),
        })
        .then(() => {
          console.log('Post added!');
        });
    }
    navigation.navigate('Home');
  };
  const handleBack = () => {
    setIsShowChooseLocation(true);
  };

  return (
    currentname(),
    (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0722,
            longitudeDelta: 0.0121,
          }}>
          {destination.latitude && destination.longitude && (
            <View>
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey="AIzaSyD0zidvGwC4jlQi1lLGhZ9JDb5QFx3zF2E"
                strokeWidth={4}
                strokeColor="#097210"
              />
              <Marker coordinate={destination}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#F9C806',
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon2 name="ios-locate" size={20} color="white" />
                  </View>
                  <Image
                    source={require('../../assets/image/i.png')}
                    style={{width: 3, height: 15}}
                  />
                </View>
              </Marker>
            </View>
          )}
          <Marker
            coordinate={origin}
            onPress={() => {
              console.log('Marker pressed');
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#097210',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon2 name="ios-locate" size={20} color="white" />
              </View>
              <Image
                source={require('../../assets/image/i.png')}
                style={{width: 3, height: 15}}
              />
            </View>
          </Marker>
        </MapView>
        {isShowBottomSheet ? (
          <Animated.View style={[styles.buttomSheet, bottomSheetAnimation]}>
            <View style={styles.dragArea} {...panResponder.panHandlers}>
              <View style={styles.dragBar} />
            </View>
            {isShowChooseLocation ? (
              <View style={styles.buttomSheetContent}>
                <View style={styles.headerBottomsheet}>
                  <Text style={styles.textheaderButtomsheet}>
                    Add direction for your next ride
                  </Text>
                </View>
                <View style={styles.bodyButtonsheet}>
                  <View style={{paddingTop: 15}}>
                    <Text
                      style={{
                        color: '#097210',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      Destination
                    </Text>
                    <View style={styles.directionView}>
                      <Icon name="map-marker-alt" size={20} color="#097210" />
                      <Text style={styles.directionText}>
                        {destinationName === ''
                          ? 'Enter destination'
                          : destinationName}
                      </Text>
                    </View>
                  </View>
                  <View style={{paddingTop: 15}}>
                    <Text
                      style={{
                        color: '#097210',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      Starting point
                    </Text>
                    <View style={styles.directionView}>
                      <Icon2 name="ios-locate" size={20} color="#097210" />
                      <Text style={styles.directionText}>{name}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.btnNext}
                    onPress={() => {
                      id === 0 ? handleNext() : handleDoneHitch();
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {id === 0 ? 'Next' : 'Done'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.buttomSheetContent}>
                <TouchableOpacity
                  onPress={() => {
                    setIsChooseBike(true);
                  }}
                  style={{
                    width: '100%',
                    height: 70,
                    backgroundColor: isChooseBike ? '#097210' : 'white',
                  }}>
                  <View style={styles.viewBike}>
                    <Image
                      source={require('../../assets/image/bike.png')}
                      style={styles.imageBike}
                    />
                    <View style={styles.viewTextBike}>
                      <Text
                        style={{
                          color: isChooseBike ? 'white' : '#097210',
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}>
                        Bike
                      </Text>
                      <Icon3
                        name="account"
                        size={15}
                        color={isChooseBike ? 'white' : '#097210'}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: isChooseBike ? 'white' : '#097210',
                          }}>
                          {' '}
                          1 người
                        </Text>
                      </Icon3>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsChooseBike(false);
                  }}
                  style={{
                    width: '100%',
                    height: 70,
                    backgroundColor: isChooseBike ? 'white' : '#097210',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/image/car.png')}
                        style={styles.imageCar}
                      />
                      <View style={styles.viewTextCar}>
                        <Text
                          style={{
                            color: isChooseBike ? '#097210' : 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}>
                          Car
                        </Text>
                        <Icon3
                          name="account"
                          size={15}
                          color={isChooseBike ? '#097210' : 'white'}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: isChooseBike ? '#097210' : 'white',
                            }}>
                            {' '}
                            {numPeople} người
                          </Text>
                        </Icon3>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 30,
                      }}>
                      <Icon4
                        name="minus"
                        size={20}
                        color={isChooseBike ? '#097210' : 'white'}
                        onPress={() => {
                          if (numPeople > 1) {
                            setNumPeople(numPeople - 1);
                          }
                        }}
                      />
                      <View
                        style={{
                          width: 50,
                          height: 25,
                          borderWidth: 1,
                          borderColor: isChooseBike ? '#097210' : 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: isChooseBike ? 'black' : 'white',
                          }}>
                          {numPeople}
                        </Text>
                      </View>
                      <Icon4
                        name="plus"
                        size={20}
                        color={isChooseBike ? '#097210' : 'white'}
                        onPress={() => {
                          setNumPeople(numPeople + 1);
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{padding: 30}}>
                  <Text
                    style={{
                      color: '#097210',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Options
                  </Text>
                  <View style={styles.viewOption}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsChooseTip(!isChooseTip);
                        setIsChooseShare(false);
                        setIsChooseFree(false);
                      }}
                      style={[
                        styles.viewBtnOption,
                        {backgroundColor: isChooseTip ? '#097210' : 'gray'},
                      ]}>
                      <Text style={{color: 'white'}}>Tip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsChooseShare(!isChooseShare);
                        setIsChooseTip(false);
                        setIsChooseFree(false);
                      }}
                      style={[
                        styles.viewBtnOption,
                        {backgroundColor: isChooseShare ? '#097210' : 'gray'},
                      ]}>
                      <Text style={{color: 'white'}}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsChooseFree(!isChooseFree);
                        setIsChooseShare(false);
                        setIsChooseTip(false);
                      }}
                      style={[
                        styles.viewBtnOption,
                        {backgroundColor: isChooseFree ? '#097210' : 'gray'},
                      ]}>
                      <Text style={{color: 'white'}}>Free</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 20,
                    zIndex: 1,
                    marginTop: 20,
                    width: '85%',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.btnDone}
                    onPress={() => {
                      handleBack();
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      Back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnDone}
                    onPress={() => {
                      handleDone();
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>
        ) : (
          <></>
        )}
        <View
          style={{
            position: 'absolute',
            top: 20,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon
            name="angle-left"
            style={{marginRight: 10}}
            size={isShowIconBack ? 30 : 0}
            color="#097210"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data = null) => {
              handleMap(data);
            }}
            enablePoweredByContainer={false}
            textInputProps={{
              onFocus: () => {
                setIsShowBottomSheet(false);
                setIsShowIconBack(false);
              },
              onBlur: () => {
                setIsShowBottomSheet(true);
                setIsShowIconBack(true);
              },
              onChangeText: () => {
                if (isShowBottomSheet === false) {
                  setIsShowIconBack(false);
                }
              },
              onEndEditing: () => {
                setIsShowIconBack(true);
              },
            }}
            query={{
              key: 'AIzaSyD0zidvGwC4jlQi1lLGhZ9JDb5QFx3zF2E',
              language: 'vi',
            }}
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: 'black',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              loader: {
                backgroundColor: 'red',
              },
            }}
          />
        </View>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  viewBike: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  imageBike: {
    width: 42,
    height: 37,
    resizeMode: 'cover',
    marginLeft: 30,
  },
  imageCar: {
    width: 54,
    height: 21,
    resizeMode: 'cover',
    marginLeft: 30,
  },
  viewOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  viewBtnOption: {
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  viewTextBike: {
    marginLeft: 30,
  },
  viewTextCar: {
    marginLeft: 20,
  },
  textCar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttomSheet: {
    position: 'absolute',
    bottom: BOTTOM_SHEET_MIN_HIGHT - BOTTOM_SHEET_MAX_HIGHT,
    width: '100%',
    height: BOTTOM_SHEET_MAX_HIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dragArea: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  dragBar: {
    width: 100,
    height: 6,
    marginTop: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  buttomSheetContent: {
    flex: 1,
    marginTop: 30,
  },
  headerBottomsheet: {
    backgroundColor: '#6CC165',
    height: 70,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textheaderButtomsheet: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 180,
  },
  bodyButtonsheet: {
    flex: 1,
    paddingHorizontal: 20,
  },
  directionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#74728A',
    borderRadius: 15,
  },
  directionText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 10,
    paddingRight: 15,
    height: 35,
    textAlignVertical: 'center',
  },
  btnNext: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 150,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#097210',
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
  },
  btnDone: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#097210',
  },
});
