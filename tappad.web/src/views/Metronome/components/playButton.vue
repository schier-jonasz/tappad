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
        }),
        methods: {
            async playStop() {
                this.isPlaying = !this.isPlaying;
                if (this.isPlaying) {
                    var start = Date.now();
                    this.loop = await setInterval(() => {
                    console.log(Date.now() - start);
                    }, 60000 / 60);
                } else {
                    clearInterval(this.loop);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/styles/_colors.scss";
</style>