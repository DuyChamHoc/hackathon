import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {color} from '../../assets/colors/color';
import CustomHeader from '../../components/CustomHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import DatetimePicker from '@react-native-community/datetimepicker';
export default function AddFeed() {
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
      <CustomHeader />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: color.green1,
          left: 15,
          marginTop: 50,
        }}>
        Description
      </Text>
      <TextInput
        placeholder="Type your next schedule including notes about the next destination"
        style={{
          width: '95%',
          borderWidth: 1,
          borderColor: color.gray,
          height: 120,
          padding: 15,
          textAlignVertical: 'top',
          alignSelf: 'center',
          borderRadius: 15,
          marginVertical: 30,
        }}
        multiline={true}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: color.green1,
          left: 15,
        }}>
        Departure time
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={showDatepicker}>
        <Icon
          name="calendar"
          size={30}
          color="black"
          onPress={showDatepicker}
          style={{
            position: 'absolute',
            bottom: 45,
            justifyContent: 'flex-end',
            right: 0,
            marginRight: 25,
          }}
        />
        <TextInput
          placeholder="Your desparture time"
          selectTextOnFocus={false}
          editable={false}
          style={{
            width: '95%',
            borderWidth: 1,
            borderColor: color.gray,
            height: 50,
            padding: 15,
            alignSelf: 'center',
            borderRadius: 15,
            marginVertical: 30,
          }}
        />
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
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: color.green1,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          width: 150,
          borderRadius: 15,
          alignSelf: 'flex-end',
          right: 25,
        }}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
