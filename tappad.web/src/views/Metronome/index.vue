<template>
  <main>
    <div>
      <h1 class="ml-4">Metronome</h1>
      <p class="ml-6 secondary--text font-weight-light"
        color="primary">Enjoy the beat 😊🥁</p>
    </div>

    <v-container class="mt-16">
      <v-col 
        class="cyan" 
        align="center"
        justify="center">
        <v-container class="metrum">
          <v-row class="metrum__row">
            <v-col class="metrum__col">
              <v-text-field
                solo
                flat
                class="metrum__input">             
              </v-text-field>
            </v-col>
            <v-row>
              <p>beat</p>
            </v-row>
          </v-row>
          <v-row class="metrum__row">
            <v-col class="metrum__col">
              <v-text-field
                solo
                flat
                class="metrum__input">
              </v-text-field>
            </v-col>
            <v-row>
              <p>note</p>
            </v-row>
          </v-row>
        </v-container>
      </v-col>
      <v-col 
        class="" 
        align="center"
        justify="center">
        <v-card 
          elevation="3"
          class="beat rounded-circle">
          <v-text-field 
            type="number" 
            class="beat__input"
            value="120"></v-text-field>
          <p class="beat__bpm">BMP</p>
        </v-card>
      </v-col>
      <v-col 
        align="center"
        justify="center">
        <v-btn outlined icon large>
          <v-icon v-if="!isPlaying">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>  
      </v-col>
    </v-container>
  </main>
</template>

<script>
  import sound from 'vue-use-sound';
  import bubbleTap from '@/assets/sounds/bubble-tap.mp3';
  import metronomePulse from '@/assets/sounds/metronome-pulse.flac';
  import woodTap from '@/assets/sounds/wood-tap.mp3';

  import colors from '@/assets/styles/_colors.scss';  
  import clickTime from '@/assets/js/timeClick';



  export default {
    name: "metronome",
    data: () => ({
        isPlaying: false,
        colors,
        loop: null,
        bmp: 120,
        metronome: new clickTime(playBubble, 60000 / 60, { immediate: true }),
    }),
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
    },
    methods: {
      playStopMetronome() {

      }
    }
  };
</script>

<style lang="scss">
  .beat {
    width: 300px; 
    height: 300px; 
    padding: 16px;
    position: relative;

    &__input {
      position: absolute;
      top: 25%;
      left: 50%;
      min-width: 200px;
      transform: translate(-50%, 0);
    }

    &__input input {
      text-align: center;
      font-size: 6em;
      overflow: visible;
      padding: 8px;
      min-height: 96px;
      min-width: 96px;
    }

    &__bpm {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 10%;
      text-transform: uppercase;
      font-size: 1.25em;
      font-weight: bold;
      color: grey;
    }
  }

  .metrum {

      &__row {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &__input {

        width: 48px;
      }

      &__input * {
        margin: 0;
        text-align: center;
      }
  }
</style>