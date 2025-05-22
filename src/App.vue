<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopBar from './components/TopBar.vue';
import MainContent from './components/MainContent.vue';
import Player from './components/Player.vue';
import { usePlayerStore } from './stores/player';
import { useRoute } from 'vue-router';

const playerStore = usePlayerStore();
const route = useRoute();

// Limpiar el reproductor al desmontar el componente
onUnmounted(() => {
  playerStore.cleanup();
});

// Determinar si mostrar el contenido principal o la vista de router
const showMainContent = computed(() => {
  return route.path === '/';
});
</script>

<template>
  <div class="spotify-app">
    <div class="main-container">
      <Sidebar />
      <div class="content-area">
        <TopBar />
        <MainContent v-if="showMainContent" />
        <router-view v-else />
      </div>
    </div>
    <Player />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Circular Std', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
  background-color: #000000;
  color: #ffffff;
  overflow: hidden;
}

.spotify-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #121212;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(18,18,18,0.8) 0%, #121212 100%);
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  border: 3px solid #121212;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
