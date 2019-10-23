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
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws';
import {HttpLink} from 'apollo-link-http';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';

const wsurl = 'ws://react-native-workshop.herokuapp.com/v1/graphql';
const httpurl = 'https://react-native-workshop.herokuapp.com/v1/graphql';

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: httpurl,
});

const link = split(
  // split based on operation type
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

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

const App = () => (
  <ApolloProvider client={client}>
    <StatusBar barStyle="light-content" backgroundColor="darkgreen" />
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AppContainer />
      </View>
    </SafeAreaView>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgreen',
  },
});

export default App;
