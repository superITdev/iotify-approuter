const GlobalVue = {
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  watch: {
    user(n, o) {
      if (!!n != !!o) {
        this.$store.commit("authenticated", !!n);
      }
    },
    "user.profile.avatar"(a) { // Use it when autopublish is off
      if (a) this.$subscribe("avatars.get.mine", [a]);
    }
  },
  meteor: {
    user() {
      return Meteor.user();
    },
    meAvatar() {
      if (this.user) {
        if (this.user.profile.avatar) {
          const avatar = Avatars.findOne({ _id: this.user.profile.avatar });
          if (avatar) return avatar.link("thumbnail");
        }
        if (this.user.profile.picture) return this.user.profile.picture;
      }
    },
    meTitle() {
      if (this.user) return this.user.profile.name ? this.user.profile.name : this.user.profile.email;
    }
  },
}
export default GlobalVue;
