import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

import Header from '../components/Header';
import Underline from '../components/Underline';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
const NewsFeedScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 27, fontWeight: 'bold', color: '#193441'}}>
              {' '}
              News Feed
            </Text>
            <Underline width={170} />
          </View>

          <View style={styles.personalProfileCard}>
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="newspaper-variant-outline"
                  size={18}
                  color={'#0077B6'}
                />
                <Text style={{marginLeft: 10, fontSize: 18, fontWeight: '200'}}>
                  Latest News
                </Text>
                <Text style={{marginLeft: 10, fontSize: 18, fontWeight: '200'}}>
                  Friday, May 27, 2022
                </Text>
              </View>
              <Text
                numberOfLines={4}
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

            <View
              style={{
                padding: 15,
                justifyContent: 'space-between',
                flexDirection: 'column',
                flex: 1,
              }}>
              <Text
                style={{
                  color: '#193441',
                  fontSize: 18,
                  fontWeight: '500',
                  marginTop: 5,
                }}>
                dfkd sdfsdlkfsjfs sdfsdf sdfkf dfsd fsdfs dfs dfs sdfdfsskj
                sdfsdf sdfsd fdskf sdf fsdfsdf sdf fsdfkjsadfjsdf sdfkjsdkfdfjs
                sdfsdf sdlkfjf sdfsdkfsd f dfsdfksjdf{' '}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '40%',
                    justifyContent: 'space-between',
                  }}>
                  <AntDesign name="like1" size={18} color={'#0077B6'} />
                  <Text>1000</Text>

                  <Foundation name="comment" size={18} color={'#0077B6'} />
                  <Text>1000</Text>
                </View>
                <Entypo name="share" size={18} color={'#0077B6'} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsFeedScreen;
const styles = StyleSheet.create({
  personalProfileCard: {
    width: '100%',
    height: 450,
    backgroundColor: '#FFFEF8',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 10,
  },
});
