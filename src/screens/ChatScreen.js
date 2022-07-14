import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import MessagesList from '../components/MessagesList';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const ChatScreen = () => {
  const username = 'sayed mehedi hasan';

  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState();
  const [messages,setMessages] = useState([]);
  const [token, setToken] = useState('');

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

  const swipeToReply = (message, isLeft) => {
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply('');
  };

  const getMessages = () => {
    
    const api = `https://minister-app.com/api/user/inbox`;
    //console.log(data);
  axios
    .get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log('re',res.data.data);
      setMessages(res.data.data);
     
    })
    .catch(e => console.log(e));
  }
  useEffect(()=>{
    getMessages();

  },[token])

  return (
    <View style={{flex: 1}}>
      <ChatHeader
        onPress={() => {}}
        username={username}
        picture="etest"
        onlineStatus={'Online'}
      />
      <MessagesList messages={messages} onSwipeToReply={swipeToReply} />
      <ChatInput
        reply={reply}
        isLeft={isLeft}
        closeReply={closeReply}
        username={username}
        onMessageSend={getMessages}
      />
    </View>
  );
};

export default ChatScreen;
