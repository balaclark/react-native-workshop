import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Text, Image} from 'react-native';
import {getConversations} from '../services/api';
import RightChevron from '../svg/right-chevron.svg';

const ConversationListItem = ({title, description, avatar, messages}) => (
  <View style={styles.item}>
    <Image resizeMethod="scale" style={styles.avatar} source={{uri: avatar}} />
    <View style={styles.itemContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <View>
      <Text style={styles.when}>Yesterday</Text>
      <RightChevron width={25} height={25} />
    </View>
  </View>
);

const ConversationsScreen = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={({item}) => <ConversationListItem {...item} />}
        keyExtractor={item => item.id}
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
});

export default ConversationsScreen;
