import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePlayerStore } from '../store/playerStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PlayerScreen() {
  const navigation = useNavigation<any>();

  const {
    queue,
    queueIndex,
    isPlaying,
    togglePlay,
    next,
    position,
    duration,
    seek
  } = usePlayerStore();

  const song = queue[queueIndex];

  if (!song) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>No song playing</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nowPlaying}>Now Playing</Text>

      <Text style={styles.title}>{song.name}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <Slider
        style={{ width: '85%', marginTop: 30 }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#333"
        onSlidingComplete={seek}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlay}>
          <Ionicons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={70}
            color="#1DB954"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={next}>
          <Ionicons name="play-skip-forward" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔥 OPEN QUEUE BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Queue')}
        style={styles.queueBtn}
      >
        <Text style={styles.queueText}>Open Queue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },

  nowPlaying: {
    color: '#888',
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },

  artist: {
    color: '#aaa',
    marginTop: 6,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginTop: 40,
  },

  queueBtn: {
    marginTop: 30,
  },

  queueText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: '600',
  },
});