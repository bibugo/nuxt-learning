<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="login.username"
                label="Login"
                name="login"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="login.password"
                label="Password"
                name="password"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="userLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  auth: false,
  props: {
    source: String,
  },
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
        console.log(this.$auth.loggedIn)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
  },
};
</script>