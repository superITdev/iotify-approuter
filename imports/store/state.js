// Initial states
const state = {
  authenticated: false, // for login/signup
  recentlyUsedNodeItems: {
    // majorType : nodeItems([])
  },

  // for ui
  snack: {
    active: false,
    text: "Hello!!",
    color: "success",
  },
  confirm: {
    dialog: false,
    title: "",
    text: "",
  },
  crumbs: [],
  loading: false,
}

export default state
