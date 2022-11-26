import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {color} from '../../assets/colors/color';
import CustomHeader from '../../components/CustomHeader';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import DatetimePicker from '@react-native-community/datetimepicker';
export default function AddFeed({navigation, route}) {
  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('date');
  const [show, setShow] = useState(false);
  const id = route.params.id;
  const [description, setdescription] = useState('');
  const [dateShow, setdateShow] = useState('');
  const [timeShow, settimeShow] = useState('');
  const formatDayShow = day => {
    if (day != '') {
      return (
        Number(day.split('-')[2]) +
        ' tháng ' +
        day.split('-')[1] +
        ' năm ' +
        day.split('-')[0]
      );
    }
    return '';
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    //get the next day
    let nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setdate(nextDay);

    const temp = nextDay.toISOString().split('T')[0];
    setdateShow(formatDayShow(temp));
  };
  const onChangeTime = (event, selectedTime) => {
    setShow(false);
    settimeShow(selectedTime.toLocaleTimeString());
  };
  const showMode = currentMode => {
    setShow(true);
    setmode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View>
      <CustomHeader id={id} />
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
        value={description}
        onChangeText={text => setdescription(text)}
        onEndEditing={() => Keyboard.dismiss()}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: color.green1,
          left: 15,
        }}>
        Departure date
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
          placeholder="Your desparture date"
          selectTextOnFocus={false}
          editable={false}
          value={dateShow}
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
            onChange={mode === 'date' ? onChange : onChangeTime}
          />
        )}
      </TouchableOpacity>
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
        onPress={showTimepicker}>
        <Icon1
          name="clock"
          size={30}
          color="black"
          onPress={showTimepicker}
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
          value={timeShow}
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const data = {
            description: description,
            dateStart: date,
            timeStart: timeShow,
          };
          navigation.navigate('AddPost', {data: data, id: id});
        }}
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
