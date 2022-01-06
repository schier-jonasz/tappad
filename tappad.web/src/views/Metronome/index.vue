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

      <v-list-item dense>
        <v-container fluid>
          <v-list-item-subtitle>
          Sounds
        </v-list-item-subtitle>
          <v-row align="center">
            <v-col class="pt-4 pb-0">
              Regular tap
            </v-col>
            <v-col class="py-0">
              <v-select
                v-model="regularTapPath"
                :items="sounds"
                @change="checkAccent"
                :disabled="isPlaying"
                item-text="name"
                item-value="path"
                label="Tap"
                single-line
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="py-0">
              Accent
            </v-col>
            <v-col class="py-0">
              <v-select
                v-model="accentPath"
                :items="sounds"
                :disabled="!ifAccent || isPlaying"
                item-text="name"
                item-value="path"
                :item-disabled="disableItem"
                label="Accent"
                single-line
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row> 
          <v-divider class="my-3"></v-divider>
          <v-list-item-subtitle>
            Accent
          </v-list-item-subtitle>
          <v-row aling="center">
            <v-col class="py-0">
              <v-switch
                v-model="ifAccent"
                inset
            ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item>
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
            v-model="setBpm"
            @input="validateBpm"
            type="number"
            class="beat__input"
            ></v-text-field>
          <p class="beat__bpm">BPM</p>
        </v-card>
      </v-col>
      <v-slider
        v-model="setPlayerVolume"
        prepend-icon="mdi-volume-high"
        max="100"
        min="0"
        :thumb-size="24"
        thumb-label
        class="volume-slider"
      ></v-slider>
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

  import { sounds } from '@/assets/js/exportSounds';

  import * as Tone from "tone";



  export default {
    name: "metronome",
    data: () => ({
        isPlaying: false,
        settings: false,
        colors,
        setBpm: 120,
        beat: 4,
        note: 4,
        tone: Tone,
        transport: Tone.Transport,
        toneLoop: null,
        part: null,
        counter: 0,
        playerVolume: 100,
        regularTap: null,
        accent: null,
        regularTapPath: sounds[0].path,
        accentPath: sounds[1].path,
        sounds,
        setPlayerVolume: 100,
        ifAccent: true,
    }),
    components: {
    },
    methods: {
      playStopMetronome() {
        this.isPlaying = !this.isPlaying;
        
        this.isPlaying ? this.start() : this.stop();
        // watch - https://indiebubbler.github.io/metro/
      },
      start() {
        let note = this.note + 'n';
        this.transport.bpm.value = this.setBpm;
        this.transport.timeSignature = this.beat + '/' + this.note;

        //initiate tone player to play mp3/wav
        this.createAudioPlayers(this.regularTapPath, this.accentPath);

        this.toneLoop = this.createToneLoop();
        this.toneLoop.set({interval: note});

        this.tone.loaded().then(() => {
          this.transport.start();
          this.toneLoop.start(0);
        });
      },
      stop() {
        this.transport.stop();

        this.toneLoop.stop(0);
        this.toneLoop.dispose();

        this.regularTap.stop();
        this.accent.stop();

        this.regularTap.dispose();
        this.accent.dispose();

        this.counter = 0;
      },
      createToneLoop() {
        const loop = new Tone.Loop((time) => { 
          if (this.ifAccent && this.counter % this.beat === 0) {
            this.accent.start(time);
          } else {
            this.regularTap.start(time);
          }
          this.counter++;     
        });
        return loop;
      },
      createAudioPlayers(regularTapPath, accentPath) {
        this.accent = new Tone.Player(accentPath).toDestination();
        this.regularTap = new Tone.Player(regularTapPath).toDestination();

        this.regularTap.volume.input.value = this.setPlayerVolume / 100;
        this.accent.volume.input.value = this.setPlayerVolume / 100;
      },
      openSettings() {
        this.settings = !this.settings;
      },
      closeSettings() {
        this.settings = false;
      },
      validateBpm(value) {
        console.log(value.length);
      },
      disableItem(item) {
        return item.path === this.regularTap;
      },
      checkAccent(item) {
        if (item === this.accent) {
          // this.accent = null;
        }
      }
    },
    watch: {
      setBpm(bpm) {
        this.transport.bpm.value = bpm;
      },
      setPlayerVolume(volume) {
        this.regularTap.volume.input.value = volume / 100;
        this.accent.volume.input.value = volume / 100;
      },
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

  .volume-slider {
    width: 50%;
    margin: 0 auto;
    align-items: center;
  }

  .volume-slider .v-input__slot {
    margin: 0;
  }

  .volume-slider .v-input__control .v-messages {
    display: none;
  }
</style>