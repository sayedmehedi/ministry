import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import Header from '../components/Header';
import Underline from '../components/Underline';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../providers/AuthProvider';
const SigninScreen = ({navigation}) => {
  const {login} = useAuth();
  const [isSubmitClick, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState({
    Email: '',
    Password: '',
  });
  //Mehedi@gmail.com
  const handleSignin = () => {
    setIsSubmit(true);
    setIsLoading(true);
    if (data.Email !== '' && data.Password !== '') {
      try {
        login(data.Email, data.Password);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log('error in getting order data : ', error);
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FCFCFC'}}>
      <Header />

      <ScrollView>
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
            Sign in to your account
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

          <TouchableOpacity
            onPress={handleSignin}
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
                  Sign In
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

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
              Don't have an account?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
              <Text style={{color: '#0077B6'}}> Sign Up here</Text>
            </TouchableOpacity>
          </View>

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
          <Text
            style={{
              color: '#193441',
              fontSize: 14,
              fontWeight: '300',
              marginVertical: 10,
              textDecorationLine: 'underline',
            }}>
            Forget your password?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 240,
    backgroundColor: '#FCFCFC',
    borderRadius: 20,
    padding: 12,
    shadowColor: 'rgba(0,0,0,0.2)',
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 20,
  },
  signinButton: {
    height: 40,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textErrorStyle: {
    color: 'red',
    fontSize: 10,
  },
});
