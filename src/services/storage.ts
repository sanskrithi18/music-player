import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const QUEUE_KEY = 'queue_songs';
const QUEUE_INDEX_KEY = 'queue_index';
const REPEAT_KEY = 'repeat_mode';
const SHUFFLE_KEY = 'shuffle_mode';

export const StorageService = {
  saveQueue(songs: any[], currentIndex: number) {
    storage.set(QUEUE_KEY, JSON.stringify(songs));
    storage.set(QUEUE_INDEX_KEY, currentIndex);
  },

  loadQueue(): { songs: any[]; currentIndex: number } {
    try {
      const raw = storage.getString(QUEUE_KEY);
      const songs = raw ? JSON.parse(raw) : [];
      const currentIndex = storage.getNumber(QUEUE_INDEX_KEY) ?? 0;
      return { songs, currentIndex };
    } catch {
      return { songs: [], currentIndex: 0 };
    }
  },

  saveRepeatMode(mode: 'off' | 'all' | 'one') {
    storage.set(REPEAT_KEY, mode);
  },

  loadRepeatMode(): 'off' | 'all' | 'one' {
    return (storage.getString(REPEAT_KEY) as any) || 'off';
  },

  saveShuffleMode(on: boolean) {
    storage.set(SHUFFLE_KEY, on);
  },

  loadShuffleMode(): boolean {
    return storage.getBoolean(SHUFFLE_KEY) ?? false;
  },
};