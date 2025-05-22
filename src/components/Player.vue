<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { usePlayerStore } from '../stores/player';

const playerStore = usePlayerStore();

const currentTime = computed(() => playerStore.currentTime);
const duration = computed(() => playerStore.duration);
const isPlaying = computed(() => playerStore.isPlaying);
const currentSong = computed(() => playerStore.currentSong);
const volume = ref(playerStore.volume);

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const formattedCurrentTime = computed(() => formatTime(currentTime.value));
const formattedDuration = computed(() => formatTime(duration.value));

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

const handleProgressClick = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const clickPosition = event.clientX - rect.left;
  const percentage = clickPosition / rect.width;
  const newTime = percentage * duration.value;
  playerStore.seek(newTime);
};

const togglePlay = () => {
  if (isPlaying.value) {
    playerStore.pause();
  } else {
    playerStore.play();
  }
};

const handleVolumeChange = (e) => {
  volume.value = parseFloat(e.target.value);
  playerStore.setVolume(volume.value);
};

const nextSong = () => {
  playerStore.next();
};

const prevSong = () => {
  playerStore.previous();
};

// Extraer el ID de YouTube para la miniatura
const getYouTubeThumbnail = (url) => {
  if (!url) return '';
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
  
  return '';
};

onMounted(() => {
  playerStore.setVolume(volume.value);
});
</script>

<template>
  <div class="player">
    <div class="now-playing">
      <div v-if="currentSong" class="song-info">
        <img 
          :src="getYouTubeThumbnail(currentSong.audioUrl)" 
          :alt="currentSong.title" 
          class="song-cover" 
        />
        <div class="song-details">
          <h4 class="song-title">{{ currentSong.title }}</h4>
          <p class="song-artist">{{ currentSong.artist }}</p>
        </div>
      </div>
      <div v-else class="song-info">
        <div class="placeholder-cover"></div>
        <div class="song-details">
          <h4 class="song-title">Selecciona una canción</h4>
          <p class="song-artist">Artista</p>
        </div>
      </div>
    </div>
    
    <div class="player-controls">
      <div class="control-buttons">
        <button class="control-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
        </button>
        <button class="control-button" @click="prevSong">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>
        </button>
        <button class="play-pause-button" @click="togglePlay">
          <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        <button class="control-button" @click="nextSong">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
        <button class="control-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </button>
      </div>
      
      <div class="progress-container">
        <span class="time-display">{{ formattedCurrentTime }}</span>
        <div class="progress-bar" @click="handleProgressClick">
          <div class="progress-background"></div>
          <div class="progress-filled" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
        <span class="time-display">{{ formattedDuration }}</span>
      </div>
    </div>
    
    <div class="player-options">
      <button class="option-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </button>
      <button class="option-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </button>
      <div class="volume-control">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          class="volume-slider" 
          v-model="volume"
          @input="handleVolumeChange"
        />
      </div>
      <button class="option-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <polyline points="9 21 3 21 3 15"></polyline>
          <line x1="21" y1="3" x2="14" y2="10"></line>
          <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.player {
  height: 90px;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.now-playing {
  width: 30%;
  min-width: 180px;
}

.song-info {
  display: flex;
  align-items: center;
}

.song-cover, .placeholder-cover {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  margin-right: 14px;
  object-fit: cover;
}

.placeholder-cover {
  background-color: #333333;
}

.song-details {
  display: flex;
  flex-direction: column;
}

.song-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  color: #b3b3b3;
  font-size: 12px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 722px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.control-button {
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.control-button:hover {
  color: #ffffff;
}

.play-pause-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.play-pause-button:hover {
  transform: scale(1.06);
}

.progress-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-display {
  color: #b3b3b3;
  font-size: 12px;
  min-width: 40px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 4px;
  position: relative;
  cursor: pointer;
}

.progress-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #535353;
  border-radius: 2px;
}

.progress-filled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #b3b3b3;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-bar:hover .progress-filled {
  background-color: #1db954;
}

.player-options {
  width: 30%;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.option-button {
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.option-button:hover {
  color: #ffffff;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b3b3b3;
}

.volume-slider {
  -webkit-appearance: none;
  width: 93px;
  height: 4px;
  background: #535353;
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  border: none;
}

.volume-slider:hover {
  background: #b3b3b3;
}

.volume-slider:hover::-webkit-slider-thumb {
  background: #1db954;
}

.volume-slider:hover::-moz-range-thumb {
  background: #1db954;
}
</style>
