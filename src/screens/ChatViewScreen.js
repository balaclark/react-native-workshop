import React from 'react';
import {FlatList, StyleSheet, View, Text, Image} from 'react-native';
import {getConversations} from '../services/api';

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
});

export default ChatViewScreen;
