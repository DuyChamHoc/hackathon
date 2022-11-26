import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../global/styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import * as Animatable from 'react-native-animatable';
import {Formik} from 'formik';
import {SignInContext} from '../contexts/authContext';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {color} from '../assets/colors/color';

GoogleSignin.configure({
  webClientId:
    '98238674164-urf3dl5a63k4apui9ssd20qiaq0iial6.apps.googleusercontent.com',
});
export default function SignInScreen({navigation}) {
  const {dispatchSignedIn} = useContext(SignInContext);
  const [textinput2Fossued, setTextInput2Fossued] = useState(false);
  const textinput1 = useRef(1);
  const textinput2 = useRef(2);
  const [getemail, setemail] = useState('');
  const [getVisible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  async function signIn(data) {
    try {
      const {password, email} = data;
      const user = await auth().signInWithEmailAndPassword(email, password);
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: {userToken: 'User'},
        });
      }
    } catch (error) {
      Alert.alert(error.name, error.message);
    }
  }

  async function onGoogleButtonPress() {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: {userToken: 'User'},
        });
      }
    } catch (error) {
      Alert.alert(error.name, error.message);
    }
  }

  async function forgotPassword(Email) {
    if (Email) {
      firebase
        .auth()
        .sendPasswordResetEmail(Email)
        .then(function (user) {
          alert('Please check your email...');
        })
        .catch(function (e) {
          console.log(e);
        });
    } else {
      return;
    }
  }
  return (
    <>
      <View style={styles.container}>
        <Header title="LOGIN" type="arrow-left" navigation={navigation} />
        <View style={{marginLeft: 20, marginTop: 10}}></View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.text1}>Log in to your account</Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            signIn(values);
          }}>
          {props => (
            <View>
              <View style={{marginTop: 30}}>
                <View style={styles.textinput2}>
                  <Icon2 name="email" size={20} />
                  <TextInput
                    placeholder="Email"
                    ref={textinput1}
                    style={{
                      width: '90%',
                    }}
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.textinput2}>
                  <Animatable.View
                    animation={textinput2Fossued ? '' : 'fadeInLeft'}
                    duration={400}>
                    <Icon name="lock" size={20} />
                  </Animatable.View>
                  <TextInput
                    autoCapitalize="none"
                    style={{width: '76%'}}
                    placeholder="Password"
                    ref={textinput2}
                    onFocus={() => {
                      setTextInput2Fossued(false);
                    }}
                    onBlur={() => {
                      setTextInput2Fossued(true);
                    }}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                    secureTextEntry={getVisible ? false : true}
                  />
                  <Animatable.View
                    animation={textinput2Fossued ? '' : 'fadeInLeft'}
                    duration={400}>
                    <Icon3
                      name={getVisible ? 'visibility' : 'visibility-off'}
                      size={20}
                      style={{marginRight: 10}}
                      onPress={() => {
                        setVisible(!getVisible);
                      }}
                    />
                  </Animatable.View>
                </View>
              </View>

              <View style={{marginHorizontal: 20, marginTop: 30}}>
                <TouchableOpacity
                  style={styles.styledButton}
                  onPress={props.handleSubmit}>
                  <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={{alignItems: 'center', marginTop: 15}}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{...styles.text1, textDecorationLine: 'underline'}}>
              {' '}
              Forgot password ?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>OR</Text>
        </View>

        <View style={{marginHorizontal: 20, marginTop: 0}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CD201F',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              height: 50,
              paddingHorizontal: 20,
              width: '100%',
              marginBottom: 20,
              flexDirection: 'row',
            }}
            onPress={() => {
              onGoogleButtonPress();
            }}>
            <Icon4 name="google" size={30} style={{marginRight: 15}} />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{...styles.text1}}> No account ? </Text>
        </View>

        <View
          style={{alignItems: 'flex-end', marginHorizontal: 20, marginTop: 40}}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={styles.createButtonTittle}>Sign up</Text>
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
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Icon1
                  size={20}
                  name="close"
                  style={{marginLeft: 265, marginTop: -20}}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>Forgot password</Text>
              <Text style={styles.modalText1}>
                Enter your email. We will send you a link to reset your password
                export.
              </Text>
              <View>
                <TextInput
                  style={styles.textinput3}
                  placeholder="example@gmail.com  "
                  ref={textinput1}
                  autoCapitalize="none"
                  onChangeText={setemail}
                  value={getemail}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  forgotPassword(getemail);
                  setModalVisible(!modalVisible);
                }}
                style={{
                  alignContent: 'center',
                  borderRadius: 15,
                  height: 45,
                  width: 250,
                  backgroundColor: colors.blue,
                  marginLeft: 8,
                }}>
                <Text style={styles.buttonTitle}>Send Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textinput1: {
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput3: {
    width: 320,
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  textinput2: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: '#097210',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 30,
  },
  SocialIcon: {
    borderRadius: 12,
    height: 50,
  },
  createButton: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.primarygreen,
    height: 40,
    paddingHorizontal: 20,
  },
  createButtonTittle: {
    color: color.primarygreen,
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  styledButton: {
    backgroundColor: '#097210',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1db0e3',
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },

  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
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
  button: {
    width: 320,
    height: 50,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText1: {
    color: 'black',
    fontSize: 15,
    marginTop: -5,
    marginBottom: 15,
    textAlign: 'center',
  },
});
