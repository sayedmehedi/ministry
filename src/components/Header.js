import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {useAuth} from '../providers/AuthProvider';

const Header = () => {
  const {logout} = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <LinearGradient
        colors={['#11998E', '#0077B6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: 70,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
          Hon. JoBeth L.Coleby-Devis
        </Text>
        <TouchableOpacity onPress={logout}>
          <Feather name="more-vertical" size={25} color={'#FFFFFF'} />
        </TouchableOpacity>
      </LinearGradient>

      {showMenu && (
        <View
          style={{
            height: 400,
            width: 200,
            backgroundColor: '#0077B6',
            position: 'absolute',
            zIndex: 10000,
            alignSelf: 'flex-end',
            top: 70,
            alignItems: 'flex-end',
            padding: 15,
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: '#FFFFFF',
              fontSize: 18,
              paddingVertical: 10,
            }}>
            ABOUT
          </Text>
          <View style={{height: 1, width: '80%', backgroundColor: '#395185'}} />
          <Text
            style={{
              fontWeight: '500',
              color: '#FFFFFF',
              fontSize: 18,
              paddingVertical: 10,
            }}>
            BLOG POST
          </Text>
          <View style={{height: 1, width: '80%', backgroundColor: '#395185'}} />
          <Text
            style={{
              fontWeight: '500',
              color: '#FFFFFF',
              fontSize: 18,
              paddingVertical: 10,
            }}>
            UPDATE NEWS
          </Text>
          <View style={{height: 1, width: '80%', backgroundColor: '#395185'}} />
          <Text
            style={{
              fontWeight: '500',
              color: '#FFFFFF',
              fontSize: 18,
              paddingVertical: 10,
            }}>
            PORTFOLIO
          </Text>
        </View>
      )}
    </>
  );
};

export default Header;
