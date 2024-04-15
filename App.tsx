/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WelcomeScreen from './screens/WelcomeScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/AuthContext';
import MainScreen from './screens/MainScreen';
import LoadScreen from './screens/LoadScreen';



type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
   
<PaperProvider>
  <AuthProvider>
    
    <MainScreen/>
    
    </AuthProvider>
    </PaperProvider>
  
   
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
