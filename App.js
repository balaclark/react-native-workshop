/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import ConversationsScreen from './src/screens/Conversations';
import ChatViewScreen from './src/screens/ChatViewScreen';

const screens = {
  ConversationsScreen,
  ChatViewScreen,
};

const App: () => React$Node = () => {
  const [activeScreen, setActiveScreen] = useState('ConversationsScreen');
  const Screen = screens[activeScreen];
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Screen />
          <Button
            title="Conversations"
            onPress={() => setActiveScreen('ConversationsScreen')}
          />
          <Button
            title="Chat"
            onPress={() => setActiveScreen('ChatViewScreen')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

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

export default App;
