import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../global/styles';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DatetimePicker from '@react-native-community/datetimepicker';
// import HomeHeader from '../components/HomeHeader';
import ImagePicker from 'react-native-image-crop-picker';
import {firebase} from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {Avatar} from 'react-native-paper';
import {SignInContext} from '../../contexts/authContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '98238674164-urf3dl5a63k4apui9ssd20qiaq0iial6.apps.googleusercontent.com',
});
export default function MyAccountScreen({navigation}) {
  const {dispatchSignedIn} = useContext(SignInContext);
  const [selectedValue, setSelectedValue] = useState('');
  const [fullname, setfullname] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [date, setdate] = useState('');
  const [sex, setsex] = useState('');
  const [fullname1, setfullname1] = useState('');
  const [phonenumber1, setphonenumber1] = useState('');
  const [address1, setaddress1] = useState('');
  const [sex1, setsex1] = useState('');
  const [date1, setdate1] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [datetime, setdatetime] = useState(new Date());
  const [mode, setmode] = useState('date');
  const [show, setShow] = useState(false);
  const user = auth().currentUser;
  const [getorder, setorder] = useState(0);
  const [getcomplete, setcomplete] = useState(0);
  const [getnum, setnum] = useState(0);
  var count = 0;

  const showMode = currentMode => {
    setShow(true);
    setmode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const createuser = () => {
    setModalVisible(true);
    count = 0;
    setnum(Math.random());
  };

  const formattedDate =
    datetime.getDate() +
    '/' +
    (datetime.getMonth() + 1) +
    '/' +
    datetime.getFullYear();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setdatetime(currentDate);
    setdate1(
      currentDate.getDate() +
        '/' +
        (currentDate.getMonth() + 1) +
        '/' +
        currentDate.getFullYear(),
    );
  };

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setfullname(documentSnapshot.data().full_name);
          setphonenumber(documentSnapshot.data().phone_number);
          setdate(documentSnapshot.data().datetime);
          setsex(documentSnapshot.data().sex);
          setaddress(documentSnapshot.data().address);
          setSelectedValue(documentSnapshot.data().sex);
        }
      });
    if (count == 0) {
      count = 1;
      setfullname1(fullname);
      setphonenumber1(phonenumber);
      setdate1(date);
      setsex1(sex);
      setaddress1(address);
    }
  }, [getnum]);

  const update = () => {
    firestore()
      .collection('Users')
      .doc(user.uid)
      .set({
        phone_number: phonenumber1,
        full_name: fullname1,
        datetime: formattedDate,
        sex: sex1,
        address: address1,
        roll: 3,
      })
      .then(() => {
        console.log('User added!');
        setnum(Math.random());
      });
    setModalVisible(!modalVisible);
    setfullname1('');
    setdatetime(new Date());
    setsex1('');
    setphonenumber1('');
    setaddress1('');
  };

  async function getCurrentImage() {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      firebase.auth().currentUser.updateProfile({photoURL: image.path});
      setTimeout(() => {
        setnum(Math.random());
      }, 1500);
      setnum(Math.random());
    });
    setnum(Math.random());
  }

  async function logout() {
    try {
      auth()
        .signOut()
        .then(() => {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          dispatchSignedIn({
            type: 'UPDATE_SIGN_IN',
            payload: {userToken: null},
          });
        });
    } catch (errot) {
      Alert.alert(error.name, error.message);
    }
  }
  return (
    <View style={styles.container}>
      {/* <HomeHeader navigation={navigation} title={Tài khoản} /> */}
      <ScrollView>
        <View style={{backgroundColor: colors.backgroundColor}}>
          <View style={styles.avatarView}>
            <Avatar.Image
              size={100}
              source={{
                uri: user.photoURL
                  ? user.photoURL
                  : 'https://i.ytimg.com/vi/jH7e1fDcZnY/maxresdefault.jpg',
              }}
            />
            <View style={{marginLeft: 90, marginTop: -20}}>
              <Icon2
                size={40}
                name="camera"
                onPress={() => {
                  getCurrentImage();
                }}
                style={{color: colors.text}}
              />
            </View>
            <Text style={{color: colors.text, fontSize: 20}}>
              {user.displayName ? user.displayName : fullname}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                firestore()
                  .collection('order' + user.uid)
                  .onSnapshot(snapshot => {});
                navigation.navigate('MyOrderComplete');
              }}
              style={styles.viewItem}>
              <Image
                source={require('../../global/image/doc.png')}
                style={{
                  height: '100%',
                  width: '25%',
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
              <View style={{justifyContent: 'center', marginEnd: 5}}>
                <Text style={{color: colors.text}}>{getorder}</Text>
                <Text style={{color: colors.text}}>Đơn đang xử lý</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewItem}
              onPress={() => navigation.navigate('MyLastOrder')}>
              <Image
                source={require('../../global/image/history_cart.png')}
                style={{
                  height: '100%',
                  width: '25%',
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
              <View style={{justifyContent: 'center', marginEnd: 5}}>
                <Text style={{color: colors.text}}>{getcomplete}</Text>
                <Text style={{color: colors.text}}>Đơn đã mua</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.backgroundColor,
            width: '100%',
            height: '45%',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <Text
              style={{color: colors.text, fontSize: 17, fontWeight: 'bold'}}>
              Thông tin cá nhân
            </Text>
            <TouchableOpacity onPress={createuser}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'red'}}>
                Sửa
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 35,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  backgroundColor: colors.background,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Icon1
                    size={20}
                    name="close"
                    style={{
                      marginLeft: 265,
                      marginTop: -20,
                      color: colors.text,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                  }}>
                  Cập nhật thông tin
                </Text>
                <View style={{marginTop: 15}}>
                  <TextInput
                    style={{
                      width: 320,
                      borderWidth: 1,
                      borderColor: '#86939e',
                      marginHorizontal: 20,
                      borderRadius: 12,
                      marginBottom: 20,
                      paddingHorizontal: 10,
                      color: colors.text,
                    }}
                    placeholder="Full Name"
                    value={fullname1}
                    onChangeText={txt => setfullname1(txt)}
                  />
                  <TextInput
                    style={{
                      width: 320,
                      borderWidth: 1,
                      borderColor: '#86939e',
                      marginHorizontal: 20,
                      borderRadius: 12,
                      marginBottom: 20,
                      paddingHorizontal: 10,
                      color: colors.text,
                    }}
                    placeholder="Phone Number"
                    value={phonenumber1}
                    onChangeText={txt => setphonenumber1(txt)}
                  />
                  <View style={{width: 320, flexDirection: 'row'}}>
                    <TextInput
                      style={{
                        width: 150,
                        borderWidth: 1,
                        borderColor: '#86939e',
                        marginHorizontal: 20,
                        borderRadius: 12,
                        marginBottom: 2,
                        paddingHorizontal: 10,
                        color: colors.text,
                      }}
                      placeholder="Date of Birth"
                      value={date1}
                      onChangeText={txt => setdate1(txt)}
                    />
                    <Icon
                      size={30}
                      name="calendar"
                      style={{
                        marginLeft: 10,
                        marginTop: 10,
                        color: colors.text,
                      }}
                      onPress={showDatepicker}
                    />
                    {show && (
                      <DatetimePicker
                        testID="dateTimePicker"
                        value={datetime}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: 150,
                      borderWidth: 1,
                      borderColor: '#86939e',
                      marginHorizontal: 20,
                      borderRadius: 12,
                      marginBottom: 20,
                      marginTop: 20,
                      paddingHorizontal: 5,
                      justifyContent: 'center',
                    }}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{
                        color: colors.text,
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue);
                        setsex1(itemValue);
                      }}>
                      <Picker.Item label="Nam" value="Nam" />
                      <Picker.Item label="Nữ" value="Nữ" />
                    </Picker>
                  </View>
                  <TextInput
                    style={{
                      width: 320,
                      borderWidth: 1,
                      borderColor: '#86939e',
                      marginHorizontal: 20,
                      borderRadius: 12,
                      marginBottom: 20,
                      paddingHorizontal: 10,
                      color: colors.text,
                    }}
                    placeholder="Address"
                    value={address1}
                    onChangeText={txt => setaddress1(txt)}
                  />
                </View>
                <TouchableOpacity
                  onPress={update}
                  style={{
                    alignContent: 'center',
                    borderRadius: 20,
                    height: 45,
                    width: 250,
                    backgroundColor: 'blue',
                    marginLeft: 8,
                  }}>
                  <Text style={styles.buttonTitle}>Lưu thông tin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View>
            <View style={styles.viewInfo}>
              <Image
                source={{
                  uri: 'https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/38-256.png',
                }}
                style={{height: 30, width: 30, marginLeft: 20, marginTop: 5}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  marginEnd: 5,
                  marginLeft: 10,
                }}>
                <Text style={{color: colors.text}}>Tên người dùng</Text>
                <Text style={{color: colors.text, marginTop: 5}}>
                  {fullname}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.viewInfo}>
              <Image
                source={{
                  uri: 'https://cdn3.iconfinder.com/data/icons/blue-line-interface/64/contact-256.png',
                }}
                style={{height: 30, width: 30, marginLeft: 20, marginTop: 5}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  marginEnd: 5,
                  marginLeft: 10,
                }}>
                <Text style={{color: colors.text}}>Số điện thoại</Text>
                <Text style={{color: colors.text, marginTop: 5}}>
                  {phonenumber}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.viewInfo}>
              <Image
                source={{
                  uri: 'https://cdn4.iconfinder.com/data/icons/aircraft-blue-line/64/165_schedule-calendar-date-256.png',
                }}
                style={{height: 30, width: 30, marginLeft: 20, marginTop: 5}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  marginEnd: 5,
                  marginLeft: 10,
                }}>
                <Text style={{color: colors.text}}>Ngày sinh</Text>
                <Text style={{color: colors.text, marginTop: 5}}>{date}</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.viewInfo}>
              <Image
                source={{
                  uri: 'https://cdn4.iconfinder.com/data/icons/lgbt-6/64/bigender-sex-gender-shapes-256.png',
                }}
                style={{height: 30, width: 30, marginLeft: 20, marginTop: 5}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  marginEnd: 5,
                  marginLeft: 10,
                }}>
                <Text style={{color: colors.text}}>Giới tính</Text>
                <Text style={{color: colors.text, marginTop: 5}}>{sex}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.address}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: colors.text,
                marginLeft: 15,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Địa chỉ
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Image
              source={{
                uri: 'https://cdn4.iconfinder.com/data/icons/universal-7/614/17_-_Location-256.png',
              }}
              style={{height: 30, width: 30, marginLeft: 20, marginTop: 5}}
            />
            <View style={{width: '85%', marginLeft: 5}}>
              <Text style={{fontSize: 16, color: colors.text}}>{address}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={logout}
            style={{
              height: '25%',
              width: '40%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              borderWidth: 1,
            }}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarView: {
    alignItems: 'center',
    marginTop: 20,
  },
  styleImgItem: {
    height: '65%',
    marginLeft: 10,
    resizeMode: 'contain',
    marginTop: 10,
  },
  viewItem: {
    backgroundColor: colors.backgroundColor,
    height: 50,
    width: '48%',
    borderRadius: 5,
    paddingHorizontal: 10,
    shadowRadius: 2,
    flexDirection: 'row',
    borderWidth: 1,
  },
  viewInfo: {
    flexDirection: 'row',
    marginTop: 20,
    alignContent: 'center',
  },
  address: {
    backgroundColor: colors.backgroundColor,
    marginTop: 10,
    width: '100%',
    height: 170,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textinput3: {
    width: 320,
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
