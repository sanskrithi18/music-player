# 🎵 Music Player App

A fully functional React Native music player built with Expo.

##  Features

-  Search songs using API
-  Play / Pause audio
-  Queue management (add/remove songs)
-  Shuffle mode
-  Like songs (Saved locally)
-  Liked Songs screen
-  Mini Player (persistent across screens)
-  Full Player sync with Mini Player
-  Clean and modern UI

##  Architecture

- State Management: Zustand
- Navigation: React Navigation (Stack)
- Audio: Expo AV
- API: iTunes Search API (fallback included)

##  Project Structure
src/
├── components/
│ └── MiniPlayer.tsx
├── screens/
│ ├── HomeScreen.tsx
│ ├── PlayerScreen.tsx
│ ├── QueueScreen.tsx
│ └── LikedScreen.tsx
├── store/
│ └── playerStore.ts
├── services/
│ └── api.ts
└── navigation/
└── AppNavigator.tsx
