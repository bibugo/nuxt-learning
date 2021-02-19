<template>
  <v-container fluid>
    <v-banner
      v-model="banner"
      sticky
      single-line
      transition="slide-y-transition"
    >
      <v-icon slot="icon" color="warning" size="24">
        mdi-wifi-strength-alert-outline
      </v-icon>
      We can't save your edits while you are in offline mode.
      <template v-slot:actions>
        <v-btn text color="deep-purple accent-4" @click.stop="banner = false">
          Close
        </v-btn>
      </template>
    </v-banner>

    <v-card class="mx-auto text-center">
      <v-card-text>
        <v-sheet>
          <v-sparkline
            :value="value"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">Sales Last 24h</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn block text> Go to Report </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    banner: true,
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
};
</script>
