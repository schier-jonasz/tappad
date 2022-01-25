<template>
  <main>
    <div>
      <v-select
        v-model="rudiment"
        :items="rudiments"
        :disabled="isPlaying"
        item-text="title"
        label="Choose rudiment"
        style="width: 50%;"
        outlined
        dense
        return-object
        append-icon="mdi-music-note"
        class="mx-5"
      ></v-select>
    </div>
    <v-container class="rudiment mx-5">
      <v-row class="header">
        <h1 class="header__title">{{ rudiment.title }}</h1>
        <p class="header__description">{{ rudiment.description }}</p>
      </v-row>
      <v-container class="my-4" style="border: 1px solid black;">
        <v-row >
          <v-col 
          v-for="(item, index) in rudiment.track"
          :key="index">
            {{item.hand}}
          </v-col>
        </v-row>
      </v-container>
      <v-container class="options">
        <v-row 
          class="option"
          align="center"
          justify="center">
          <v-col class="d-flex justify-center align-baseline">
            <v-text-field
              class="option__input"
              prepend-icon="mdi-metronome-tick"
              type="number"
            ></v-text-field>
            <p>BPM</p>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-switch
              label="Accent">
            </v-switch>
          </v-col>
          <v-col class="d-flex justify-center align-baseline">
            <v-text-field
              class="option__input"
              type="number"
            ></v-text-field>
            <p>Note</p>
          </v-col>
        </v-row>
      </v-container>
      <v-col 
        align="center"
        justify="center">
        <v-btn 
          outlined 
          icon 
          large
          :color="colors.red"
          @click="playStopRudiment()">
          <v-icon v-if="!isPlaying">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>  
      </v-col>
    </v-container>
    <v-btn @click="sound()" color="primary">Click</v-btn>
    <v-btn @click="stop()" color="error">Stop</v-btn>
  </main>
</template>

<script>
 import * as Tone from "tone";
 import { sounds } from '@/assets/js/exportSounds';
 import rudiments from '@/assets/js/rudimentsLib';
 import colors from '@/assets/styles/_colors.scss';
 

export default {
  name: 'single-stroke-roll',
  data: () => ({
    rudiments,
    colors,
    rudiment: rudiments[0],
    isPlaying: false,
    tonePart: null,
    Tone,
    transport: Tone.Transport,
  }),
  components: {
  },
  methods: {
    playStopRudiment() {
        this.isPlaying = !this.isPlaying;
        
        this.isPlaying ? this.start() : this.stop();
    },
    start() {
      this.transport.bpm.value = 60;
      this.transport.timeSignature = this.rudiment.timeSignature;

      this.tonePart = this.createTonePart();
      this.tonePart.loop = true;
      
      this.Tone.loaded().then(() => {
          this.transport.start();
          this.tonePart.start(0);
      });
    },
    stop() {
      this.transport.stop();

      this.tonePart.stop();
      this.tonePart.dispose();
    },
    createTonePart() {
      const right = new Tone.Player(sounds[5].path).toDestination();
      const left = new Tone.Player(sounds[1].path).toDestination();

      const part = new Tone.Part(((time, note) => {
        console.log(Tone.Transport.position, note.time);
        if (note.hand == 'R') {
          right.start(time)
        } else {
          left.start(time);
        }
      }), this.rudiment.track);
      return part;
    },
    sound() {
      // const synth = new Tone.Synth().toDestination();
      // console.log(this.rudiment);

      // const singleStrokeRoll = [
      //   { dur: '16n', time: `0:0:0`, hand: 'R' },
      //   { dur: '16n', time: `0:0:2`, hand: 'L' },
      //   { dur: '16n', time: `0:0:4`, hand: 'R' },
      //   { dur: '16n', time: `0:0:6`, hand: 'L' },
      // ];

      // const tripleStrokeRoll = [
      //   { dur: '8n', time: `0:0:0`, hand: 'R' },
      //   { dur: '8n', time: `0:0:1`, hand: 'R' },
      //   { dur: '8n', time: `0:0:2`, hand: 'R' },
      //   { dur: '8n', time: `0:0:3`, hand: 'L' },
      //   { dur: '8n', time: `0:0:4`, hand: 'L' },
      //   { dur: '8n', time: `0:0:5`, hand: 'L' }
      // ];

      // const singleStrokeFour = [
      //   { dur: '16n', time: `0:0:0`, hand: 'L' },
      //   { dur: '16n', time: `0:0:1`, hand: 'L' },
      //   { dur: '16n', time: `0:0:2`, hand: 'L' },
      //   { dur: '16n', time: `0:0:3`, hand: 'L' },
      //   { dur: '16n', time: `0:0:4`, hand: 'R' },
      //   { dur: '16n', time: `0:0:5`, hand: 'R' },
      //   { dur: '16n', time: `0:0:6`, hand: 'R' },
      //   { dur: '16n', time: `0:0:7`, hand: 'R' },
      // ];

      const singleStrokeSeven = [
            { duration: '16n', time: `0:0:0`, hand: 'R' },
            { duration: '16n', time: `0:0:1`, hand: 'R' },
            { duration: '16n', time: `0:0:2`, hand: 'R' },
            { duration: '16n', time: `0:0:3`, hand: 'R' },
            { duration: '16n', time: `0:0:4`, hand: 'R' },
            { duration: '16n', time: `0:0:5`, hand: 'R' },
            { duration: '16n', time: `0:0:6`, hand: 'R' },
            { duration: '16n', time: `0:0:7`, hand: 'L' },
            { duration: '16n', time: `0:0:8`, hand: 'L' },
            { duration: '16n', time: `0:0:9`, hand: 'L' },
            { duration: '16n', time: `0:0:10`, hand: 'L' },
            { duration: '16n', time: `0:0:11`, hand: 'L' },
            { duration: '16n', time: `0:0:12`, hand: 'L' },
            { duration: '16n', time: `0:0:13`, hand: 'L' },
        ];

      
      const right = new Tone.Player(sounds[5].path).toDestination();
      const left = new Tone.Player(sounds[1].path).toDestination();

      Tone.Transport.bpm.value = 120;
      Tone.Transport.timeSignature = [7, 8];

      const part = new Tone.Part(((time, note) => {
        console.log(Tone.Transport.position, note.time);
        
        if (note.hand == 'R') {
          right.start(time)
        } else {
          left.start(time);
        }
      }), singleStrokeSeven);

      
      // Tone.Transport.loopEnd = "1m";
      part.loop = true;
      Tone.Transport.start();
      part.start(0);
    },
  }
};
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/_colors.scss";

  .header {
    --shadow-color: 0deg 0% 63%;
    display: flex;
    flex-direction: column;

    &__title {
      color: $navy-blue;
    }

    &__description {
      width: 60%;
      color: $red;
      font-size: 0.8em;
      font-weight: 400;
      line-height: 16px;
    }
  }

  .options {
    width: 45%;
  }

  .option {
    border: 1px solid black;

    &__input {
      border: 1px solid blue;
      text-align: center;
      input {
        background: blue;
      }
    }
  }
</style>