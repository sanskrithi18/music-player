import { create } from 'zustand';
import { NormalizedSong, api } from '../services/api';

interface SearchState {
  query: string;
  results: NormalizedSong[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
  trendingSongs: NormalizedSong[];

  setQuery: (q: string) => void;
  search: (q: string, reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  loadTrending: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  isLoading: false,
  page: 1,
  hasMore: true,
  trendingSongs: [],

  setQuery(q) {
    set({ query: q });
  },

  async search(q, reset = true) {
    if (!q.trim()) {
      set({ results: [], query: q });
      return;
    }
    set({ isLoading: true, query: q, ...(reset ? { page: 1, results: [] } : {}) });
    const page = reset ? 1 : get().page;
    const songs = await api.searchSongs(q, page);
    set(state => ({
      results: reset ? songs : [...state.results, ...songs],
      isLoading: false,
      page: page + 1,
      hasMore: songs.length === 20,
    }));
  },

  async loadMore() {
    const { query, isLoading, hasMore } = get();
    if (!query || isLoading || !hasMore) return;
    await get().search(query, false);
  },

  async loadTrending() {
    const songs = await api.getTrendingSongs();
    set({ trendingSongs: songs });
  },
}));