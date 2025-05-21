import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const usePlayerStore = defineStore("player", () => {
  const audio = new Audio()
  const currentSong = ref(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const queue = ref([])
  const currentIndex = ref(-1)

  // Update current time while playing
  audio.addEventListener("timeupdate", () => {
    currentTime.value = audio.currentTime
  })

  // Update duration when metadata is loaded
  audio.addEventListener("loadedmetadata", () => {
    duration.value = audio.duration
  })

  // Handle song end
  audio.addEventListener("ended", () => {
    next()
  })

  // Watch for changes to currentSong and update audio source
  watch(currentSong, (newSong) => {
    if (newSong) {
      audio.src = newSong.audioUrl
      audio.load()
      if (isPlaying.value) {
        audio.play()
      }
    }
  })

  // Play the current song
  const play = () => {
    if (currentSong.value) {
      audio
        .play()
        .then(() => {
          isPlaying.value = true
        })
        .catch((error) => {
          console.error("Error playing audio:", error)
        })
    }
  }

  // Pause the current song
  const pause = () => {
    audio.pause()
    isPlaying.value = false
  }

  // Seek to a specific time
  const seek = (time) => {
    if (audio.src) {
      audio.currentTime = time
    }
  }

  // Set the volume (0-1)
  const setVolume = (volume) => {
    audio.volume = volume
  }

  // Set the current song
  const setCurrentSong = (song) => {
    currentSong.value = song

    // Add to queue if not already in it
    const songIndex = queue.value.findIndex((s) => s.id === song.id)
    if (songIndex === -1) {
      queue.value.push(song)
      currentIndex.value = queue.value.length - 1
    } else {
      currentIndex.value = songIndex
    }
  }

  // Play the next song in the queue
  const next = () => {
    if (queue.value.length === 0) return

    if (currentIndex.value < queue.value.length - 1) {
      currentIndex.value++
      currentSong.value = queue.value[currentIndex.value]
      play()
    } else {
      // Loop back to the beginning
      currentIndex.value = 0
      currentSong.value = queue.value[0]
      play()
    }
  }

  // Play the previous song in the queue
  const previous = () => {
    if (queue.value.length === 0) return

    // If we're more than 3 seconds into the song, restart it
    if (currentTime.value > 3) {
      audio.currentTime = 0
      return
    }

    if (currentIndex.value > 0) {
      currentIndex.value--
      currentSong.value = queue.value[currentIndex.value]
      play()
    } else {
      // Loop to the end
      currentIndex.value = queue.value.length - 1
      currentSong.value = queue.value[currentIndex.value]
      play()
    }
  }

  // Add a song to the queue
  const addToQueue = (song) => {
    queue.value.push(song)
  }

  return {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    queue,
    play,
    pause,
    seek,
    setVolume,
    setCurrentSong,
    next,
    previous,
    addToQueue,
  }
})
