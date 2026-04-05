import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Audio } from 'expo-av';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  }, []);

  return <AppNavigator />;
}