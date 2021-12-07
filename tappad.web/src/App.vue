<template>
  <v-app>
    <NavigationBar/>
    <v-main>
      <ToolBar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';
import ToolBar from '@/components/ToolBar';

export default {
  name: "App",
  components: {
    NavigationBar,
    ToolBar
  },
  data: () => ({
    //
  }),
};
</script>
