<template>
  <main class="content">
    <div>
      <h1 class="ml-4">Metronome</h1>
      <p class="ml-6 secondary--text font-weight-light"
        color="primary">Enjoy the beat 😊🥁</p>
    </div>
    <v-btn 
      class="content__settings"
      outlined
      icon
      large
      @click="openSettings()">
        <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        
      </v-list>
    </v-navigation-drawer>

    <v-container class="mt-10">
      <v-col  
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
            <p class="metrum__description">beat</p>
          </v-row>
          <v-divider class="metrun__divider"></v-divider>
          <v-row class="metrum__row">
            <v-col class="metrum__col">
              <v-text-field
                solo
                flat
                class="metrum__input">
              </v-text-field>
            </v-col>
            <p class="metrum__description">note</p>
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
        drawer: null,
        colors,
        loop: null,
        bmp: 120,
        metronome: new clickTime(playBubble, 60000 / 60, { immediate: true }),
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
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

      },
      openSettings() {
        this.drawer = !this.drawer;
        console.log(this.drawer);
      }
    }
  };
</script>

<style lang="scss">
  .content {
    position: relative;

    &__settings {
      position: absolute;
      top: 106px;
      right: 24px;
    }
  }

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
        max-width: 120px !important;
        margin: 0 !important;
        max-height: 48px;
      }

      &__col {
        max-width: 48px !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      &__input {
        width: 48px;
      }

      &__input * {
        margin: 0;
        text-align: center;
      }

      &__input input {
        /* background-color: cyan; */
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      }

      &__description {
        text-transform: uppercase;
        font-weight: bold;
        color: grey;
      }
  }

  .v-divider {
    width: 90px;
    margin-left: 22px;  
  }
</style>