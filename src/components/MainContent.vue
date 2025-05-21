<script setup>
import { ref } from 'vue';
import AlbumCard from './AlbumCard.vue';
import ArtistCard from './ArtistCard.vue';
import { usePlayerStore } from '../stores/player';

const trendingSongs = ref([
  {
    id: 1,
    title: 'DROGA',
    artist: 'Mora, C.Tangana',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'no tiene sentido',
    artist: 'Beéle',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    title: 'Esa Diva',
    artist: 'Melody',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 4,
    title: 'Espresso Macchiato',
    artist: 'Tommy Cash',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 5,
    title: 'Hiekka',
    artist: 'Nicky Jam, Beéle',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 6,
    title: 'REMEDIO',
    artist: 'JC Reyes, Pirlo',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    id: 7,
    title: 'Te Colaboro - Remix',
    artist: 'Bray, Feid, De La Rose, Yan Block',
    cover: '/placeholder.svg?height=200&width=200',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
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
    name: 'JC Reyes',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 7,
    name: 'W Sound',
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
