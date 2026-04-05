import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlayerStore } from '../store/playerStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MiniPlayer() {
  const nav = useNavigation<any>();
  const { queue, queueIndex, isPlaying, togglePlay } = usePlayerStore();

  const song = queue[queueIndex];
  if (!song) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => nav.navigate('Player')}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name} numberOfLines={1}>{song.name}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      <TouchableOpacity onPress={togglePlay}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={24}
          color="#1DB954"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  name: {
    color: '#fff',
    fontWeight: '600',
  },

  artist: {
    color: '#888',
    fontSize: 12,
  },
});