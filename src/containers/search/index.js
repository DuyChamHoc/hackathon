import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import DatetimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
export default function SearchFeed({navigation}) {
  const [tab, setTab] = useState(0);  // 0: rider, 1: hitch
  const [vehicle, setVehicle] = useState('Bike');
  const [modavisible, setModavisible] = useState(false);
  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('date');
  const [show, setShow] = useState(false);
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setdate(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setmode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    const docname = (tab === 0) ? 'FeedsRider' : 'FeedsHitch'
    firestore().collection('Feeds').doc(docname).get().then(querySnapshot => {
      if (querySnapshot.exists) {
        const data= querySnapshot.data();
        setFeed(data.feeds);
      }
      setIsLoading(false);
    });
  }, [tab]);

  // useEffect(() => {
  //   const docname = (tab === 0) ? 'FeedsRider' : 'FeedsHitch'
  //   firestore().collection('Feeds').doc(docname).get().then(querySnapshot => {
  //     var data = []
  //     if (querySnapshot.exists) {
  //       querySnapshot.data().feeds.forEach(item => {
  //         firestore().collection('Users').doc(item._useruid).get().then(profileSnapshot => {
  //           if (profileSnapshot.exists) {
  //             data.push({...item, username: profileSnapshot.data().full_name})
  //           }
  //           else data.push({...item, username: ""})
  //         })
  //       })
  //       setFeed(data);
  //     }
  //     setIsLoading(false);
  //   });
  // }, [tab]);

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
    <View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        style={{
          height: 45,
          borderWidth: 1,
          marginHorizontal: 20,
          borderRadius: 10,
          marginVertical: 20,
          width: 300,
        }}
        placeholder="Search"
      />
      <Icon1
        name="search1"
        size={30}
        color={color.green}
        style={{position: 'absolute', right: 0, marginRight: 75}}
      />
      <Icon1
        name="filter"
        size={30}
        color={color.green}
        style={{right: 5}}
        onPress={() => setModavisible(!modavisible)}
      />
    </View>
    <Modal
      visible={modavisible}
      transparent={true}
      onRequestClose={() => setModavisible(!modavisible)}>
      <TouchableOpacity onPress={() => setModavisible(!modavisible)}>
        <View
          style={{
            backgroundColor: 'white',
            height: 330,
            borderRadius: 10,
            width: 260,
            alignSelf: 'flex-end',
            top: 140,
            right: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: 'black',
              left: 15,
              marginVertical: 15,
            }}>
            Filter
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor:
                  vehicle === 'Bike' ? color.green1 : 'white',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: color.green1,
                borderWidth: 1,
              }}
              onPress={() => {
                setVehicle('Bike');
              }}>
              <Text
                style={{
                  color: vehicle === 'Bike' ? 'white' : color.green1,
                }}>
                Bike
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor:
                  vehicle !== 'Bike' ? color.green1 : 'white',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                left: 5,
                Radius: 10,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: color.green1,
                borderWidth: 1,
              }}
              onPress={() => {
                setVehicle('Car');
              }}>
              <Text
                style={{
                  color: vehicle !== 'Bike' ? 'white' : color.green1,
                }}>
                Car
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity onPress={showDatepicker}>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  width: 220,
                  alignSelf: 'center',
                }}
                selectTextOnFocus={false}
                editable={false}
                placeholder="Time range"
              />
            </TouchableOpacity>
            {show && (
              <DatetimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginVertical: 10,
                  width: 220,
                  alignSelf: 'center',
                }}
                selectTextOnFocus={false}
                editable={false}
                placeholder="Start location"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  width: 220,
                  alignSelf: 'center',
                }}
                selectTextOnFocus={false}
                editable={false}
                placeholder="End location"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: color.green1,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              borderRadius: 15,
              alignSelf: 'center',
              marginTop: 25,
            }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
    {/* OVERHERE */}
    <ScrollView>
    {feed.map((item, index) => (
      <TouchableOpacity
      key={index}
      style={{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#6CC165',
        marginHorizontal: 10,
        padding: 10,
        marginTop: 5,
      }}
      onPress={()=>{
        navigation.navigate('DetailFeed',{item,tab});
      }}
      >
      <View style={{flexDirection: 'row', right: 10}}>
        <Image
          source={require('../../assets/image/avatar.jpg')}
          style={{width: 60, height: 60, borderRadius: 30, marginStart: 10}}
        />
        <View>
          <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
              {item.user}
            </Text>
          </View>
          <Text>{console.log(item)}</Text>
        </View>
        <View></View>
      </View>
      <View style={{flexDirection: 'row', marginStart: 10, marginTop: 10}}>
        <Text style={{width: 180}}>
          {item.description}
        </Text>
        <View style={{left: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Icon3 name="calendar" size={25} color="black" />
            <Text style={{width: 115, left: 5}}>{item.dateStart}</Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Icon3 name="location" size={25} color="black" />
            <Text numberOfLines={2} style={{left: 5, width: 115}}>{item.originName}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon2 name="my-location" size={25} color="black" />
            <Text numberOfLines={2} style={{width: 115, left: 5}}>
              {item.destinationName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    ))}
    </ScrollView>
    </View>
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