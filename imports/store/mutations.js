import Vue from 'vue';

export const authenticated = (state, auth) => {
  state.authenticated = auth;
}

export const recentlyUsedNodeItems = (state, {majorType, nodeItems}) => {
  Vue.set(state.recentlyUsedNodeItems, majorType, nodeItems);
}
export const projectInfo = (state, info) => {
  state.projectInfo = {...state.projectInfo, ...info}
  if (!state.projectInfo.ownerId) state.projectInfo.ownerId = Meteor.userId();
}
export const newProjectInfo = (state, info) => {
  state.projectInfo = {...info}
  if (!state.projectInfo.ownerId) state.projectInfo.ownerId = Meteor.userId();
}

// BreadCrumbs
export const updateCrumbs = (state, crumbs) => {
  if (!crumbs) {
    Vue.set(state, "crumbs", [])
    return;
  }
  let c = JSON.parse(JSON.stringify(state.crumbs));
  c.splice(crumbs.position, 10);
  c[crumbs.position] = crumbs;
  Vue.set(state, "crumbs", c);
}

// SnackBar for notifications
export const snack = (state, {text, color}) => {
  state.snack.active = true;
  state.snack.text = text,
  state.snack.color = color
}
export const deactivateSnack = (state) => {
  state.snack.active = false;
}

// Confirm-MessageBox
export const confirm = (state, {title, text}) => {
  state.confirm.dialog = true,
  state.confirm.text = text,
  state.confirm.title = title
}
export const deactivateConfirm = (state) => {
  state.confirm.dialog=false;
}