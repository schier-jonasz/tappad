<template>
  <main class="main d-flex">
    <div class="home">
      <h2 class="home__subtitle">Play faster</h2>
      <h1 class="home__title">T<span class="home__title--color">APP</span>AD</h1>
      <p class="home__description">
        An innovative app that will provide you with the opportunity to hone your drumming skills.
         The app was created for beginners as well as advanced drummers.
         With TapPad you will develop your motor skills as well as your rhythm skills.
      </p>
      <p class="home__description home__description--check">
        We plan to constantly develop the application to best meet the needs of our customers. 
        So check out and test my app now
      </p>
      <v-btn
        to="/rudiments"
        rounded
        outlined
        :color="colors.blue">
        Check it
      </v-btn>
    </div>
    <div class="functionality">
      <v-container>
        <v-row class="option">
          <v-col 
            class="option__box"
            align="center"
            justify="center"
            cols="2">
            <v-icon class="option__icon option__icon--fire">
              mdi-fire
            </v-icon>
          </v-col>
          <v-col class="option__description">
            Don't exercise in the cold! Warm up your fingers.
          </v-col>
        </v-row>
        <v-row class="option">
          <v-col 
            class="option__box"
            align="center"
            justify="center"
            cols="2">
            <v-icon class="option__icon option__icon--metronome">
              mdi-metronome
            </v-icon>
          </v-col>
          <v-col class="option__description">
            Listen to the tempo and let it serve to help you in your play.
          </v-col>
        </v-row>
        <v-row class="option">
          <v-col
            class="option__box"
            align="center"
            justify="center"
            cols="2">
            <v-icon class="option__icon option__icon--note">
              mdi-music-note
            </v-icon>
          </v-col>
          <v-col class="option__description">
            Practice one of the many relatively small patterns that form the basis for more elaborate and complex percussion patterns.
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<script>
 import colors from '@/assets/styles/_colors.scss';

export default {
  name: 'home',
  data: () => ({
    colors,
  }),
  components: {
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/_colors.scss";

  .main {
    min-height: 70vh;
  }

  .home {
    margin-left: 64px;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;

    &__subtitle {
      font-size: 1em;
      text-transform: uppercase;
      color: $red;
    }

    &__title {
      font-size: 4em;
      color: $navy-blue;

      &--color {
        color: $red;
      }
    }

    &__description {
      width: 70%;
      color: $navy-blue;
      font-size: 1.25em;

      &--check {
        color: $red;
      }
    }
  }

  .functionality {
    display: flex;
    align-items: center;
  }

  .option {
    &__box {
      align-self: center;
    }

    &__icon {
      padding: 16px;
      border-radius: 50%;
      font-size: 2.5em;
      color: white;

      &--fire {
        background-color: $red;
      }

      &--metronome {
        background-color: $navy-blue;
      }

      &--note {
        background-color: $blue;
      }
    }

    &__description {
      align-self: center;
      color: $navy-blue;
      font-weight: 600;
    }
  }
</style>