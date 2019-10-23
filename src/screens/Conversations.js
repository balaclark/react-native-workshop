import React from 'react';

import {Text, StyleSheet} from 'react-native';

const ConversationsScreen = () => (
  <>
    <Text style={styles.welcome}>Conversations</Text>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151019',
  },
  welcome: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    width: '80%',
  },
  instructions: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 15,
  },
  workshopInstructions: {
    alignItems: 'flex-start',
  },
});

export default ConversationsScreen;
