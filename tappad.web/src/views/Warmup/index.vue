<template>
  <main class="content">
    <div class="header">
      <h1 class="header__title ml-5">Warmup</h1>
      <p class="header__description ml-7">
        Your fingers should be on 🔥!
      </p>
    </div>
        <!--METRONOME SECTION -->
    <v-container class="mt-5">
      <v-col  
        align="center"
        justify="center">
      </v-col>
      <!-- Metronome circle -->
      <v-col 
        align="center"
        justify="center">
        <v-card 
          elevation="3"
          class="beat rounded-circle">
          <p class="beat__value">{{ rangeBpm[0] }}</p>
          <p class="beat__bpm">actual bpm</p>
          <div 
            class="beat__time-bar"
            data-style="smooth"
            >
            <div 
              class="beat__time-bar--in"
              v-if="isPlaying"
              :style="{
              animationDuration: animationDuration
              }"
              :key="animationTrigger">
            </div>
          </div>
          <p class="beat__time">TIME LEFT</p>
        </v-card>
      </v-col>
      <!-- End Metronome circle -->
      <!-- Volume -->
      <v-slider
        prepend-icon="mdi-volume-high"
        max="100"
        min="0"
        :thumb-size="24"
        thumb-label
        class="volume-slider"
        v-model="setPlayerVolume"
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
          <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
        </v-btn>  
      </v-col>
      <!-- End start/stop button -->
    </v-container>
    <!-- SETTINGS Section -->
    <v-container class="mt-8">
      <v-row justify="center">
        <v-btn-toggle 
          v-model="selectedOption"
          mandatory
          :color="colors.red">
        <v-btn value="time">
          SET YOUR TIME
        </v-btn>
        <v-btn value="infinity">
          ONE WAY TICKET
        </v-btn>
      </v-btn-toggle>
      </v-row>
      <!-- TIME OPTIONS Container -->
      <v-row 
        class="flex-column mt-10" 
        justify="center" 
        align="center">
          <p class="option-title">Range BPM</p>
          <div class="option-slider">
            <v-range-slider
              v-model="rangeBpm"
              :max="maxBpm"
              :min="minBpm"
              hide-details
              class="align-center"
              :thumb-size="32"
              thumb-label
            >
              <template v-slot:prepend>
                <v-text-field
                  :value="rangeBpm[0]"
                  class="range-input mt-0 pt-0"
                  hide-details
                  single-line
                  solo
                  flat
                  type="number"
                  @change="$set(rangeBpm, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :value="rangeBpm[1]"
                  class="range-input mt-0 pt-0"
                  hide-details
                  single-line
                  solo
                  flat
                  type="number"
                  @change="$set(rangeBpm, 1, $event)"
                ></v-text-field>
              </template>
              <template v-slot:thumb-label="{ value }">
                {{ satisfactionEmojis[Math.min(Math.floor(value / 47), 13)] }}
              </template>
            </v-range-slider>
          </div>
        </v-row>
      <v-container 
        v-if="selectedOption == 'time'"
        class="time-options py-0">
        <v-row class="flex-column mt-7" justify="center" align="center">
          <p class="option-title">Warmup time</p>
          <div class="d-flex justify-center align-center" style="width: 320px">
            <v-col justify="center" style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="warmupTime == 1 ? true : false"
                @click="warmupTime--"
              >
                <v-icon>
                  mdi-minus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col style="text-align: center">
              {{ warmupTime }} minutes
            </v-col>
            <v-col style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="warmupTime == 120 ? true : false"
                @click="warmupTime++"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-row>
        <v-row class="flex-column mt-7" justify="center" align="center">
          <p class="option-title">Steps</p>
          <div class="d-flex justify-center align-center" style="width: 320px">
            <v-col style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="warmupStep == 1 ? true : false"
                @click="warmupStep--"
              >
                <v-icon>
                  mdi-minus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col style="text-align: center">
              {{ warmupStep }}
            </v-col>
            <v-col style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="warmupStep == 50 ? true : false"
                @click="warmupStep++"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-row>
      </v-container>
      <!-- End - TIME OPTIONS Container -->
      <!-- INFINITY OPTIONS Container -->
      <v-container 
        v-if="selectedOption == 'infinity'"
        class="infinity-options py-0">
        <v-row class="flex-column mt-7" justify="center" align="center">
          <p class="option-title">Increase speed time</p>
          <div class="d-flex justify-center align-center" style="width: 320px">
            <v-col justify="center" style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="speedTime == 1 ? true : false"
                @click="speedTime--"
              >
                <v-icon>
                  mdi-minus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col style="text-align: center">
              {{ speedTime }} minutes
            </v-col>
            <v-col style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                @click="speedTime++"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-row>
        <v-row class="flex-column mt-7" justify="center" align="center">
          <p class="option-title">By</p>
          <div class="d-flex justify-center align-center" style="width: 320px">
            <v-col style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="bpmStep == 1 ? true : false"
                @click="bpmStep--"
              >
                <v-icon>
                  mdi-minus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col style="text-align: center">
              {{ bpmStep }} BPM
            </v-col>
            <v-col style="text-align: center">
              <v-btn
                class="mx-2"
                elevation="0"
                fab
                small
                :color="colors.blue"
                style="color: white"
                :disabled="bpmStep == 599 ? true : false"
                @click="bpmStep++"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-row>
      </v-container>
      <!-- End - INFINITY OPTIONS Container -->
    </v-container>
    <!-- End - SETTINGS Section -->
  </main>
</template>

<script>
 import colors from '@/assets/styles/_colors.scss';
import { sounds } from '@/assets/js/exportSounds';
import { SELECTED_OPTION } from "./constants";
import * as Tone from "tone";

export default {
  name: "warmup",
  data: () => ({
    colors,
    selectedOption: null,
    isPlaying: false,
    minBpm: 20,
    maxBpm: 600,
    rangeBpm: [60, 120],
    satisfactionEmojis: ['👍', '😉','👌','😏','💪','👏','🤨','😶','😮','😲','😨','🤯','🔥'],
    speedTime: 2,
    bpmStep: 20,
    warmupTime: 5,
    warmupStep: 5,
    calculatedBpmStep: 0,
    calculatedTimeStep: 0,
    countStep: 0,
    timeCheck: 0,
    sounds,
    tone: Tone,
    transport: Tone.Transport,
    regularTap: null,
    setPlayerVolume: 100,
    time: 0,
    animationTrigger: false,
  }),
  components: {
  },
  methods: {
    playStopMetronome() {
      this.isPlaying = !this.isPlaying; 
      this.isPlaying ? this.start() : this.stop();
    },
    start() {
      this.transport.bpm.value = this.rangeBpm[0];

      this.createAudioPlayers(this.sounds[5].path);
      this.toneLoop = this.createToneLoop();

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
        this.regularTap.dispose();
    },
    createToneLoop() {
      // this.regularTap = new Tone.Player(this.sounds[5].path).toDestination();
      this.calculateBpmStep();
      this.calculateTimeStep();
      this.timeCheck = this.calculatedTimeStep;
      if (this.selectedOption === SELECTED_OPTION.TIME) {
        return new Tone.Loop((time) => {
        if (time > this.timeCheck) {        
          this.countStep += 1;
          this.timeCheck += this.calculatedTimeStep;
          if (this.countStep < this.warmupStep) {
            this.$set(this.rangeBpm, 0, this.rangeBpm[0] += this.calculatedBpmStep);
            this.startTimer();
          } else {
            this.stop();
            this.countStep = 0;
          }
        }
        this.regularTap.start(time);
        });
      } else {
        this.calculatedTimeStep = this.speedTimeToSeconds();
        this.timeCheck = this.calculatedTimeStep;
        return new Tone.Loop((time) => {
        if (time > this.timeCheck && (this.rangeBpm[0] + this.bpmStep) <= this.rangeBpm[1]) {
          this.timeCheck += this.calculatedTimeStep;
          this.$set(this.rangeBpm, 0, this.rangeBpm[0] += this.bpmStep);
          this.startTimer();
        }
        this.regularTap.start(time);
        });
      }
    },
    createAudioPlayers(regularTapPath) {
      this.regularTap = new Tone.Player(regularTapPath).toDestination();
      this.regularTap.volume.input.value = this.setPlayerVolume / 100;
    },
    calculateBpmStep() {
      this.calculatedBpmStep = Math.round((this.rangeBpm[1] - this.rangeBpm[0]) / this.warmupStep);
    },
    calculateTimeStep() {
      this.calculatedTimeStep = Math.round((this.warmupTime * 60) / this.warmupStep);
    },
    speedTimeToSeconds() {
      return this.speedTime * 60;
    },
    startTimer() {
      this.animationTrigger = !this.animationTrigger;
    }
  },
  watch: {
    rangeBpm(bpm) {
      this.transport.bpm.value = bpm[0];
    },
    setPlayerVolume(volume) {
      this.regularTap.volume.input.value = volume / 100;
    },
  },
  computed: {
    animationDuration () {
      return `${this.calculatedTimeStep}s`
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/_colors.scss";

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

    &__value {
      font-size: 6em;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &__bpm {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 35%;
      text-transform: uppercase;
      font-size: 1.25em;
      font-weight: bold;
      color: grey;
    }

    &__time-bar {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 4px;
      border-radius: 16px;
      bottom: 30%;
      width: 80%;
      background-color: #dd656e36;

      &--in {
        height: 10px;
        background-color: $red;
        border-radius: 16px;
        animation-name: decreaseBarTimer;
        animation-direction: linear forwards;
        transform-origin: left center;
      }
    }

    /* &__time-bar[data-style="smooth"] div {
      animation-name: decreaseBarTimer;
      animation-direction: linear forwards;
    } */

    &__time {
      text-transform: uppercase;
      font-size: 1.25em;
      font-weight: bold;
      color: grey;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 10%;
    }
  }

  @keyframes decreaseBarTimer {
  to {
    transform: scaleX(0);
  }
}

  .volume-slider {
    width: 70%;
    margin: 0 auto;
    align-items: center;
  }

  ::v-deep .volume-slider .v-input__slot {
    margin: 0;
  }

  ::v-deep .volume-slider .v-input__control .v-messages {
    display: none;
  }

  .option-title {
    margin: 0 !important;
    font-weight: 500;
    color: grey;
  }

  .option-slider {
    width: 70%;
  }

  ::v-deep .range-input {
    width: 94px;
    input {
      text-align: center;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
      padding: 8px 8px !important;
    }
  }
</style>