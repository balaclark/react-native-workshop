import React from 'react';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  YellowBox,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSubscription} from '@apollo/react-hooks';
import gql from 'graphql-tag';

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const CONVERSATION_SUBSCRIPTION = gql`
  subscription getConversation($id: uuid) {
    conversations(where: {id: {_eq: $id}}) {
      id
      title
      description
      chats {
        message
      }
      user {
        avatar
        name
      }
    }
  }
`;

const ChatListItem = ({index, user, message}) => (
  <Animatable.View
    animation={`bounceIn${user ? 'Left' : 'Right'}`}
    delay={index * 250 * 0.8}
    style={user ? styles.item : styles.outgoingItem}>
    <Image
      resizeMethod="scale"
      style={styles.avatar}
      source={{uri: user ? user.avatar : 'https://i.pravatar.cc/150?img=50'}}
    />
    <View style={styles.itemContent}>
      <Text style={styles.description}>{message}</Text>
    </View>
  </Animatable.View>
);

const ChatViewScreen = ({navigation}) => {
  const {data: {conversations = []} = {}, loading} = useSubscription(
    CONVERSATION_SUBSCRIPTION,
    {
      variables: {
        id: navigation.getParam('id'),
      },
    },
  );

  if (!conversations.length) return null;

  const conversation = conversations[0];

  return (
    <View style={styles.container}>
      <FlatList
        data={conversation.chats}
        renderItem={({item, index}) => (
          <ChatListItem {...item} index={index} user={conversation.user} />
        )}
        keyExtractor={(item, index) => item.message + index}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.compose}>
          <TextInput
            style={styles.input}
            placeholder="Chit-chat goes here..."
          />
          <Button onPress={() => alert('submit...')} title="Send" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const baseFontSize = 20;

const item = {
  backgroundColor: 'lightgreen',
  borderBottomColor: 'darkgreen',
  borderBottomWidth: 10,
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
  height: 150,
  flex: 1,
  flexDirection: 'row',
  // width: '75%',
  borderRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'lightyellow',
  },
  item,
  outgoingItem: {
    ...item,
    backgroundColor: '#fff466',
    borderBottomColor: '#d1c858',
    flexDirection: 'row-reverse',
  },
  title: {
    fontSize: baseFontSize,
    fontWeight: 'bold',
  },
  description: {
    fontSize: baseFontSize,
  },
  when: {
    fontSize: baseFontSize,
    color: 'gray',
  },
  avatar: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  arrow: {
    color: 'rgba(0,0,0,.5)',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    width: '85%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 100,
  },
  compose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default ChatViewScreen;

/* TODO
 * outgoing message mutation
 */
