/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ConversationsScreen from './src/screens/Conversations';
import ChatViewScreen from './src/screens/ChatViewScreen';

const AppNavigator = createStackNavigator(
  {
    Conversations: {
      screen: ConversationsScreen,
      path: '/',
      navigationOptions: () => ({
        title: 'Conversations',
      }),
    },
    Chat: ChatViewScreen,
  },
  {
    initialRouteName: 'Conversations',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'green',
        color: 'white',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <AppContainer />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
