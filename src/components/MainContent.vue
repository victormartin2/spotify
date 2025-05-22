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
    cover: 'https://i.scdn.co/image/ab67616d0000b273b661d9d73921e40ae97cb5e4',
    audioUrl: 'https://youtu.be/ymvYySd_P2E?si=btJC2yGhWZF6dzBU'
  },
  {
    id: 2,
    title: 'Quevedo: Columbia',
    artist: 'Quevedo',
    cover: 'https://i.scdn.co/image/ab67616d0000b2730483b3a4d787ce510915fe3b',
    audioUrl: 'https://youtu.be/NH4W8BOaSiE'
  },
  {
    id: 3,
    title: 'Feid, Young Miko: Classy 101',
    artist: 'Feid, Young Miko',
    cover: 'https://i.scdn.co/image/ab67616d0000b27329ebee2b5fb008871fcd201a',
    audioUrl: 'https://youtu.be/2J9xYVcP4MA'
  },
  {
    id: 4,
    title: 'Myke Towers: LALA',
    artist: 'Myke Towers',
    cover: 'https://i.scdn.co/image/ab67616d0000b2730656d5ce813ca3cc4b677e05',
    audioUrl: 'https://youtu.be/o6aJJ6Q5zhg'
  },
  {
    id: 5,
    title: 'Bad Bunny: MONACO',
    artist: 'Bad Bunny',
    cover: 'https://i1.sndcdn.com/artworks-wLNoU8Pdpdyf-0-t500x500.jpg',
    audioUrl: 'https://youtu.be/0B1ujEFubrE'
  },
  {
    id: 6,
    title: 'Rauw Alejandro: TOCAME',
    artist: 'Rauw Alejandro',
    cover: 'https://i.scdn.co/image/ab67616d00001e023d97cd87f1d68903bf1ea3a6',
    audioUrl: 'https://youtu.be/BN51wp_7cq8'
  },
  {
    id: 7,
    title: 'Karol G: S91',
    artist: 'Karol G',
    cover: 'https://upload.wikimedia.org/wikipedia/en/8/82/Karol_G_-_S91.png',
    audioUrl: 'https://youtu.be/OHAZHNFh4nU'
  }
]);

const popularArtists = ref([
  {
    id: 1,
    name: 'Bad Bunny',
    image: 'https://yt3.googleusercontent.com/Ys37SrZ6B7RUW8_X3YvQet7VCFNnWa5C5PXe09OgIoY9UkTt1GpP_zap1-w2VF5gZcyS5xQmbJs=s900-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 2,
    name: 'Rauw Alejandro',
    image: 'https://yt3.googleusercontent.com/JD-cLRT77JduE_GNlrfuaCptWyBbbYehC8y8y0odSCyxYOuASRBFHNfE-CPKpNfjRi00SKlKbtM=s900-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 3,
    name: 'KAROL G',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4b0754aefc9db490e02205ec'
  },
  {
    id: 4,
    name: 'Myke Towers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Myke_Towers_in_interview_-_Tony_Dandrades_-_2021.png'
  },
  {
    id: 5,
    name: 'Quevedo',
    image: 'https://yt3.googleusercontent.com/lUkgGqUdmDu6JlftN606h8O9lNpH_9sFX6xR5VnVOV6Usbv-2SNz5GRCit5C4wdJLIsAfClZ=s900-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 6,
    name: 'Duki',
    image: 'https://image.europafm.com/clipping/cmsimages02/2023/02/23/2FD6FEED-0AC4-44A0-B698-B02B33535C80/duki_104.jpg?crop=720,720,x341,y0&width=1200&height=1200&optimize=low&format=webply'
  },
  {
    id: 7,
    name: 'Feid',
    image: 'https://i.scdn.co/image/ab67616100005174f85ef172c33b0a5a2127fe1e'
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
