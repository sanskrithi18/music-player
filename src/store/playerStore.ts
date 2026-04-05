import { create } from 'zustand';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song } from '../services/api';

let sound: Audio.Sound | null = null;

type State = {
  queue: Song[];
  queueIndex: number;
  isPlaying: boolean;
  position: number;
  duration: number;

  setQueue: (songs: Song[], index: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  next: () => Promise<void>;
  seek: (value: number) => Promise<void>;
  removeFromQueue: (index: number) => void;
  loadPersisted: () => Promise<void>;
};

export const usePlayerStore = create<State>((set, get) => ({
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  position: 0,
  duration: 1,

  setQueue: async (songs, index) => {
    const song = songs[index];
    if (!song?.audioUrl) return;

    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.audioUrl },
      { shouldPlay: true },
      (status: any) => {
        if (status.isLoaded) {
          set({
            position: status.positionMillis,
            duration: status.durationMillis || 1,
          });
        }
      }
    );

    sound = newSound;

    await AsyncStorage.setItem('queue', JSON.stringify(songs));

    set({
      queue: songs,
      queueIndex: index,
      isPlaying: true,
    });
  },

  togglePlay: async () => {
    if (!sound) return;
    const status: any = await sound.getStatusAsync();

    if (status.isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  next: async () => {
    const { queue, queueIndex, setQueue } = get();
    if (queueIndex < queue.length - 1) {
      await setQueue(queue, queueIndex + 1);
    }
  },

  seek: async (value) => {
    if (!sound) return;
    await sound.setPositionAsync(value);
  },

  removeFromQueue: (index) => {
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index),
    }));
  },

  loadPersisted: async () => {
    const data = await AsyncStorage.getItem('queue');
    if (data) {
      set({ queue: JSON.parse(data) });
    }
  },
}));