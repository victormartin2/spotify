<script setup>
import { ref } from 'vue';
import { Play } from 'lucide-vue-next';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const isHovered = ref(false);
</script>

<template>
  <div 
    class="artist-card" 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false"
  >
    <div class="image-container">
      <img :src="image" :alt="name" class="artist-image" />
      <button v-if="isHovered" class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" fill="#000000"></polygon>
        </svg>
      </button>
    </div>
    <div class="artist-info">
      <h3 class="artist-name">{{ name }}</h3>
      <p class="artist-type">Artista</p>
    </div>
  </div>
</template>

<style scoped>
.artist-card {
  background-color: #181818;
  border-radius: 6px;
  padding: 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.artist-card:hover {
  background-color: #282828;
}

.image-container {
  position: relative;
  margin-bottom: 16px;
}

.artist-image {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
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

.artist-info {
  padding: 0 4px;
  text-align: center;
}

.artist-name {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artist-type {
  color: #b3b3b3;
  font-size: 14px;
}
</style>
