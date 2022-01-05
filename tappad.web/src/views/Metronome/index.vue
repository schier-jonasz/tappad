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
                v-model="beat"
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
                v-model="note"
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
  import tapDown from '@/assets/sounds/down.wav';
  import * as Tone from "tone";



  export default {
    name: "metronome",
    data: () => ({
        isPlaying: false,
        settings: false,
        colors,
        bpm: 120,
        beat: 4,
        note: 4,
        metronome: null,
        tone: Tone,
        transport: Tone.Transport,
        toneLoop: null,
        audio: new Audio(audio),
        part: null,
        counter: 0,
    }),
    components: {
    },
    methods: {
      playStopMetronome() {
        let note = this.note + 'n';
        
        this.isPlaying = !this.isPlaying;
        this.transport.bpm.value = this.bpm;
        this.transport.timeSignature = this.beat + '/' + this.note;

        //initiate tone player to play mp3/wav
        // var bufferTap = new Tone.Buffer(tapDown);
        // var bufferAccent = new Tone.Buffer(audio);
        // var player = new Tone.Players({
        //   'regularTap': bufferTap,
        //   'accent': bufferAccent,
        // });

        const regularTap = new Tone.Player({
          url: tapDown,
        }).toDestination();
        const accent = new Tone.Player(audio).toDestination();
        
        
        //base interval to play metronome
        if (this.toneLoop == null) {
          this.toneLoop = this.createToneLoop(regularTap, accent)
        }
        this.toneLoop.set({interval: note});
        
        this.isPlaying ? this.start() : this.stop();
        // watch - https://indiebubbler.github.io/metro/
      },
      start() {
        this.tone.loaded().then(() => {
          this.transport.start();
          this.toneLoop.start(0);
        });
      },
      stop() {
        this.transport.stop();
        this.toneLoop.stop(0);
        this.counter = 0;
      },
      createToneLoop(regularTap, accent) {
        const loop = new Tone.Loop((time) => {          
          if (this.counter % this.beat === 0) {
            accent.start(time);
          } else {
            regularTap.start(time);
          }
          this.counter++;
        });
        return loop;
      },
      openSettings() {
        this.settings = !this.settings;
      },
      closeSettings() {
        this.settings = false;
      },
    },
    watch: {
      setTempo(bpm) {
        this.bpm = bpm;
        this.transport.bpm.value = this.bpm;
        console.log(this.bpm);
      }
    },
    async created() {
      await Tone.start();
    }
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
        width: 56px;        
      }

      &__input * {
        margin: 0;
        text-align: center;
        width: 72px;
      }

      &__input input {
        /* background-color: cyan; */
        box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
        padding: 8px 8px !important;
      }

      &__description {
        text-transform: uppercase;
        font-weight: bold;
        color: grey;
        margin-left: 8px;
      }

      &__divider {
        width: 110px;
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