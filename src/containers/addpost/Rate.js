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
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/FontAwesome';

import StarRating from 'react-native-star-rating';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const BOTTOM_SHEET_MAX_HIGHT = Dimensions.get('window').height * 0.5;
const BOTTOM_SHEET_MIN_HIGHT = Dimensions.get('window').height * 0.1;

const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HIGHT - BOTTOM_SHEET_MAX_HIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

export default function Rate({navigation}) {
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
    latitude: 10.8759637,
    longitude: 106.7990858,
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
        console.log(responseJson.result);
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

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(true);
  const [isShowIconBack, setIsShowIconBack] = useState(true);

  const handleNext = () => {
    if (destinationName === '') {
      ToastAndroid.show('Please enter destination', ToastAndroid.SHORT);
    } else {
      setIsShowChooseLocation(false);
    }
  };

  const [startRating, setStartRating] = useState({
    generalStarCount: 0,
    customStarCount: 0,
  });
  const onCustomStarRatingPress = rating => {
    setStartRating({
      ...startRating,
      customStarCount: rating,
    });
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

        <Animated.View style={[styles.buttomSheet, bottomSheetAnimation]}>
          <View style={styles.dragArea} {...panResponder.panHandlers}>
            <View style={styles.dragBar} />
          </View>
          <View style={styles.buttomSheetContent}>
            <View style={styles.headerBottomsheet}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assets/image/bike.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 20,
                    resizeMode: 'contain',
                  }}
                />
                <View style={{paddingHorizontal: 25}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Name
                  </Text>
                  <Text>Sdt</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    backgroundColor: '#097210',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon5 name="phone" size={22} color="white" />
                </View>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    backgroundColor: '#FEA805',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Icon4 name="message1" size={21} color="white" />
                </View>
              </View>
            </View>
            <View style={styles.bodyButtonsheet}>
              <View style={styles.viewRate}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  How was the rider
                </Text>
                <View style={styles.viewStar}>
                  <StarRating
                    disabled={false}
                    emptyStar="star-o"
                    fullStar="star"
                    halfStar="star-half-empty"
                    iconSet="FontAwesome"
                    maxStars={5}
                    rating={startRating.customStarCount}
                    selectedStar={rating => onCustomStarRatingPress(rating)}
                    fullStarColor="yellow"
                    halfStarColor="yellow"
                    emptyStarColor="yellow"
                    halfStarEnabled
                    starPadding={5}
                    starSize={30}
                    starStyle={{
                      padding: 5,
                      marginHorizontal: 5,
                      
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.btnNext}
                onPress={() => {
                  handleNext();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Finish Ride
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
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
    flexDirection: 'row',
    height: 70,
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textheaderButtomsheet: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 180,
  },
  bodyButtonsheet: {
    flex: 1,
  },
  viewRate: {
    width: '100%',
    height: 150,
    backgroundColor: '#097210',
    marginTop: 30,
    alignItems: 'center',
  },
  viewStar: {
    alignSelf: 'center',
    width: '70%',
    height: '50%',
    marginTop: 25,
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
