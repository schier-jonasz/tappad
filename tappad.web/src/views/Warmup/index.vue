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
          <p class="beat__value">120</p>
          <p class="beat__bpm">BPM</p>
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
    <!-- SETTINGS Section -->
    <v-container class="mt-8">
      <v-row justify="center">
        <v-btn-toggle 
          v-model="selectedOption"
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
        align="center"
        v-if="selectedOption">
          <p class="option-title">Range BPM</p>
          <div class="option-slider">
            <v-range-slider
              v-model="rangeBpm"
              :max="maxBpm"
              :min="minBpm"
              hide-details
              class="align-center"
              :thumb-size="24"
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
                @click="warmupTime -= 5"
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
                @click="warmupTime += 5"
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
    speedTime: 10,
    bpmStep: 20,
    warmupTime: 30,
    warmupStep: 5,
  }),
  components: {
  },
  watch: {
  }
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
      top: 25%;
      left: 50%;
      transform: translate(-50%, 0);
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

  .volume-slider {
    width: 70%;
    margin: 0 auto;
    align-items: center;
  }

  .volume-slider .v-input__slot {
    margin: 0;
  }

  .volume-slider .v-input__control .v-messages {
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