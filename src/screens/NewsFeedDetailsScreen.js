import React from 'react';
import {NewsCard} from '../components/NewsFeed';
import {
  useCreateComment,
  useDeleteComment,
  useGetBlogDetails,
} from '../hooks/newsfeed';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const CommentReactionAndCommentStats = ({commentId, onDeleted}) => {
  const [reacted, setReacted] = React.useState(false);
  const [showCommentOptions, setShowCommentOptions] = React.useState(false);

  const {
    mutate: deleteComment,
    error: deleteCommentError,
    isLoading: isDeletingComment,
    isError: isCommentDeleteError,
  } = useDeleteComment({
    onDeleted,
  });

  const handleDeleteComment = () => {
    deleteComment(commentId);
  };

  React.useEffect(() => {
    if (isCommentDeleteError) {
      console.log('comment delete error', deleteCommentError);
    }
  }, [deleteCommentError, isCommentDeleteError]);

  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => setReacted(prevState => !prevState)}>
          <AntDesign
            size={18}
            name="like1"
            color={!reacted ? 'grey' : '#0077B6'}
          />
        </TouchableOpacity>
        <Text>1000</Text>
      </View>

      <View>
        {showCommentOptions && (
          <TouchableOpacity
            disabled={isDeletingComment}
            onPress={handleDeleteComment}>
            <View
              style={{
                padding: 5,
                textAlign: 'center',
                backgroundColor: 'red',
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Delete
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => setShowCommentOptions(prevState => !prevState)}>
          <Feather name="more-horizontal" size={18} color={'#0077B6'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommentCard = ({data, onDeleted}) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{marginRight: 10}}>
          <Image
            style={{width: 40, height: 40, borderRadius: 20}}
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text>Ishtiuq Ahmed Chowdhury</Text>
          <Text>{data?.text}</Text>
        </View>
      </View>
      <View>
        <CommentReactionAndCommentStats
          commentId={data?.id}
          onDeleted={onDeleted}
        />
      </View>
    </View>
  );
};

const CommentCreateInput = ({onCommentCreated, blogId}) => {
  const [commentText, setCommentText] = React.useState('');

  const onChangeCommentText = text => {
    setCommentText(text);
  };

  const {
    error,
    mutate,
    isError,
    isLoading: isCreatingComment,
  } = useCreateComment();

  React.useEffect(() => {
    if (isError) {
      console.log('comment create error', error);
    }
  }, [isError]);

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <TextInput
          multiline
          value={commentText}
          style={styles.input}
          placeholder={'Add comment'}
          placeholderTextColor={'black'}
          onChangeText={onChangeCommentText}
        />
      </View>

      <View>
        <TouchableOpacity
          disabled={isCreatingComment}
          onPress={async () => {
            await mutate({
              blog_id: blogId,
              text: commentText,
            });
            setCommentText('');

            onCommentCreated?.();
          }}>
          <MaterialCommunityIcons name="send" size={18} color={'#0077B6'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function NewsFeedDetailsScreen({route}) {
  const {
    data,
    refetch,
    isLoading: isLoadingBlogDetails,
  } = useGetBlogDetails(route.params.id);

  const renderItem = ({item}) => (
    <View style={{marginBottom: 7}}>
      <CommentCard data={item} onDeleted={refetch} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <NewsCard data={data} onReacted={refetch} />

      <CommentCreateInput onCommentCreated={refetch} blogId={route.params.id} />

      <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 10}}>
        All comments
      </Text>

      {isLoadingBlogDetails ? (
        <Text>Loading..</Text>
      ) : (
        <FlatList
          renderItem={renderItem}
          data={data?.comments ?? []}
          keyExtractor={item => item.id}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    color: 'black',
  },
});
