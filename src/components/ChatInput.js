import React, {useState, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSendMessage} from '../hooks/chat';

const ChatInput = ({reply, closeReply, isLeft, username, onSent}) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const height = useSharedValue(70);
  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const [fileToUpload = {uri, type, name}] = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });

      setFile(fileToUpload);
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const {mutate, isLoading, isError, error} = useSendMessage({
    onSent: () => {
      onSent();
      setMessage('');
      setFile(null);
    },
  });

  React.useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError, error]);

  const handleSendMessage = () => {
    mutate({
      text: message,
      file,
    });
  };

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      {reply ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
            <Icon name="close" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Response to {isLeft ? username : 'Me'}
          </Text>
          <Text style={styles.reply}>{reply}</Text>
        </View>
      ) : null}
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={selectFile}>
          <Icon name="paperclip" size={23} color={'#0077E6'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="camera" size={23} color={'#0077E6'} />
        </TouchableOpacity>

        <TextInput
          multiline
          placeholder={'Type something...'}
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
        />

        <TouchableOpacity
          disabled={isLoading}
          style={styles.sendButton}
          onPress={handleSendMessage}>
          <Icon name={'send'} size={23} color={'white'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#ECEBEB',
    paddingLeft: 20,

    flex: 5,
    fontSize: 15,
    height: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ECEBEB',
    borderRadius: 20,
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: 'green',
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  recordingTime: {
    color: 'green',
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    backgroundColor: '#0077B6',
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
