import React from 'react';
import Header from '../components/Header';
import {useGetBlogs} from '../hooks/newsfeed';
import {NewsCard} from '../components/NewsFeed';
import Underline from '../components/Underline';
import {View, Text, SafeAreaView} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const NewsFeedScreen = ({navigation}) => {
  const {data, isLoading, refetch} = useGetBlogs();

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item) {
          navigation.navigate('newsFeedDetails', {
            id: item.id,
          });
        }
      }}>
      <NewsCard data={item} onReacted={refetch} />
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

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsFeedScreen;
