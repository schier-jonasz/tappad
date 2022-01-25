<template>
      <v-navigation-drawer app
        v-model="navigation"
        :mini-variant="this.narrowNavigation"
        mini-variant-width="64"
        permanent
        light
        class="navbar"
      >
        <v-list-item 
          >
          <v-list-item-title class="text-center font-weight-bold title" color="secondary" v-if="this.narrowNavigation">T<span class="title--span">P</span></v-list-item-title>
          <v-list-item-title class="text-center font-weight-bold title" v-else>T<span class="title--span">APP</span>AD</v-list-item-title>
        </v-list-item>
          <v-divider></v-divider>

          <v-list 
            nav
            dense
            rounded>
            <v-list-item
              v-for="page in pages"
              :key="page.title"
              :to="page.path"
              link
              active-class="active-link"
            >
              <v-list-item-icon>
                <v-icon>{{ page.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="ml-1">{{ page.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <!-- <v-list-group
              prepend-icon="mdi-playlist-music"
              v-model="collapse"
              @click="checkIfNarrow()">
              <template v-slot:activator>
                <v-list-item-title>Rudiments</v-list-item-title>
              </template>
                <v-list-item v-for="subpage in rudiments"
                  :key="subpage.title"
                  :to="subpage.path"
                  link
                  active-class="active-link">
                  <v-list-item-icon>
                    <v-icon>{{ subpage.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="ml-1">{{ subpage.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list-group> -->
          </v-list>
        <div>
          <v-btn
            class="button"
            @click="changeWidth()"
            block
            tile>
            <v-icon>mdi-arrow-left-right-bold</v-icon>
          </v-btn>
        </div>
      </v-navigation-drawer>
</template>

<script>
  import colors from '@/assets/styles/_colors.scss';  

  export default {
      name: 'Navbar',
      data: () => ({
          navigation: true,
          narrowNavigation: true,
          collapse: false,
          colors,
          pages: [
              {title: 'Home', icon: 'mdi-home-city', path: '/'},
              {title: 'Metronome', icon: 'mdi-metronome', path: '/metronome'},
              {title: 'Warmup', icon: 'mdi-fire-circle', path: '/warmup'},
              {title: 'Rudiments', icon: 'mdi-playlist-music', path: '/rudiments'}
          ],
          // rudiments: [
          //   {title: 'Single stroke roll', icon: 'mdi-music-note', path: '/rudiments/single-stroke-roll'},
          //   {title: 'Single stroke four', icon: 'mdi-music-note', path: '/rudiments/single-stroke-four'},
          //   {title: 'Double stroke roll', icon: 'mdi-music-note', path: '/rudiments/double-stroke-roll'},
          //   {title: 'Triple stroke roll', icon: 'mdi-music-note', path: '/rudiments/triple-stroke-roll'},
          // ],
          mini: true,
      }),
      methods: {
        checkIfNarrow() {
          if (this.narrowNavigation) {
            this.narrowNavigation = !this.narrowNavigation;
          }
        },
        changeWidth() {
          this.narrowNavigation = !this.narrowNavigation;
          if (this.narrowNavigation) {
            this.collapse = false;
          }
        }
      }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/_colors.scss";

  .navbar {
    background-color: $alice-blue !important;
  }

  .title {
    font-size: 1.25em;

    &--span {
      color: $red;
    }
  }

  .active-link {
    color: $blue !important;
  }

  .button {
    background-color: $blue !important;
  }
</style>
