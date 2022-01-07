<template>
  <main>
    <h1>Single stroke roll</h1>
    <v-btn
      @click="sound"
      color="red">
      Make sound
    </v-btn>
    <v-btn
      @click="anotherSound"
      color="primary">
      Make another sound
    </v-btn>
  </main>
</template>

<script>
 import * as Tone from "tone";

export default {
  name: 'single-stroke-roll',
  components: {
  },
  methods: {
    sound() {
      const lowPass = new Tone.Filter({
        frequency: 8000,
      }).toDestination();

      const snareDrum = new Tone.NoiseSynth({
        volume: 5,
        noise: {
          type: 'white',
          playbackRate: 3,
        },
        envelope: {
          attack: 0.001,
          decay: 0.20,
          sustain: 0.15,
          release: 0.02,
        },
      }).connect(lowPass);

      const snares = [
        { time: '0:3' },
        { time: '1:2' },
        { time: '2:3' },
        { time: '3:2' },
        { time: '4:2' },
        { time: '5:3' },
        { time: '6:2' },
        { time: '7:3' },
      ]

      new Tone.Part(function(time) {
        snareDrum.triggerAttackRelease('4n', time);
        console.log(time);
      }, snares).start(0);

      const bassline = [
        {'time': 0, 'note': 'A0', 'duration': '2n'},
        {'time': '0:3', 'note': 'F0', 'duration': '2n.'},
        {'time': '1:3', 'note': 'D0', 'duration': '2n.'},
        {'time': '2:3', 'note': 'F0', 'duration': '1:1'},
      ];

      const bass = new Tone.Synth({
        oscillator : {
          type : "triangle"
        }
      }).toDestination();

      new Tone.Part(function(time, note) {
        bass.triggerAttackRelease(note.note, note.duration, time);
      }, bassline).start(0);

      Tone.Transport.start();
    },
    anotherSound() {
      const synth = new Tone.Synth().toDestination();

      //const preset1 = [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]];
      //const preset2 = [[0, "C2"], ["0:2", "C3"], ["2:2", "C2"], ["3:2", "C3"]];
      const preset3 = [[0, "C3"], ["0:1", "C4"], ["0:2", "C5"], ["2:0", "C6"], ["2:1", "C2"], ["2:2", "C1"]];
      // const preset3 = [["C5", "C4", "C3"], ["C4", "C3", "C4"]];
      //const preset3 = [["C5"], ["C4"], ["C4"], ["C4"]];

      const part = new Tone.Part(((time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        synth.triggerAttackRelease(note, "16n", time);
      }), preset3);

      // const part = new Tone.Sequence(((time, note) => {
      //           // the notes given as the second element in the array
      //           // will be passed in as the second argument
      //           synth.triggerAttackRelease(note, "16n", time);
      // }), preset3);

      Tone.Transport.bpm.value = 100;
      Tone.Transport.start();
      part.loop = true;
      part.start(0);

      const time = Tone.Time("4n").toSeconds();
      console.log(time);

      const note = Tone.Time(1).toNotation();
      console.log(note);

      const freq = Tone.Time(0.5).toFrequency();
      console.log(freq);

      const idk = Tone.Time("4:3:2").toNotation();
      console.log(idk);
    }
  }
};
</script>
