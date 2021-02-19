<template>
  <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
    <v-toolbar dense elevation="0">
      <v-btn icon @click.stop="right = !right">
        <v-icon>mdi-repeat</v-icon>
      </v-btn>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      right: true,
    };
  },
  computed: {
    rightDrawer: {
      get() {
        return this.$store.state.ui.rightDrawer;
      },
      set(value) {
        this.$store.commit("ui/updateRightDrawer", value);
      },
    },
  },
};
</script>
