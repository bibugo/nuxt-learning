<template>
  <!-- <v-card flat tile class="mx-auto fill-height"> -->
  <v-row class="fill-height" no-gutters>
    <v-navigation-drawer v-model="showDrawer">
      <v-toolbar dense flat>
        <v-toolbar-title> 字段列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="batch.length > 0">
          <v-icon color="error">mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-speed-dial
          v-model="fab"
          direction="bottom"
          transition="slide-y-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" elevation="0" icon small fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-server-plus </v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn fab dark small color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-action class="mr-2">
              <v-checkbox
                dense
                true-value="1"
                false-value="-1"
                @change="selectChange"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-action class="mx-2">
              <v-icon>mdi-form-textbox</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>字段</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="ml-0">
              <v-icon>mdi-arrow-down-circle-outline</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-action class="mr-2">
              <v-checkbox
                dense
                true-value="2"
                false-value="-2"
                @change="selectChange"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-action class="mx-2">
              <v-icon>mdi-form-dropdown</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>字段2</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-arrow-up-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-action class="ml-0">
              <v-icon>mdi-arrow-down-circle-outline</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card flat tile class="grow">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <div :class="hover ? 'border' : 'no-border'" @click.stop="selectItem">
                <v-text-field dense label="First name"></v-text-field>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <div :class="hover ? 'border' : 'no-border'">
                <v-text-field dense label="First name"></v-text-field>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <div :class="hover ? 'border' : 'no-border'">
                <v-text-field dense label="First name"></v-text-field>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <div :class="hover ? 'border' : 'no-border'">
                <v-text-field dense label="First name"></v-text-field>
              </div>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>

      <v-fab-transition>
        <v-btn
          class="mt-8"
          color="pink"
          fab
          dark
          small
          absolute
          top
          right
          @click.stop="toggleDrawer"
        >
          <v-icon>mdi-fullscreen{{ `${showDrawer ? "" : "-exit"}` }}</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>

    <v-navigation-drawer right v-model="showDrawer">
      <v-expansion-panels
        v-model="panel"
        accordion
        flat
        tile
        focusable
        style="margin: 0 1px"
      >
        <v-expansion-panel>
          <v-expansion-panel-header> 属性 </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field label="控件名称" outlined dense></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> 数据来源 </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select :items="links" label="类型"></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </v-row>
  <!-- </v-card> -->
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" },
    ],
    links: ["Home", "Contacts", "Settings"],
    mini: true,

    showDrawer: true,
    panel: 0,
    fab: false,
    batch: [],
  }),
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    selectChange(v) {
      const id = parseInt(v);
      if (isNaN(id)) return;
      if (id > 0) {
        this.batch.push(id);
      } else if (id < 0) {
        this.batch = this.batch.filter(function (el) {
          return el != -id;
        });
      }
    },
    selectItem() {
        console.log('select item')
    }
  },
};
</script>
<style scoped>
.border {
  border: 1px dashed orange;
}
.no-border {
  border: 1px solid transparent;
}
</style>