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

    <!-- Settings drawer -->
    <v-navigation-drawer
      v-model="settings"
      temporary
      right
      absolute
      hide-overlay
      class="settings-drawer"
    >
      <v-list-item class="settings-header">
        <v-list-item-content>
          <v-list-item-title class="settings-header__title">Settings</v-list-item-title>
        </v-list-item-content>
        <v-btn 
          icon
          large
          @click="closeSettings()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        
      </v-list>
    </v-navigation-drawer>
    <!-- End settings drawer -->

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
                type="number"
                class="metrum__input">             
              </v-text-field>
            </v-col>
            <p class="metrum__description">beat</p>
          </v-row>
          <v-divider class="metrum__divider"></v-divider>
          <v-row class="metrum__row">
            <v-col class="metrum__col">
              <v-text-field
                solo
                flat
                type="number"
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
            v-model="bpm"
            type="number" 
            class="beat__input"
            ></v-text-field>
          <p class="beat__bpm">BPM</p>
        </v-card>
      </v-col>
      <v-col 
        align="center"
        justify="center">
        <v-btn 
          outlined 
          icon 
          large
          @click="playStopMetronome()">
          <v-icon v-if="!isPlaying">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>  
      </v-col>
    </v-container>
  </main>
</template>

<script>
  import colors from '@/assets/styles/_colors.scss';  
  import audio from '@/assets/sounds/click1.mp3';
  import * as Tone from "tone";



  export default {
    name: "metronome",
    data: () => ({
        isPlaying: false,
        settings: false,
        colors,
        loop: null,
        bpm: 120,
        metronome: null,
        timer: null,
        synth: new Tone.Synth().toDestination(),
        now: null,
        osc: new Tone.Oscillator().toDestination(),
        transport: Tone.Transport,
        audio: new Audio(audio),
        part: null,
    }),
    components: {
    },
    methods: {
      playStopMetronome() {
        this.isPlaying = !this.isPlaying;

        this.transport.bpm.value = this.bpm;
        /*
        this.transport.scheduleRepeat((time) => {
          console.log(time);
          this.osc.start(time).stop(time + 0.03);
        }, "4n");
        */
        // console.log(this.transport.state, this.isPlaying);

        this.part = new Tone.Part((time, note) => {
          console.log(time, note);
        }, []);
        this.part.loop = true;
        this.part.start(0);
        this.isPlaying ? this.start() : this.stop();
        // watch - https://indiebubbler.github.io/metro/
      },
      start() {
        console.log('wloz');
        this.transport.start("+.1");
        this.part.start();
      },
      stop() {
        this.transport.stop();
        this.transport.position = 0;
      },
      openSettings() {
        this.settings = !this.settings;
      },
      closeSettings() {
        this.settings = false;
      },
      playClick() {
        console.log('click');
        this.audio.play();
      },
    },
    watch: {
      updateNow() {
         this.now = Tone.now();
         console.log(this.now);
      }
    }
    // created() {
    //     console.log("Yea, created broh");
    //     new this.Tone();
    //     console.log('nope');
    // }
  };
</script>

<style lang="scss">
  .content {
    position: relative;

    &__settings {
      position: absolute;
      top: 72px;
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
        max-width: 80px !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      &__input {
        width: 48px;
      }

      &__input * {
        margin: 0;
        text-align: center;
        width: 64px;
      }

      &__input input {
        /* background-color: cyan; */
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        padding: 8px 8px !important;
      }

      &__description {
        text-transform: uppercase;
        font-weight: bold;
        color: grey;
      }

      &__divider {
        width: 100px;
        margin-left: 32px; 
      }
  }

  .settings-header {
    &__title {
      font-weight: bold;
      font-size: 1.25em;
    }
  }
</style>