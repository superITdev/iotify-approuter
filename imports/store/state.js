// Initial states
const state = {
  authenticated: false, // for login/signup
  recentlyUsedNodeItems: {
    // majorType : nodeItems([])
  },
  projectInfo: {
    // current project info
    // hidden fields : settled automatically from document returned
    // _id: // projectId
    // createdAt:
    // updatedAt:

    ownerId: '', // userId who was created this project
    name: '', // name of project
    description: '', // description for project
    graph: '', // graph-json string of project
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
