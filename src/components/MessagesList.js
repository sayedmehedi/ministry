import Message from './Message';
import React, {useRef} from 'react';
import {ScrollView} from 'react-native';

/**
 *
 * @param {{messages: Array<import("../typedefs").Message>}}
 * @returns
 */
const MessagesList = ({onSwipeToReply, messages}) => {
  const scrollView = useRef();

  return (
    <ScrollView
      style={{backgroundColor: 'white', flex: 1}}
      ref={ref => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({animated: true});
      }}>
      {messages.map(message => (
        <Message
          key={message.id}
          message={message.text}
          onSwipe={onSwipeToReply}
          time={message.created_at}
          isLeft={message.senderable_type === 'App\\Models\\Admin'}
        />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
