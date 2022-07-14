import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useGetMessages} from '../hooks/chat';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import MessagesList from '../components/MessagesList';

const ChatScreen = () => {
  const username = 'sayed mehedi hasan';

  const {data: messages, isLoading, isError, error, refetch} = useGetMessages();

  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState();

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
        <Text>Loading...</Text>
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
