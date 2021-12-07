<template>
  <div>
    <h1>Metronome</h1>
    <v-btn 
      elevation="2"
      color="primary"
      @click="playBubble">Bubble</v-btn>
    <v-btn 
      elevation="2"
      color="purple"
      @click="playPulse">Pulse</v-btn>
    <v-btn 
      elevation="2"
      color="orange"
      @click="playWood">Wood</v-btn>
    <PlayButton/>
  </div>
</template>

<script>
  import sound from 'vue-use-sound';
  import bubbleTap from '@/assets/sounds/bubble-tap.mp3';
  import metronomePulse from '@/assets/sounds/metronome-pulse.flac';
  import woodTap from '@/assets/sounds/wood-tap.mp3';

  import PlayButton from './components/playButton';


  export default {
    name: "metronome",
    setup() {
      const playBubble = sound(bubbleTap);
      const playPulse = sound(metronomePulse);
      const playWood = sound(woodTap);
      return {
        playBubble,
        playPulse,
        playWood
      }
    },
    components: {
      PlayButton,
    },
  };
</script>
