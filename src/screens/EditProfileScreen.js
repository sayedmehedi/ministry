import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Underline from '../components/Underline';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';

const EditProfileScreen = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const [token, setToken] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [data, setData] = React.useState({
    Name: '',
    Email: '',
    Nib: '',
    Phone: '',
    DOB: '',
    Address: '',
  });
  useEffect(() => {
    getToken();
  }, [token]);
  const getToken = () => {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        setToken(value);
      }
    });
  };

  const handleSubmit = () => {
    const api = 'https://minister-app.com/api/user/profile';
    const body = {
      name: data.Name,
      email: data.Email,
      nib: data.Nib,
      phone: data.Phone,
      dob: data.DOB,
      address: data.Address,
    };
    try {
      axios
        .put(api, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res) {
            if (res.data) {
              navigation.goBack();
            }
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error in getting order data : ', error);
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const [fileToUpload = {uri, type, name}] = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });

      const api = 'https://minister-app.com/api/user/profile';

      var body = new FormData();
      body.append('_method', 'PUT');
      body.append('photo', fileToUpload);

      axios
        .post(api, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res) {
            setImagePreview(res.data.photo);
            console.log('res.data', res.data);
            //setIsLoading(false);
          }
        })
        .catch(error => console.log('error', error.response.data));
    } catch (err) {
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={'white'} />
          </TouchableOpacity>

          <Feather name="more-vertical" size={25} color={'#FFFFFF'} />
        </View>

        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={selectFile}>
            <Image
              source={
                !imagePreview
                  ? require('../assets/bg.png')
                  : {uri: imagePreview}
              }
              style={{height: 80, width: 80, borderRadius: 40}}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 27, fontWeight: 'bold', color: '#193441'}}>
          Edit Information
        </Text>
        <Underline width={210} />
      </View>

      <View style={{padding: 15}}>
        <Text
          style={{
            color: '#193441',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 8,
          }}>
          Name
        </Text>
        <TextInput
          // value={userInfo.name}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData({...data, Name: val})}
        />

        <Text
          style={{
            color: '#193441',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 8,
          }}>
          Email
        </Text>
        <TextInput
          //  value={userInfo.email}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData({...data, Email: val})}
        />

        <Text
          style={{
            color: '#193441',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 8,
          }}>
          NIB
        </Text>
        <TextInput
          // value={userInfo.nib}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData({...data, Nib: val})}
        />

        <Text
          style={{
            color: '#193441',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 8,
          }}>
          Phone
        </Text>
        <TextInput
          // value={userInfo.phone}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData({...data, Phone: val})}
        />

        <Text
          style={{
            color: '#193441',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 8,
          }}>
          Date of Birth
        </Text>
        <TextInput
          //  value={userInfo.dob}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData({...data, Phone: val})}
        />
        <Text
          style={{
            color: '#193441',
            fontSize: 14,
            fontWeight: '500',
            marginTop: 8,
          }}>
          Address
        </Text>
        <TextInput
          // value={userInfo.address}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData({...data, Address: val})}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <LinearGradient
          colors={['#11998E', '#0077B6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.submitButton}>
          <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '500'}}>
            Submit
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    height: 170,
    width: '100%',
    padding: 15,
  },
  submitButton: {
    height: 32,
    width: 240,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
