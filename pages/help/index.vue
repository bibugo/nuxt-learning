<template>
  <nuxt-content :document="page" />
</template>

<script>
export default {
  watchQuery: true,
  async asyncData({ $content, params }) {
    const root = "/help";
    const url = `${root}/index`;

    const page = await $content(url).fetch();

    return { page, url: root };
  },
  created() {
    this.$emit("pageupdate", {
      title: this.page.title,
      version: this.page.version,
      url: this.url,
    });
  },
};
</script>