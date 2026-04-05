import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlayerStore } from '../store/playerStore';

export default function QueueScreen() {
  const { queue, queueIndex, removeFromQueue, setQueue } = usePlayerStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queue</Text>

      <FlatList
        data={queue}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.row,
              index === queueIndex && { backgroundColor: '#1a1a1a' }
            ]}
            onPress={() => setQueue(queue, index)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>

            <TouchableOpacity onPress={() => removeFromQueue(index)}>
              <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 60 },
  title: { color: '#fff', fontSize: 22, marginLeft: 16, marginBottom: 10 },

  row: {
    flexDirection: 'row',
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333'
  },

  name: { color: '#fff', fontWeight: '600' },
  artist: { color: '#aaa', fontSize: 12 }
});