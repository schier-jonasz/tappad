<template>
      <v-navigation-drawer app
        v-model="navigation"
        :mini-variant="this.narrowNavigation"
        mini-variant-width="64"
        permanent
        color="primary"
      >
        <v-list-item class="px-2 my-2">
          <v-list-item-title>tappad</v-list-item-title>
        </v-list-item>
        <v-btn
          icon
          elevation="3"
          @click="narrowNavigation=!narrowNavigation">
          <v-icon v-if="this.narrowNavigation">mdi-chevron-right</v-icon>
          <v-icon v-else>mdi-chevron-left</v-icon>
        </v-btn>
          <v-divider></v-divider>

          <v-list 
            nav
            dense>
            <v-list-item
              v-for="page in pages"
              :key="page.title"
              :to="page.path"
              link
            >
              <v-list-icon>
                <v-icon class="pr-2">{{ page.icon }}</v-icon>
              </v-list-icon>

              <v-list-item-content>
                <v-list-item-title>{{ page.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
            mini: true,
        })
    };
</script>
