<template>
  <v-app>
    <NavigationBar/>
    <v-content>
      <ToolBar/>
      <h1>hello</h1>
    </v-content>
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
