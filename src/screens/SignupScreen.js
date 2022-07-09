import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import Underline from '../components/Underline';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';

const SignupScreen = ({navigation}) => {
  const [singleFile, setSingleFile] = useState(null);
  const [isSubmitClick, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState({
    Name: '',
    Email: '',
    Address: '',
    Nib: '',
    Password: '',
  });

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    if (
      data.Name !== '' &&
      data.Email !== '' &&
      data.Address !== '' &&
      data.Password !== '' &&
      singleFile !== null
    ) {
      const [fileToUpload = {uri, type, name}] = singleFile;
      var body = new FormData();
      body.append('name', data.Name);
      body.append('email', data.Email);
      body.append('password', data.Password);
      body.append('address', data.Address);
      body.append('nib_photo', fileToUpload);

      const api = 'https://minister-app.com/api/user/signup';

      try {
        axios
          .post(api, body, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            if (res) {
              if (res.data.message == 'Signup successful') {
                navigation.goBack();
              }
              // console.log('res.data', res.data);
              setIsLoading(false);
            }
          })
          .catch(error => console.log('error', error.response.data));
      } catch (error) {
        setIsLoading(false);
        console.log('error in getting order data : ', error);
      }
    } else {
      setIsLoading(false);

      alert('Please Select File first');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FCFCFC'}}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            marginTop: 40,
          }}>
          <Text style={{fontSize: 25, fontWeight: '700', color: '#193441'}}>
            WELCOME
          </Text>
          <Underline width={150} />
          <Text
            style={{
              color: '#193441',
              fontSize: 16,
              fontWeight: '400',
              marginVertical: 10,
            }}>
            Create your account
          </Text>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            placeholderTextColor={'#193441'}
            onChangeText={val => setData({...data, Name: val})}
          />

          <Text style={styles.textErrorStyle}>
            {data.Name == '' && isSubmitClick
              ? 'Name is a required field'
              : null}
          </Text>

          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor={'#193441'}
            onChangeText={val => setData({...data, Email: val})}
          />
          <Text style={styles.textErrorStyle}>
            {data.Email == '' && isSubmitClick
              ? 'Email is a required field'
              : null}
          </Text>

          <TextInput
            placeholder="Home Address"
            style={styles.textInput}
            placeholderTextColor={'#193441'}
            onChangeText={val => setData({...data, Address: val})}
          />
          <Text style={styles.textErrorStyle}>
            {data.Address == '' && isSubmitClick
              ? 'Address is a required field'
              : null}
          </Text>
          <TouchableOpacity style={styles.nibButton} onPress={selectFile}>
            <Text>NIB</Text>
            <AntDesign name="camerao" size={22} color={'#193441'} />
          </TouchableOpacity>

          <TextInput
            secureTextEntry
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor={'#193441'}
            onChangeText={val => setData({...data, Password: val})}
          />
          <Text style={styles.textErrorStyle}>
            {data.Password == '' && isSubmitClick
              ? 'Password is a required field'
              : null}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#0077B6',
                height: 22,
                width: 22,
                borderRadius: 5,
              }}></View>

            <Text
              style={{
                color: '#0077B6',
                fontSize: 14,
                fontWeight: '300',
                marginVertical: 10,
                textDecorationLine: 'underline',
              }}>
              {' '}
              Accept Terms & Conditions
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: '#193441',
                fontSize: 14,
                fontWeight: '300',
                marginVertical: 10,
                textDecorationLine: 'underline',
              }}>
              {' '}
              Already had an account?
            </Text>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{color: '#0077B6'}}> Sign In here</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            style={{width: 240, marginVertical: 10}}>
            <LinearGradient
              colors={['#11998E', '#0077B6']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.signinButton}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text
                  style={{color: '#FFFFFF', fontSize: 16, fontWeight: '500'}}>
                  Sign Up
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text
            style={{
              color: '#0077B6',
              fontSize: 14,
              fontWeight: '300',
              marginVertical: 10,
            }}>
            Or Sign in With
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
              padding: 20,
            }}>
            <Image
              source={require('../assets/facebook.png')}
              style={{height: 30, width: 30}}
            />

            <Image
              source={require('../assets/google.png')}
              style={{height: 30, width: 30}}
            />
            <Image
              source={require('../assets/twitter.png')}
              style={{height: 30, width: 30}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 240,
    backgroundColor: '#FCFCFC',
    borderRadius: 20,
    padding: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 22,
  },
  signinButton: {
    height: 40,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  nibButton: {
    height: 40,
    width: 240,
    backgroundColor: '#FCFCFC',
    borderRadius: 20,

    shadowColor: 'rgba(0,0,0,0.2)',
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    padding: 5,
  },
  textErrorStyle: {
    color: 'red',
    fontSize: 10,
  },
});
