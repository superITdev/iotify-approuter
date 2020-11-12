<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blue darken-3 headline" small fab depressed v-bind="attrs" v-on="on">+</v-btn>
      <div class="body-2 grey--text text--darken-1">Add Project</div>
    </template>

    <v-card>
      <v-card-title>
        New project
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation @keyup.native.enter="save" @keyup.native.esc="close">
          <v-text-field label="Name" required :rules="nameRules" v-model="projectInfo.name"/>
          <v-textarea label="Description" v-model="projectInfo.description"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small class="text-none" @click="close">Close</v-btn>
        <v-btn small class="text-none" @click="save">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      nameRules: [
        v => !!v || 'Name is required.',
      ],
      projectInfo: {
        name: '',
        description: '',
      }
    }
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("snack", {text: "Please, confirm required fields.", color: "error"});
        return;
      }

      this.$store.commit('newProjectInfo', this.projectInfo);

      this.dialog = false;
      this.$refs.form.reset();

      this.$router.push('/work');
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
    }
  }
}
</script>