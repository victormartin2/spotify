<script setup>
import { ref } from 'vue';
import { Search, Bell, User } from 'lucide-vue-next';

const searchQuery = ref('');
</script>

<template>
  <div class="top-bar">
    <div class="navigation-buttons">
      <button class="nav-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="nav-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    
    <div class="search-container">
      <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input 
        type="text" 
        class="search-input" 
        placeholder="¿Qué quieres reproducir?"
        v-model="searchQuery"
      />
    </div>
    
    <div class="top-bar-right">
      <a href="#" class="premium-link">Premium</a>
      <a href="#" class="support-link">Asistencia</a>
      <a href="#" class="download-link">Descargar</a>
      <div class="divider"></div>
      <button class="install-app-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span>Instalar app</span>
      </button>
      <button class="user-profile-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navigation-buttons {
  display: flex;
  gap: 16px;
}

.nav-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search-container {
  position: relative;
  width: 364px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #121212;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border-radius: 20px;
  border: none;
  background-color: #ffffff;
  font-size: 14px;
  color: #121212;
}

.search-input::placeholder {
  color: #727272;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.premium-link, .support-link, .download-link {
  color: #b3b3b3;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: color 0.2s ease;
}

.premium-link:hover, .support-link:hover, .download-link:hover {
  color: #ffffff;
  transform: scale(1.04);
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #727272;
}

.install-app-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.user-profile-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #000000;
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
