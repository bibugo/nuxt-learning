<template>
  <v-snackbar
    app
    top
    v-model="show"
    :timeout="timeout"
    :color="type"
    content-class="pa-0 ma-0"
    transition="slide-y-reverse-transition"
  >
    <v-alert :type="type" class="ma-0">
      {{ message }}
    </v-alert>
    <template v-slot:action="{ attrs }" v-if="dismissible">
      <v-btn icon v-bind="attrs" @click="show = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("snackit", [ 'message', 'type', 'timeout', 'dismissible' ]),
    show: {
      get() {
        return this.$store.state.snackit.show;
      },
      set(value) {
        this.$store.commit("snackit/setShow", value);
      },
    },
  },
};
</script>