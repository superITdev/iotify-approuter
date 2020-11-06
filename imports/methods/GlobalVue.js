const GlobalVue = {
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    }
  },
}
export default GlobalVue;
