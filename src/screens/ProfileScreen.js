import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Underline from '../components/Underline';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const api = 'https://minister-app.com/api/user/profile';
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data.name);
        setUserInfo(res.data);
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  }, [token]);
  useEffect(() => {
    getToken();
  }, [token]);
  const getToken = () => {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        setToken(value);
      }
      console.log('meehdi', value);
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#11998E', '#0077B6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.profileHeader}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 8,
          }}>
          <Ionicons name="chevron-back" size={25} color={'white'} />

          <Feather name="more-vertical" size={25} color={'#FFFFFF'} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 25,
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../assets/bg.png')}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
          <View>
            {!isLoading ? (
              <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: '500'}}>
                {userInfo.name}
              </Text>
            ) : (
              <Text>Test</Text>
            )}

            <Text style={{fontWeight: '300', fontSize: 16, color: '#FFFFFF'}}>
              User
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('editProfile', {userInfo: userInfo})
            }>
            <FontAwesome name="edit" size={22} color={'white'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 27, fontWeight: 'bold', color: '#193441'}}>
          Personal Information
        </Text>
        <Underline width={270} />
      </View>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'green'} />
      ) : (
        <View style={{padding: 15}}>
          <Text
            style={{
              color: '#193441',
              fontWeight: '500',
              fontSize: 18,
              paddingVertical: 4,
            }}>
            Email: {userInfo.email}
          </Text>
          <Text
            style={{
              color: '#193441',
              fontWeight: '500',
              fontSize: 18,
              paddingVertical: 4,
            }}>
            NID: {userInfo.nib}
          </Text>
          <Text
            style={{
              color: '#193441',
              fontWeight: '500',
              fontSize: 18,
              paddingVertical: 4,
            }}>
            Phone: {userInfo.phone}
          </Text>
          <Text
            style={{
              color: '#193441',
              fontWeight: '500',
              fontSize: 18,
              paddingVertical: 4,
            }}>
            Date of Birth: 2{userInfo.dob}
          </Text>
          <Text
            style={{
              color: '#193441',
              fontWeight: '500',
              fontSize: 18,
              paddingVertical: 4,
            }}>
            Address: {userInfo.address}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    height: 110,
    width: '100%',
    padding: 15,
  },
});
