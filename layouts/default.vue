<template>
  <v-app dark>
    <NavDrawer />
    <v-app-bar dense app fixed elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="toggleLeftDrawer" />
      <v-spacer />

      <UserMenu />

      <v-btn icon @click.stop="toggleRightDrawer">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <UserDrawer />

    <v-footer absolute app class="d-none">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <SnackIt />

  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      toggleLeftDrawer: "ui/toggleLeftDrawer",
      toggleRightDrawer: "ui/toggleRightDrawer",
    }),
  },
};
</script>
