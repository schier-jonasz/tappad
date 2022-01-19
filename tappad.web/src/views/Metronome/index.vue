<template>
  <main class="content">
    <div class="header">
      <h1 class="header__title ml-5">Metronome</h1>
      <p class="header__description ml-7"
        color="primary">Enjoy the beat 😊🥁</p>
    </div>
    <v-btn 
      class="content__settings"
      outlined
      icon
      large
      :color="colors.red"
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
                :disabled="isPlaying"
                item-text="name"
                item-value="path"
                :item-disabled="disabledRegularTap"
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
                :disabled="!isAccentEnabled || isPlaying"
                item-text="name"
                item-value="path"
                :item-disabled="disableAccent"
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
                v-model="isAccentEnabled"
                inset
            ></v-switch>
            </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-list-item-subtitle>
            BPM
          </v-list-item-subtitle>
          <v-row aling="center">
            <v-col class="pt-5">
              <Keypress :disabled="isPlaying" key-event="keyup" :key-code="32" @success="calculateTapBpm"/>
              <v-btn
                :color="colors.blue"
                outlined
                :disabled="isPlaying"
                @click="calculateTapBpm()">
                tap
              </v-btn>
            </v-col>
            <v-col class="tap-bpm pt-7 font-weight-bold" v-if="tapCounter > 2">
              {{ tapBpm }}
            </v-col>
          </v-row>
        </v-container>
      </v-list-item>
    </v-navigation-drawer>
    <!-- End settings drawer -->

    <!--METRONOME SECTION -->
    <v-container class="mt-10">
      <v-col  
        align="center"
        justify="center">
        <!-- Metrum -->
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
        <!-- End Metrum -->
      </v-col>
      <!-- Metronome circle -->
      <v-col 
        align="center"
        justify="center">
        <v-card 
          elevation="3"
          class="beat rounded-circle">
          <v-text-field
            class="beat__input"
            v-model="setBpm"
            @input="validateBpm"
            type="number"
            ></v-text-field>
          <p class="beat__bpm">BPM</p>
        </v-card>
      </v-col>
      <!-- End Metronome circle -->
      <!-- Volume -->
      <v-slider
        v-model="setPlayerVolume"
        prepend-icon="mdi-volume-high"
        max="100"
        min="0"
        :thumb-size="24"
        thumb-label
        class="volume-slider"
      ></v-slider>
      <!-- End volume -->
      <!-- Start/stop button -->
      <v-col 
        align="center"
        justify="center">
        <v-btn 
          outlined 
          icon 
          large
          :color="colors.red"
          @click="playStopMetronome()">
          <v-icon v-if="!isPlaying">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>  
      </v-col>
      <!-- End start/stop button -->
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
        counter: 0,
        regularTap: null,
        accent: null,
        regularTapPath: sounds[0].path,
        accentPath: sounds[1].path,
        sounds,
        setPlayerVolume: 100,
        isAccentEnabled: true,
        tapBpm: 0,
        tapCounter: 0,
    }),
    components: {
      Keypress: () => import('vue-keypress'),
    },
    methods: {
      playStopMetronome() {
        this.isPlaying = !this.isPlaying; 
        this.isPlaying ? this.start() : this.stop();
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
          if (this.isAccentEnabled && this.counter % this.beat === 0) {
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
        this.tapCounter = 0;
      },
      validateBpm(value) {
        console.log(value.length); //TODO - validation bpm
      },
      disableAccent(item) {
        return item.path === this.regularTapPath;
      },
      disabledRegularTap(item) {
        return item.path === this.accentPath;
      },
      calculateTapBpm() {
        this.tapCounter += 1;
        let elapsedTime = Tone.Transport.seconds;
        Tone.Transport.stop().start();
        let bpm = (60 / elapsedTime).toFixed(0);
        this.tapBpm = bpm;
        console.log('BPM: ', bpm);
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

<style lang="scss" scoped>
  @import "@/assets/styles/_colors.scss";

  .content {
    position: relative;

    &__settings {
      position: absolute;
      top: 72px;
      right: 24px;
    }
  }

  .header {
    &__title {
      font-size: 4em;
      color: $navy-blue;
    }

    &__description {
      font-size: 1.5em;
      font-weight: 600;
      color: $red;
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

    ::v-deep .v-input input {
      text-align: center !important;
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

      ::v-deep &__input * {
        margin: 0;
        text-align: center;
        width: 54px;
      }

      ::v-deep &__input input {
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

  ::v-deep .volume-slider .v-input__slot {
    margin: 0;
  }

  ::v-deep .volume-slider .v-input__control .v-messages {
    display: none;
  }

  .tap-bpm {
    color: $navy-blue;
  }
</style>