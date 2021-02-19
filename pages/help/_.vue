<template>
  <nuxt-content :document="page" />
</template>

<script>
export default {
  watchQuery: true,
  async asyncData({ $content, params }) {
    const root = "/help";
    const url =
      !!params && !!params.pathMatch
        ? `${root}/${params.pathMatch}`
        : `${root}/index`;

    const page = await $content(url).fetch();

    return { page, url };
  },
  created() {
    this.$emit("pageupdate", {
      title: this.page.title,
      version: this.page.version,
      url: this.url,
    });
  },
  watch: {
    page(val) {
      this.$emit("pageupdate", {
        title: val.title,
        version: val.version,
        url: this.url,
      });
    },
  },
};
</script>