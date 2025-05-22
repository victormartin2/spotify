<script setup>
import { ref } from 'vue';

const categories = ref([
  {
    id: 1,
    title: 'Música',
    color: '#E8115B',
    image: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15'
  },
  {
    id: 2,
    title: 'Pódcasts',
    color: '#006450',
    image: 'https://cdn.prod.website-files.com/5fac161927bf86485ba43fd0/66bdf7e365caa3dd852e5bf6_Blog%20Cover_2024_03_How%20to%20Start%20a%20Podcast%20on%20Spotify%20_%20Complete%20Upload%20Guide%20(2024)%20(1)%20(1).webp'
  },
  {
    id: 3,
    title: 'Eventos en directo',
    color: '#8400E7',
    image: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg'
  },
  {
    id: 4,
    title: 'Especialmente para ti',
    color: '#1E3264',
    image: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe'
  },
  {
    id: 5,
    title: 'Novedades',
    color: '#2D46B9',
    image: 'https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730'
  },
  {
    id: 6,
    title: 'Latina',
    color: '#0D73EC',
    image: 'https://i.scdn.co/image/ab67fb8200005caf8eb00a9a2c00093ccde516c6'
  },
  {
    id: 7,
    title: 'Pop',
    color: '#8C1932',
    image: 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1'
  },
  {
    id: 8,
    title: 'Rock',
    color: '#E13300',
    image: 'https://i.scdn.co/image/ab67fb8200005caf9ed6e364e8839210dc4dbff7'
  },
  {
    id: 9,
    title: 'Fútbol',
    color: '#777777',
    image: 'https://i.scdn.co/image/ab67706f000000025f0ff9251e3cfe641160dc31'
  },
  {
    id: 10,
    title: 'Éxitos en pódcasts',
    color: '#148A08',
    image: 'https://i.scdn.co/image/ab67656300005f1ff234909e69a68d92ca0af6ca'
  },
  {
    id: 11,
    title: 'Nuevos Pódcasts',
    color: '#AF2896',
    image: 'https://www.hubspot.com/hubfs/spotify%20podcasts.png'
  },
  {
    id: 12,
    title: 'Videopódcasts',
    color: '#E61E32',
    image: 'https://i.scdn.co/image/ab67656300005f1fb4d5f866f7bf85f972538949'
  }
]);
</script>

<template>
  <div class="search-view">
    <h1 class="search-title">Explorar todo</h1>
    
    <div class="categories-grid">
      <div 
        v-for="category in categories" 
        :key="category.id" 
        class="category-card"
        :style="{ backgroundColor: category.color }"
      >
        <div class="category-content">
          <h2 class="category-title">{{ category.title }}</h2>
          <img :src="category.image" :alt="category.title" class="category-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  padding: 24px 32px;
  overflow-y: auto;
  height: 100%;
}

.search-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #ffffff;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.category-card {
  border-radius: 8px;
  overflow: hidden;
  height: 180px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: scale(1.02);
}

.category-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.category-title {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  z-index: 2;
}

.category-image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  object-fit: cover;
  transform: rotate(25deg) translate(18%, -2%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
