<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showCreatePlaylistModal = ref(false);

const navigateToHome = () => {
  router.push('/');
};

const navigateToSearch = () => {
  router.push('/search');
};
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <svg viewBox="0 0 1134 340" class="spotify-logo">
        <path fill="white" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 61-60-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"></path>
      </svg>
    </div>
    <div class="nav-links">
      <a href="#" class="nav-link" @click.prevent="navigateToHome">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Inicio</span>
      </a>
      <a href="#" class="nav-link" @click.prevent="navigateToSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span>Buscar</span>
      </a>
    </div>
    <div class="library-section">
      <div class="library-header">
        <div class="library-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>Tu biblioteca</span>
        </div>
        <button class="add-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>
      <div class="library-content">
        <div class="create-playlist">
          <h3>Crea tu primera lista</h3>
          <p>Es muy fácil, y te echaremos una mano.</p>
          <button class="create-playlist-btn">Crear lista</button>
        </div>
        <div class="find-podcasts">
          <h3>Encuentra pódcasts que quieras seguir</h3>
          <p>Te avisaremos cuando salgan nuevos episodios</p>
          <button class="explore-podcasts-btn">Explorar pódcasts</button>
        </div>
      </div>
    </div>
    <div class="sidebar-footer">
      <div class="footer-links">
        <a href="#" class="footer-link">Legal</a>
        <a href="#" class="footer-link">Centro de seguridad y privacidad</a>
        <a href="#" class="footer-link">Política de Privacidad</a>
        <a href="#" class="footer-link">Configuración de cookies</a>
        <a href="#" class="footer-link">Información sobre los anuncios</a>
        <a href="#" class="footer-link">Accesibilidad</a>
        <a href="#" class="footer-link">Cookies</a>
      </div>
      <button class="language-button">
        <span class="globe-icon">🌐</span>
        Español de España
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 340px;
  height: 100%;
  background-color: #000000;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  padding: 24px 12px;
  overflow-y: auto;
}

.logo {
  padding: 0 12px;
  margin-bottom: 18px;
}

.spotify-logo {
  width: 131px;
  height: 40px;
}

.nav-links {
  padding: 4px 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #b3b3b3;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link span {
  margin-left: 16px;
}

.library-section {
  margin-top: 24px;
  background-color: #121212;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 8px;
}

.library-title {
  display: flex;
  align-items: center;
  color: #b3b3b3;
  font-weight: 700;
  font-size: 14px;
}

.library-title span {
  margin-left: 12px;
}

.add-button {
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: color 0.2s ease;
}

.add-button:hover {
  color: #ffffff;
}

.library-content {
  padding: 8px 16px 16px;
  overflow-y: auto;
  flex: 1;
}

.create-playlist, .find-podcasts {
  background-color: #242424;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.create-playlist h3, .find-podcasts h3 {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 8px;
}

.create-playlist p, .find-podcasts p {
  color: #b3b3b3;
  font-size: 14px;
  margin-bottom: 16px;
}

.create-playlist-btn, .explore-podcasts-btn {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.create-playlist-btn:hover, .explore-podcasts-btn:hover {
  transform: scale(1.04);
}

.sidebar-footer {
  margin-top: 16px;
  padding: 0 16px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.footer-link {
  color: #b3b3b3;
  text-decoration: none;
  font-size: 11px;
  margin-right: 12px;
  margin-bottom: 12px;
}

.footer-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

.language-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #727272;
  border-radius: 20px;
  padding: 6px 12px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

.globe-icon {
  margin-right: 6px;
}
</style>
