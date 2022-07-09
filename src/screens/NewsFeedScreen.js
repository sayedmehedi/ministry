import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React from 'react';

import {baseURL} from '../../baseURL.json';
import Header from '../components/Header';
import Underline from '../components/Underline';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {NewsCard} from '../components/NewsFeed';
import {useGetBlogs} from '../hooks/newsfeed';

const NewsFeedScreen = ({navigation}) => {
  const {data, isLoading} = useGetBlogs();

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item) {
          navigation.navigate('newsFeedDetails', {
            id: item.id,
          });
        }
      }}>
      <NewsCard data={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: '#193441'}}>
            {' '}
            News Feed
          </Text>
          <Underline width={170} />
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsFeedScreen;
