// Initial states
const state = {
  authenticated: false, // for login/signup
  recentlyUsedNodeItems: {
    // majorType : nodeItems([])
  },
  deploymentInfo: {
    // current deployment info
    // hidden fields : settled automatically from document returned
    // _id: // projectId
    // createdAt:
    // updatedAt:

    ownerId: '', // userId who was created this deployment
    name: '', // name of deployment
    description: '', // description for deployment
    graph: '', // graph-json string of deployment
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
