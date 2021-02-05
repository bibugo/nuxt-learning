<template>
  <v-container>
  <v-row>
    <v-col class="text-center">
      <blockquote class="blockquote">
        {{ words }}
        <footer>
          <small>
            <em>{{ author }}</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
    </v-container>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const {words, author} = await $axios.$get("/api/inspire")
    return {words, author}
  },
}
</script>
