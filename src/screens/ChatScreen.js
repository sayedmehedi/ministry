import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useGetMessages} from '../hooks/chat';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import MessagesList from '../components/MessagesList';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const ChatScreen = () => {
  const username = 'sayed mehedi hasan';

  const {data: messages, isLoading, isError, error, refetch} = useGetMessages();

  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState();
  //const [messages,setMessages] = useState([]);
  // const [token, setToken] = useState('');

  const swipeToReply = (message, isLeft) => {
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply('');
  };

  React.useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError, error]);

  return (
    <View style={{flex: 1}}>
      <ChatHeader
        onPress={() => {}}
        username={username}
        picture="etest"
        onlineStatus={'Online'}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      ) : (
        <MessagesList onSwipeToReply={swipeToReply} messages={messages} />
      )}
      <ChatInput
        reply={reply}
        isLeft={isLeft}
        onSent={refetch}
        username={username}
        closeReply={closeReply}
      />
    </View>
  );
};

export default ChatScreen;
