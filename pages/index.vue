<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <div class="text-center">
          <cat />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cat from "~/components/Cat.vue";

export default {
  components: {
    Cat,
  },
};
</script>
