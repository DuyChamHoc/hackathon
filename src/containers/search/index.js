import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import DatetimePicker from '@react-native-community/datetimepicker';
export default function SearchFeed() {
  const [verhicale, setVerhicale] = useState('Bike');
  const [modavisible, setModavisible] = useState(false);
  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('date');
  const [show, setShow] = useState(false);
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
  return (
    <View>
      {/* //SEARCH */}
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
                    verhicale === 'Bike' ? color.green1 : 'white',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: color.green1,
                  borderWidth: 1,
                }}
                onPress={() => {
                  setVerhicale('Bike');
                }}>
                <Text
                  style={{
                    color: verhicale === 'Bike' ? 'white' : color.green1,
                  }}>
                  Bike
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    verhicale !== 'Bike' ? color.green1 : 'white',
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
                  setVerhicale('Car');
                }}>
                <Text
                  style={{
                    color: verhicale !== 'Bike' ? 'white' : color.green1,
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
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#6CC165',
          marginHorizontal: 10,
          padding: 10,
          marginTop: 5,
        }}>
        <View style={{flexDirection: 'row', right: 10}}>
          <Image
            source={require('../../assets/image/avatar.jpg')}
            style={{width: 60, height: 60, borderRadius: 30}}
          />
          <View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
                Nguyen Van A
              </Text>
            </View>
            <Text>2 hour ago</Text>
          </View>
          <View></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{width: 190}}>
            Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien
            he 0123456789
          </Text>
          <View style={{left: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon3 name="calendar" size={25} color="black" />
              <Text style={{width: 115, left: 5}}>27/07/2022, 10h</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <Icon3 name="location" size={25} color="black" />
              <Text style={{left: 5, width: 115}}>27/07/2022, 10h</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon2 name="my-location" size={25} color="black" />
              <Text style={{width: 115, left: 5}}>
                27/07/2022, 1dddddddddddddddddddddd
              </Text>
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
