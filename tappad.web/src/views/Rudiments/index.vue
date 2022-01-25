<template>
  <main class="d-flex flex-column justify-center align-center">
    <div class="align-self-stretch">
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
    <div class="header align-self-stretch mx-8">
      <h1 class="header__title">{{ rudiment.title }}</h1>
      <p class="header__description">{{ rudiment.description }}</p>
    </div>
    <v-container class="rudiment">
      <v-container class="my-12">
        <v-row class="pattern"
          v-if="rudiment.track">
          <hr class="pattern__line-vertical pattern__line-vertical--first"/>
          <hr class="pattern__line-vertical pattern__line-vertical--second"/>
          <hr class="pattern__line pattern__line--1"/>
          <hr class="pattern__line pattern__line--2"/>
          <hr class="pattern__line pattern__line--3"/>
          <hr class="pattern__line pattern__line--4"/>
          <hr class="pattern__line-vertical pattern__line-vertical--penultimate"/>
          <hr class="pattern__line-vertical pattern__line-vertical--last"/>
          <!-- <transition-group name="hand-blink"> -->
            <v-col
              class="pattern__hands"
              v-for="(item, index) in rudiment.track"
              :key="item.time"
              :data-index="index">
              {{item.hand}}
              <v-row
                class="pattern__accent"
                v-if="index % rudiment.accent == note - 1 && isAccentEnabled">
                &gt;
              </v-row>
            </v-col>
          <!-- </transition-group> -->
        </v-row>
        <v-row class="pattern"
          v-else>
          <hr class="pattern__line-vertical pattern__line-vertical--first"/>
          <hr class="pattern__line-vertical pattern__line-vertical--second"/>
          <hr class="pattern__line pattern__line--1"/>
          <hr class="pattern__line pattern__line--2"/>
          <hr class="pattern__line pattern__line--3"/>
          <hr class="pattern__line pattern__line--4"/>
          <hr class="pattern__line-vertical pattern__line-vertical--penultimate"/>
          <hr class="pattern__line-vertical pattern__line-vertical--last"/>
          <!-- <transition-group name="hand-blink"> -->
            <v-col
              class="pattern__hands"
              v-for="(item, index) in rudiment.pattern[note - 1]"
              :key="item.time"
              :data-index="index">
              {{item.hand}}
              <v-row
                class="pattern__accent"
                v-if="index % rudiment.accent == note - 1 && isAccentEnabled">
                &gt;
              </v-row>
            </v-col>
          <!-- </transition-group> -->
        </v-row>
      </v-container>
      <v-container class="options">
        <v-row 
          class="option"
          align="center"
          justify="center">
          <v-col class="d-flex justify-center align-baseline">
            <v-text-field
              v-model="setBpm"
              class="option__input"
              prepend-icon="mdi-metronome-tick"
              type="number"
            ></v-text-field>
            <p>BPM</p>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-switch
              v-model="isAccentEnabled"
              :disabled="!rudiment.accent"
              label="Accent">
            </v-switch>
          </v-col>
          <v-col class="d-flex justify-center align-baseline">
            <v-text-field
              v-model="note"
              min="1"
              :max="rudiment.accent"
              @input="onInput(note)"
              :disabled="!isAccentEnabled || !rudiment.accent"
              class="option__input"
              type="number"
            ></v-text-field>
            <p>Note</p>
          </v-col>
        </v-row>
      </v-container>
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
          :color="colors.red"
          @click="playStopRudiment()">
          <v-icon v-if="!isPlaying">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>  
      </v-col>
    </v-container>
  </main>
</template>

<script>
 import * as Tone from "tone";
 import { sounds } from '@/assets/js/exportSounds';
 import rudiments from '@/assets/js/rudimentsLib';
 import colors from '@/assets/styles/_colors.scss';
 

export default {
  name: 'rudiments',
  data: () => ({
    rudiments,
    colors,
    rudiment: rudiments[0],
    isPlaying: false,
    tonePart: null,
    Tone,
    transport: Tone.Transport,
    setPlayerVolume: 100,
    actualVolume: 0,
    setBpm: 120,
    note: 1,
    isAccentEnabled: true,
    sounds,
  }),
  components: {
  },
  methods: {
    playStopRudiment() {
        this.isPlaying = !this.isPlaying;
        
        this.isPlaying ? this.start() : this.stop();
    },
    start() {
      this.transport.bpm.value = this.setBpm;
      this.transport.timeSignature = this.rudiment.timeSignature;

      this.createAudioPlayers(this.sounds[5].path, this.sounds[1].path);
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
      var i = 0;
      if (this.rudiment.track) {
        return new Tone.Part(((time, note) => {
          // console.log(Tone.Transport.position, note.time);
          this.isAccentNow(i);
          this.triggerHandAnimation(i++)
          i = i % this.rudiment.track.length;

          if (note.hand == 'R') {
            this.rightTap.start(time)
          } else {
            this.leftTap.start(time);
          }
        }), this.rudiment.track);
      } else {
        return new Tone.Part(((time, note) => {
          // console.log(Tone.Transport.position, note.time);
          this.isAccentNow(i);
          this.triggerHandAnimation(i++)
          i = i % this.rudiment.pattern[this.note - 1].length;
          
          if (note.hand == 'R') {
            this.rightTap.start(time)
          } else {
            this.leftTap.start(time);
          }
        }), this.rudiment.pattern[this.note - 1]);
      }
    },
    createAudioPlayers(rightTapPath, leftTapPath) {
      this.rightTap = new Tone.Player(rightTapPath).toDestination();
      this.rightTap.volume.input.value = this.setPlayerVolume / 100;

      this.leftTap = new Tone.Player(leftTapPath).toDestination();
      this.leftTap.volume.input.value = this.setPlayerVolume / 100;

      this.actualVolume = this.setPlayerVolume / 100;
    },
    triggerHandAnimation(indexElement) {
        const handElement = document.querySelector(`[data-index="${indexElement}"]`);
        handElement.classList.remove('blink-and-bounce');
        void handElement.offsetWidth;
        handElement.classList.add('blink-and-bounce');
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
    onInput(note) {
      if (note == '' || note > this.rudiment.accent) {
        this.note = 1;
        note = 1;
      }
    },
    isAccentNow(index) {
      if (index % this.rudiment.accent == this.note - 1 && this.isAccentEnabled) {
        this.rightTap.volume.input.value *= 2.5;
        this.leftTap.volume.input.value *= 2.5;
      } else {
        this.rightTap.volume.input.value = this.actualVolume;
        this.leftTap.volume.input.value = this.actualVolume;
      }
    }
  },
  watch: {
    setBpm(bpm) {
        this.transport.bpm.value = bpm;
    },
    setPlayerVolume(volume) {
      this.rightTap.volume.input.value = volume / 100;
      this.leftTap.volume.input.value = volume / 100;
      this.actualVolume = volume / 100;
    },
  },
  async created() {
      await Tone.start();
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
      font-size: 3em;
    }

    &__description {
      width: 60%;
      color: $red;
      font-size: 1em;
      font-weight: 400;
      line-height: 20px;
      padding-left: 8px;
    }
  }

  .options {
    width: 45%;
  }

  ::v-deep .option {

    &__input input {
        text-align: center;
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

  .pattern {
    position: relative;

    &__line {
      width: 100%;
      position: absolute;
      z-index: 0;

      &--1 {
        top: 0;
      }
      &--2 {
        top: 32px;
      }
      &--3 {
        top: 64px;
      }
      &--4 {
        top: 96px;
      }

      &-vertical {
        position: absolute;
        z-index: 0;
        width: 1px;
        height: 100%;
        z-index: 1;

        &--first {
          left: 0;
          border: 2px solid black;
        }

        &--second {
          left: 8px;
        }

        &--penultimate {
          right: 8px;
        }

        &--last {
          right: 0;
          border: 2px solid black;
        }
      }
    }

    &__hands {
      font-size: 3em;
      font-weight: bold;
      z-index: 1;
      position: relative;
      color: $navy-blue;
    }

    &__accent {
      position: absolute;
      font-weight: 400;
      top: -10px;
      left: 24px;
    }
  }

.blink-and-bounce {
  animation-name: blinkAndBounce;
  animation-direction: linear;
  animation-duration: 0.1s;
}

@keyframes blinkAndBounce {
  0% {
    color: $navy-blue;
    transform: translateY(0);
  }
  50% {
    color: $gold;
    transform: translateY(-4px);
  }
  100% {
    color: $navy-blue;
    transform: translateY(0);
  }
}

</style>