import Message from './Message';
import React, {useRef} from 'react';
import {FlatList, Text} from 'react-native';

/**
 *
 * @param {{messages: Array<import("../typedefs").Message>}}
 * @returns
 */
const MessagesList = ({
  onSwipeToReply,
  messages,
  onEndReached,
  isFetchingNextPage,
}) => {
  const scrollView = useRef();

  return (
    <React.Fragment>
      {isFetchingNextPage && <Text>Loading older messages...</Text>}

      <FlatList
        inverted
        onEndReached={onEndReached}
        data={messages}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        // ref={ref => (scrollView.current = ref)}
        // onContentChange={() => {
        //   scrollView.current.scrollToEnd({animated: true});
        // }}
        renderItem={({item: message}) => (
          <Message
            message={message.text}
            attachment={message.attachment}
            onSwipe={onSwipeToReply}
            time={message.created_at}
            isLeft={message.senderable_type === 'App\\Models\\Admin'}
          />
        )}
      />
    </React.Fragment>
  );
};

export default MessagesList;
