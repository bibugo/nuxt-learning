<template>
  <v-navigation-drawer
    v-model="leftDrawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-app-bar dark dense elevation="0" src="/img/bg-2.jpg">
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <template v-slot:extension v-if="!miniVariant">
        <v-row class="mx-n8">
          <v-col>
            <v-list-item>
              <v-list-item-avatar class="mr-0">
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn small icon @click.stop="logout">
                  <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-row>
      </template>
      <v-spacer />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-list nav flat dense>
      <v-list-item-group>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            link
            :to="child.to"
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="d-flex flex-row-reverse">
        <GithubCat />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      miniVariant: false,
      title: "Nuxt-Vuetify",
    };
  },
  created() {
    this.$store.dispatch("ui/loadMeta")
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$auth.redirect('login')
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("ui", ["menuItems"]),
    leftDrawer: {
      get() {
        return this.$store.state.ui.leftDrawer;
      },
      set(value) {
        this.$store.commit("ui/updateLeftDrawer", value);
      },
    },
  },
};
</script>