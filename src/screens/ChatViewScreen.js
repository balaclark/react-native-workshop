import React from 'react';
import {
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

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const ChatListItem = ({index, avatar, message, incoming}) => (
  <Animatable.View
    animation={`bounceIn${incoming ? 'Left' : 'Right'}`}
    delay={index * 250 * 0.8}
    style={incoming ? styles.item : styles.outgoingItem}>
    <Image resizeMethod="scale" style={styles.avatar} source={{uri: avatar}} />
    <View style={styles.itemContent}>
      <Text style={styles.description}>{message}</Text>
    </View>
  </Animatable.View>
);

const ChatViewScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={navigation.getParam('messages')}
        renderItem={({item, index}) => (
          <ChatListItem
            {...item}
            index={index}
            avatar={
              item.incoming
                ? navigation.getParam('avatar')
                : 'https://i.pravatar.cc/150?img=50'
            }
          />
        )}
        keyExtractor={(item, index) => item.message + index}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TextInput style={styles.input} placeholder="Chit-chat goes here..." />
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
    padding: Platform.OS === 'ios' ? 20 : null,
    backgroundColor: 'white',
    borderTopColor: 'darkgreen',
    borderTopWidth: 1,
  },
});

export default ChatViewScreen;
