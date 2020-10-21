// Loading

import Vue from 'vue';

export const recentlyUsedNodeItems = (state, {majorType, nodeItems}) => {
  Vue.set(state.recentlyUsedNodeItems, majorType, nodeItems);
}