<template>
      <v-navigation-drawer app
        v-model="navigation"
        :mini-variant="this.narrowNavigation"
        mini-variant-width="64"
        permanent
        dark
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
              <v-list-icon>
                <v-icon>{{ page.icon }}</v-icon>
              </v-list-icon>

              <v-list-item-content>
                <v-list-item-title class="ml-4">{{ page.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-group
              prepend-icon="mdi-playlist-music">
              <template v-slot:activator>
                <v-list-item-title>Rudiments</v-list-item-title>
              </template>
                <v-list-item v-for="subpage in rudiments"
                  :key="subpage.title"
                  :to="subpage.path"
                  link
                  active-class="active-link">
                  <v-list-icon>
                    <v-icon>{{ subpage.icon }}</v-icon>
                  </v-list-icon>
                  <v-list-item-content>
                    <v-list-item-title class="ml-4">{{ subpage.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list-group>
          </v-list>
          <div>
        <v-btn
          class="button"
          @click="narrowNavigation=!narrowNavigation"
          block
          tile>
          <v-icon>mdi-arrow-left-right-bold</v-icon>
        </v-btn>
        </div>
      </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Navbar',
        data: () => ({
            navigation: true,
            narrowNavigation: true,
            pages: [
                {title: 'Home', icon: 'mdi-home-city', path: '/'},
                {title: 'Metronome', icon: 'mdi-metronome', path: '/metronome'},
                {title: 'Warmup', icon: 'mdi-fire-circle', path: '/warmup'}
            ],
            rudiments: [
              {title: 'Single stroke roll', icon: '', path: '/'},
              {title: 'Single stroke four', icon: '', path: '/'},
              {title: 'Double stroke roll', icon: '', path: '/'},
              {title: 'Triple stroke roll', icon: '', path: '/'},
            ],
            mini: true,
        })
    };
</script>

<style lang="scss" scoped>
  .navbar {
    background-color: #23374c !important;
  }

  .title {
    font-size: 1.25em;

    &--span {
      color: #dd656e;
    }
  }

  .active-link {
    color: #dd656e !important;
  }

  .button {
    background-color: #7785AC !important;
  }
</style>
