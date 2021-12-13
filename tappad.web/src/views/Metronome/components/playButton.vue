<template>
    <v-btn
        fab
        small
        :color="colors.red"
        @click="playStop()">
        <v-icon v-if="!isPlaying">mdi-play</v-icon>
        <v-icon v-else>mdi-pause</v-icon>
    </v-btn>
</template>

<script>
    import colors from '@/assets/styles/_colors.scss';  

    export default {
        name: 'playButton',
        data: () => ({
            isPlaying: false,
            colors,
            loop: null,
            bpm: 1000,
            expected: Date.now() + this.bpm,
        }),
        methods: {
            async playStop() {
                this.isPlaying = !this.isPlaying;
                if (this.isPlaying) {
                    this.loop = await setTimeout(this.step, this.interval);
                } else {
                    clearTimeout(this.loop);
                }
            },
            step() {
                var date = Date.now() - this.expected;
                if (date > this.bpm) {
                    console.log('date > interval');
                }
                console.log(this.expected);

                this.expected += this.bpm;
                setTimeout(this.step, Math.max(0, this.bmp - date));
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/styles/_colors.scss";
</style>