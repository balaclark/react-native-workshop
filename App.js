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
    Chat: {
      screen: ChatViewScreen,
      path: '/chat/:id',
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('title', 'Chat'),
      }),
    },
  },
  {
    initialRouteName: 'Conversations',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'darkgreen',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="darkgreen" />
      <SafeAreaView style={[styles.container, {backgroundColor: 'darkgreen'}]}>
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
