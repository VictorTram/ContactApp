import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import AddNewContact from './screens/AddNewContact';
import ViewContact from './screens/ViewContact';
import EditContact from './screens/EditContact';

import * as firebase from 'firebase';

import {SECRET_firebaseConfig} from './config';

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen},
    Add: { screen: AddNewContact},
    View: { screen: ViewContact},
    Edit: { screen: EditContact},
  },
  {
    defaultNavigationOptions: {
      headerTintColor:"#fff",
      headerStyle: {
        backgroundColor: "#74B9FF"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
firebase.initializeApp({
  apiKey: "AIzaSyDidjO8STT5SZPbfmr-UjPgdj0FDSpiInw",
authDomain: "reactbootcamp-f2fa8.firebaseapp.com",
databaseURL: "https://reactbootcamp-f2fa8.firebaseio.com",
projectId: "reactbootcamp-f2fa8",
storageBucket: "gs://reactbootcamp-f2fa8.appspot.com",
messagingSenderId: "428067339054",
appId: "1:428067339054:web:f161d311dc5ef66aeb98bf"});

export default App;
