import axios from 'axios';
import React, {useState} from 'react';
import Underline from '../components/Underline';
import {useAuth} from '../providers/AuthProvider';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const EditProfileScreen = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const {refreshAuthProfileData} = useAuth();
  const [imagePreview, setImagePreview] = useState('');

  const [data, setData] = React.useState({
    dob: '',
    nib: '',
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  React.useEffect(() => {
    setData(prevData => ({
      ...prevData,
      name: userInfo?.name ?? '',
      email: userInfo?.email ?? '',
      nib: userInfo?.nib ?? '',
      phone: userInfo?.phone ?? '',
      dob: userInfo?.dob ?? '',
      address: userInfo?.address ?? '',
    }));

    setImagePreview(userInfo?.photo ?? '');
  }, [userInfo]);

  const handleSubmit = () => {
    const api = 'https://minister-app.com/api/user/profile';
    const body = Object.entries(data).reduce((acc, [key, val]) => {
      if (!!val) {
        acc[key] = val;
      }
      return acc;
    }, {});

    try {
      axios
        .put(api, body)
        .then(() => {
          console.log('edited profile with data', data);
          return refreshAuthProfileData();
        })
        .then(() => {
          navigation.goBack();
        })
        .catch(error => console.log('error', error.response));
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

      const body = new FormData();
      body.append('_method', 'PUT');
      body.append('photo', fileToUpload);

      axios
        .postForm(api, body)
        .then(() => {
          refreshAuthProfileData();
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

      <ScrollView style={{padding: 15}}>
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
          value={data.name}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData(prev => ({...prev, name: val}))}
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
          value={data.email}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData(prev => ({...prev, email: val}))}
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
          value={data.nib}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData(prev => ({...prev, nib: val}))}
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
          value={data.phone}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData(prev => ({...prev, phone: val}))}
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
          value={data.dob}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          placeholderText={'eg: Dec 01, 1996'}
          onChangeText={val => setData(prev => ({...prev, dob: val}))}
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
          value={data.address}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: 'rgba(25,52,65,0.5)',
            paddingVertical: 4,
          }}
          onChangeText={val => setData(prev => ({...prev, address: val}))}
        />
      </ScrollView>
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
