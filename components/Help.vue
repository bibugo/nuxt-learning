<template>
  <v-container>
    <v-card flat class="mx-auto">
      <slot name="title"></slot>
      <v-card-title class="justify-center">
        {{ pagetitle }}
      </v-card-title>
      <slot name="subtitle">
        <v-card-subtitle class="text-center">{{
          version || "&nbsp;"
        }}</v-card-subtitle>
      </slot>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <slot></slot>
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
                      <Nuxt-link :to="item.path" v-if="item.path">{{
                        item.title
                      }}</Nuxt-link>
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
  props: ["pagetitle", "version", "items"],
};
</script>
