<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  }
});

const isHovered = ref(false);
</script>

<template>
  <div 
    class="album-card" 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false"
  >
    <div class="cover-container">
      <img :src="cover" :alt="title" class="album-cover" />
      <button v-if="isHovered" class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" fill="#000000"></polygon>
        </svg>
      </button>
    </div>
    <div class="album-info">
      <h3 class="album-title">{{ title }}</h3>
      <p class="album-artist">{{ artist }}</p>
    </div>
  </div>
</template>

<style scoped>
.album-card {
  background-color: #181818;
  border-radius: 6px;
  padding: 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.album-card:hover {
  background-color: #282828;
}

.cover-container {
  position: relative;
  margin-bottom: 16px;
}

.album-cover {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.play-button {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1db954;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.play-button:hover {
  transform: scale(1.06);
}

.album-info {
  padding: 0 4px;
}

.album-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-artist {
  color: #b3b3b3;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
