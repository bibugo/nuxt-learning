<template>
  <v-card flat class="mx-10 mb-10">
    <v-card-title class="justify-center">This is form title</v-card-title>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.first"
              :rules="rules.name"
              label="First name"
              
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="form.last"
              :rules="rules.name"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.bio">
              <template v-slot:label>
                <div>Bio <small>(optional)</small></div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.favoriteAnimal"
              :items="animals"
              :rules="rules.animal"
              label="Favorite animal"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-slider
              v-model="form.age"
              :rules="rules.age"
              label="Age"
              hint="Be honest"
              min="1"
              max="100"
              thumb-label
            ></v-slider>
          </v-col>
          <v-col cols="12">
            <v-checkbox v-model="form.terms">
              <template v-slot:label>
                <div @click.stop="">
                  Do you accept the
                  <a href="#" @click.prevent="terms = true">terms</a>
                  and
                  <a href="#" @click.prevent="conditions = true">conditions?</a>
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" color="primary" type="submit">
          Register
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title"> Terms </v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="terms = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title"> Conditions </v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="conditions = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  data() {
    const defaultForm = Object.freeze({
      first: "",
      last: "",
      bio: "",
      favoriteAnimal: "",
      age: null,
      terms: false,
    });

    return {
      overlay: false,
      form: Object.assign({}, defaultForm),
      rules: {
        age: [(val) => val < 10 || `I don't believe you!`],
        animal: [(val) => (val || "").length > 0 || "This field is required"],
        name: [(val) => (val || "").length > 0 || "This field is required"],
      },
      animals: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
      conditions: false,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
      terms: false,
      defaultForm,
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.first &&
        this.form.last &&
        this.form.favoriteAnimal &&
        this.form.terms
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.overlay = true
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.resetForm();
          this.overlay = false;
          this.$global.snackIt({type: 'error', message: '没有错误'})
        }, 3000);
    },
  },
};
</script>