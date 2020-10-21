import Vue from 'vue'
import Vuex from 'vuex'

import state from '/imports/store_/state'
// import * as getters from '/imports/store_/getters'
// import * as actions from '/imports/store_/actions'
import * as mutations from '/imports/store_/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
