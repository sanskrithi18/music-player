import React, { useEffect, useState } from 'react';
import {
  View, TextInput, FlatList, Text,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { searchSongs } from '../services/api';
import { usePlayerStore } from '../store/playerStore';

export default function HomeScreen() {
  const [query, setQuery] = useState('arijit');
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { setQueue } = usePlayerStore();

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await searchSongs(query);
      setSongs(res || []);
    } catch (e) {
      console.log("API ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={fetchSongs}
        style={styles.input}
        placeholder="Search songs..."
        placeholderTextColor="#aaa"
      />

      {loading && <ActivityIndicator color="#fff" size="large" />}

      <FlatList
        data={songs}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setQueue(songs, index)}
            style={styles.card}
          >
            <View>
              <Text style={styles.songName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {item.artist}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 60 },

  input: {
    margin: 16,
    backgroundColor: '#111',
    color: '#fff',
    padding: 12,
    borderRadius: 8
  },

  card: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 10,
  },

  songName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  artist: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
});