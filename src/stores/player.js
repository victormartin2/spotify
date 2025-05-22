import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const usePlayerStore = defineStore("player", () => {
  // Estado del reproductor
  const currentSong = ref(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const queue = ref([])
  const currentIndex = ref(-1)
  const volume = ref(0.7)

  // YouTube player
  let player = null
  let playerReady = false
  let playerInterval = null

  // Inicializar YouTube API
  const initYouTubeAPI = () => {
    return new Promise((resolve) => {
      // Si ya existe el script de la API, resolvemos inmediatamente
      if (window.YT) {
        resolve()
        return
      }

      // Crear script para cargar la API de YouTube
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      // Cuando la API esté lista, resolver la promesa
      window.onYouTubeIframeAPIReady = () => {
        resolve()
      }
    })
  }

  // Crear el reproductor de YouTube
  const createYouTubePlayer = () => {
    // Si ya existe un player, lo destruimos
    if (player) {
      player.destroy()
    }

    // Crear un div para el player si no existe
    let playerElement = document.getElementById("youtube-player")
    if (!playerElement) {
      playerElement = document.createElement("div")
      playerElement.id = "youtube-player"
      playerElement.style.position = "absolute"
      playerElement.style.opacity = "0"
      playerElement.style.pointerEvents = "none"
      playerElement.style.height = "1px"
      playerElement.style.width = "1px"
      document.body.appendChild(playerElement)
    }

    // Crear el player
    return new Promise((resolve) => {
      player = new window.YT.Player("youtube-player", {
        height: "1",
        width: "1",
        videoId: currentSong.value ? extractYouTubeId(currentSong.value.audioUrl) : "",
        playerVars: {
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            playerReady = true
            player.setVolume(volume.value * 100)
            resolve()
          },
          onStateChange: (event) => {
            // -1: no iniciado, 0: terminado, 1: reproduciendo, 2: pausado, 3: buffering, 5: video en cola
            if (event.data === window.YT.PlayerState.PLAYING) {
              isPlaying.value = true
              startTimeTracking()
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              isPlaying.value = false
              stopTimeTracking()
            } else if (event.data === window.YT.PlayerState.ENDED) {
              next()
            }
          },
        },
      })
    })
  }

  // Extraer el ID de YouTube de una URL
  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Iniciar seguimiento del tiempo de reproducción
  const startTimeTracking = () => {
    stopTimeTracking()
    playerInterval = setInterval(() => {
      if (player && playerReady) {
        currentTime.value = player.getCurrentTime() || 0
        duration.value = player.getDuration() || 0
      }
    }, 1000)
  }

  // Detener seguimiento del tiempo
  const stopTimeTracking = () => {
    if (playerInterval) {
      clearInterval(playerInterval)
      playerInterval = null
    }
  }

  // Cargar canción actual en el reproductor
  const loadCurrentSong = async () => {
    if (!currentSong.value) return

    if (!window.YT) {
      await initYouTubeAPI()
    }

    if (!player) {
      await createYouTubePlayer()
    } else if (playerReady) {
      const videoId = extractYouTubeId(currentSong.value.audioUrl)
      player.loadVideoById(videoId)
      player.pauseVideo()
    }
  }

  // Watch para cambios en la canción actual
  watch(currentSong, async (newSong) => {
    if (newSong) {
      await loadCurrentSong()
      if (isPlaying.value) {
        play()
      }
    }
  })

  // Watch para cambios en el volumen
  watch(volume, (newVolume) => {
    if (player && playerReady) {
      player.setVolume(newVolume * 100)
    }
  })

  // Reproducir
  const play = async () => {
    if (!currentSong.value) return

    if (!player || !playerReady) {
      await loadCurrentSong()
    }

    if (player && playerReady) {
      player.playVideo()
      isPlaying.value = true
    }
  }

  // Pausar
  const pause = () => {
    if (player && playerReady) {
      player.pauseVideo()
      isPlaying.value = false
    }
  }

  // Buscar una posición específica
  const seek = (time) => {
    if (player && playerReady) {
      player.seekTo(time, true)
    }
  }

  // Establecer volumen
  const setVolume = (newVolume) => {
    volume.value = newVolume
    if (player && playerReady) {
      player.setVolume(newVolume * 100)
    }
  }

  // Establecer canción actual
  const setCurrentSong = (song) => {
    currentSong.value = song

    // Añadir a la cola si no está ya
    const songIndex = queue.value.findIndex((s) => s.id === song.id)
    if (songIndex === -1) {
      queue.value.push(song)
      currentIndex.value = queue.value.length - 1
    } else {
      currentIndex.value = songIndex
    }
  }

  // Siguiente canción
  const next = () => {
    if (queue.value.length === 0) return

    if (currentIndex.value < queue.value.length - 1) {
      currentIndex.value++
      currentSong.value = queue.value[currentIndex.value]
    } else {
      // Volver al principio
      currentIndex.value = 0
      currentSong.value = queue.value[0]
    }
  }

  // Canción anterior
  const previous = () => {
    if (queue.value.length === 0) return

    // Si llevamos más de 3 segundos, reiniciar la canción
    if (currentTime.value > 3) {
      seek(0)
      return
    }

    if (currentIndex.value > 0) {
      currentIndex.value--
      currentSong.value = queue.value[currentIndex.value]
    } else {
      // Ir al final
      currentIndex.value = queue.value.length - 1
      currentSong.value = queue.value[currentIndex.value]
    }
  }

  // Añadir a la cola
  const addToQueue = (song) => {
    queue.value.push(song)
  }

  // Limpiar al desmontar
  const cleanup = () => {
    stopTimeTracking()
    if (player) {
      player.destroy()
      player = null
      playerReady = false
    }
  }

  return {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    queue,
    volume,
    play,
    pause,
    seek,
    setVolume,
    setCurrentSong,
    next,
    previous,
    addToQueue,
    cleanup,
  }
})
