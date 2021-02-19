<template>
  <v-container>
    <v-card flat class="mx-auto">
      <v-card-title class="justify-center">
        {{ title || "&nbsp;" }}
      </v-card-title>
      <v-card-subtitle class="text-center">
        <span v-if="version">版本&nbsp;</span>
        <span>{{ version || "&nbsp;" }}</span>
      </v-card-subtitle>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <nuxt-child @pageupdate="pageUpdate" />
            </v-col>
            <v-col cols="3">
              <v-row class="pl-4 mb-2">
                <h4 class="font-weight-bold">目录</h4>
              </v-row>
              <v-row class="pl-7">
                <v-divider vertical></v-divider>
                <v-col class="py-0">
                  <v-treeview
                    dense
                    expand-icon="mdi-chevron-down"
                    class="ml-n4"
                    :items="items"
                    open-all
                  >
                    <template v-slot:label="{ item }">
                      <nuxt-link :to="item.path" v-if="isCurrent(item.path)">{{
                        item.title
                      }}</nuxt-link>
                      <span v-else>{{ item.title }}</span>
                    </template>
                  </v-treeview>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "",
    version: "",
    url: "",
  }),
  async asyncData({ $content }) {
    const root = "/help";
    const content = await $content(root, { deep: true })
      .only(["title", "path"])
      .sortBy("path")
      .fetch();

    function list2tree(list) {
      const map = {},
        roots = [];

      let i, node;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].path] = i;
        list[i].id = i + 1;
        list[i].children = [];
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.path == `${root}/index`) {
          node.children.unshift({
            id: 0,
            title: "首页",
            path: root,
          });
          roots.push(node);
        } else {
          let parentdir = node.path.replace(/\/index$/, "");
          parentdir = parentdir.replace(/\/[^\/]+$/, "");
          parentdir = `${parentdir}/index`;
          list[map[parentdir]].children.push(node);
        }
      }
      return roots;
    }
    return { items: list2tree(content)[0].children };
  },
  methods: {
    pageUpdate(page) {
      this.title = !!page.title && page.title;
      this.version = !!page.version && page.version;
      this.url = !!page.url && page.url;
    },
    isCurrent(path) {
      return path !== this.url;
    },
  },
};
</script>
