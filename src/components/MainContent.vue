<script setup>
import { ref } from 'vue';
import AlbumCard from './AlbumCard.vue';
import ArtistCard from './ArtistCard.vue';
import { usePlayerStore } from '../stores/player';

const trendingSongs = ref([
  {
    id: 1,
    title: 'Duki: Givenchy',
    artist: 'Duki',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/l9HkcHxu8MI'
  },
  {
    id: 2,
    title: 'Quevedo: Columbia',
    artist: 'Quevedo',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/NH4W8BOaSiE'
  },
  {
    id: 3,
    title: 'Feid, Young Miko: Classy 101',
    artist: 'Feid, Young Miko',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/2J9xYVcP4MA'
  },
  {
    id: 4,
    title: 'Myke Towers: LALA',
    artist: 'Myke Towers',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/o6aJJ6Q5zhg'
  },
  {
    id: 5,
    title: 'Bad Bunny: MONACO',
    artist: 'Bad Bunny',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/0B1ujEFubrE'
  },
  {
    id: 6,
    title: 'Rauw Alejandro: TOCAME',
    artist: 'Rauw Alejandro',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/BN51wp_7cq8'
  },
  {
    id: 7,
    title: 'Karol G: S91',
    artist: 'Karol G',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://youtu.be/OHAZHNFh4nU'
  }
]);

const popularArtists = ref([
  {
    id: 1,
    name: 'Bad Bunny',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 2,
    name: 'Rauw Alejandro',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 3,
    name: 'KAROL G',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 4,
    name: 'Myke Towers',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 5,
    name: 'Quevedo',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 6,
    name: 'Duki',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 7,
    name: 'Feid',
    image: '/placeholder.svg?height=200&width=200'
  }
]);

const playSong = (song) => {
  const playerStore = usePlayerStore();
  playerStore.setCurrentSong(song);
  playerStore.play();
};
</script>

<template>
  <div class="main-content">
    <section class="trending-section">
      <div class="section-header">
        <h2>Canciones en tendencia</h2>
        <a href="#" class="show-all">Mostrar todos</a>
      </div>
      <div class="cards-grid">
        <AlbumCard 
          v-for="song in trendingSongs" 
          :key="song.id" 
          :title="song.title" 
          :artist="song.artist" 
          :cover="song.cover"
          @click="playSong(song)"
        />
      </div>
    </section>

    <section class="artists-section">
      <div class="section-header">
        <h2>Artistas populares</h2>
        <a href="#" class="show-all">Mostrar todos</a>
      </div>
      <div class="artists-grid">
        <ArtistCard 
          v-for="artist in popularArtists" 
          :key="artist.id" 
          :name="artist.name" 
          :image="artist.image"
        />
      </div>
    </section>

    <section class="albums-section">
      <div class="section-header">
        <h2>Álbumes y sencillos populares</h2>
        <a href="#" class="show-all">Mostrar todos</a>
      </div>
      <div class="cards-grid">
        <AlbumCard 
          v-for="song in trendingSongs.slice(0, 5)" 
          :key="`album-${song.id}`" 
          :title="song.title" 
          :artist="song.artist" 
          :cover="song.cover"
          @click="playSong(song)"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  padding: 0 32px 32px;
  overflow-y: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
}

.show-all {
  color: #b3b3b3;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: color 0.2s ease;
}

.show-all:hover {
  color: #ffffff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.trending-section, .artists-section, .albums-section {
  margin-bottom: 48px;
}
</style>
