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

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const ChatListItem = ({avatar, message, incoming}) => (
  <View style={styles.item}>
    <Image resizeMethod="scale" style={styles.avatar} source={{uri: avatar}} />
    <View style={styles.itemContent}>
      <Text style={styles.description}>{message}</Text>
    </View>
  </View>
);

const ChatViewScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={navigation.getParam('messages')}
        renderItem={({item}) => (
          <ChatListItem
            {...item}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: 'lightgreen',
    borderBottomColor: 'darkgreen',
    borderBottomWidth: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 150,
    flex: 1,
    flexDirection: 'row',
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
    padding: 20,
  },
});

export default ChatViewScreen;
