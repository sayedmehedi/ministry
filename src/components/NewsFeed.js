import React,{useEffect,useState} from 'react';
import {useGetBlogDetails} from '../hooks/newsfeed';
import {View, Text, StyleSheet, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const NewsCard = ({data,onReacted}) => {

  
  return (
    <View style={styles.personalProfileCard}>
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="newspaper-variant-outline"
            size={18}
            color={'#0077B6'}
          />
          <Text style={{marginLeft: 10, fontSize: 18, fontWeight: '200'}}>
            Latest news
          </Text>
          <Text style={{marginLeft: 10, fontSize: 18, fontWeight: '200'}}>
            {data ? new Date(data.created_at).toLocaleDateString() : ''}
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
          {data?.subject}
        </Text>
      </View>

      <Image
        style={{width: '100%', height: 200}}
        source={data ? {url: data?.photo} : require('../assets/bg.png')}
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
          {data?.description}
        </Text>
        <ReactionAndCommentStats data={data} onReacted={onReacted}/>
      </View>
    </View>
  );
};



export const ReactionAndCommentStats = ({data,onReacted}) => {
  const {data: blog,isLoading,refetch} = useGetBlogDetails(data?.id);
  console.log('blog',blog?.reacted);

  const likedPressed = () => {
    if(!isLoading)
    {
      const api = `https://minister-app.com/api/user/blogs/${data?.id}/toggle-react`;
      //console.log(data);
    axios
      .get(api)
      .then(res => {
       onReacted();
      })
      .catch(e => console.log(e));

    }else {
      alert('')

    }
    

    
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '40%',
          justifyContent: 'space-between',
        }}>

          <TouchableOpacity
          onPress={likedPressed}
          >
          <AntDesign
          name="like1"
          size={18}
          color={data.reacted ? '#0077B6' :  'grey' }
        />
          </TouchableOpacity>
        
        <Text>{blog?.reactions.length ?? 0}</Text>

        <Foundation name="comment" size={18} color={'#0077B6'} />
        <Text>{blog?.comments.length ?? 0}</Text>
      </View>
      <Entypo name="share" size={18} color={'#0077B6'} />
    </View>
  );
};

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
