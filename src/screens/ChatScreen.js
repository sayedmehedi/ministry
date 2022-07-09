import React, {useState} from 'react';
import {View} from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import MessagesList from '../components/MessagesList';

const ChatScreen = () => {
  const username = 'sayed mehedi hasan';

  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState();

  const swipeToReply = (message, isLeft) => {
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply('');
  };

  return (
    <View style={{flex: 1}}>
      <ChatHeader
        onPress={() => {}}
        username={username}
        picture="etest"
        onlineStatus={'Online'}
      />
      <MessagesList onSwipeToReply={swipeToReply} />
      <ChatInput
        reply={reply}
        isLeft={isLeft}
        closeReply={closeReply}
        username={username}
      />
    </View>
  );
};

export default ChatScreen;
