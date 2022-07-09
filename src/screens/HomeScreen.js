import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

import Header from '../components/Header';
import Underline from '../components/Underline';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{flex: 1}}>
          <ImageBackground
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              height: 400,
              width: '100%',
            }}
            source={require('../assets/bg.png')}>
            <View
              style={{
                height: 160,
                width: 290,
                backgroundColor: 'rgba(5,117,230,0.5)',
                justifyContent: 'center',
                paddingLeft: 5,
              }}>
              <View
                style={{
                  height: 2,
                  width: '80%',
                  backgroundColor: '#FCFCFC',
                  marginVertical: 3,
                }}
              />
              <Text style={{fontSize: 26, fontWeight: '300', color: 'white'}}>
                Welcome, I'm
              </Text>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>
                Hon.JoBeth L. Coleby-Devis
              </Text>

              <View
                style={{
                  height: 2,
                  width: '80%',
                  backgroundColor: '#FCFCFC',
                  marginVertical: 3,
                }}
              />
              <Text style={{fontSize: 18, fontWeight: '300', color: 'white'}}>
                Minister of Transport and Housing
              </Text>
            </View>
          </ImageBackground>
          {/* about */}

          <View style={{padding: 10}}>
            <Text style={{fontSize: 27, fontWeight: 'bold', color: '#193441'}}>
              About
            </Text>
            <Underline width={90} />

            <Text
              style={{
                color: '#193441',
                fontSize: 16,
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              Name: Hon. JoBeth L. Coleby-Devis
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(25,52,65,0.5)',
              }}
            />
            <Text
              style={{
                color: '#193441',
                fontSize: 16,
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              Email: info@dobahmas.com
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(25,52,65,0.5)',
              }}
            />
            <Text
              style={{
                color: '#193441',
                fontSize: 16,
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              Phone: +880123456789
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(25,52,65,0.5)',
              }}
            />
            <Text
              style={{
                color: '#193441',
                fontSize: 16,
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              Date of Birth: 2nd Octor,1980
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(25,52,65,0.5)',
              }}
            />

            <Text
              style={{
                color: '#193441',
                fontSize: 16,
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              Adress: Charlotte House, Charalotte Street, P.P.Box N275 Nassau,
              N.P. The Bahamas
            </Text>
          </View>
          {/* personal portfolio */}
          <View style={{padding: 10}}>
            <Text style={{fontSize: 27, fontWeight: 'bold', color: '#193441'}}>
              PERSONAL PROFILE
            </Text>
            <Underline width={270} />
          </View>

          <View style={styles.personalProfileCard}>
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="book-outline" size={18} color={'#0077B6'} />
                <Text style={{marginLeft: 10, fontSize: 18, fontWeight: '200'}}>
                  Story
                </Text>
              </View>
              <Text
                style={{
                  color: '#193441',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Lorem inpsum dolor sit amet, consec tetradipisc ingelit.
              </Text>
            </View>

            <Image
              source={require('../assets/bg.png')}
              style={{width: '100%', height: 200}}
            />

            <View style={{padding: 15}}>
              <Text
                style={{
                  color: '#193441',
                  fontSize: 18,
                  fontWeight: '500',
                  marginTop: 5,
                }}>
                dfkd sdfsdlkfsjfs sdfsdf sdfkf dfsd fsdfs dfs dfs sdfdfsskj
                sdfsdf sdfsd fdskf sdf fsdfsdf sdf
                <Text
                  style={{color: '#0077B6', fontSize: 18, fontWeight: 'bold'}}>
                  {' '}
                  Read More...
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  personalProfileCard: {
    width: '100%',
    height: 400,
    backgroundColor: '#FFFEF8',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 10,
  },
});
