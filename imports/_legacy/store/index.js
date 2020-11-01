import Vue from 'vue'
import Vuex from 'vuex'

import state from '/imports/_legacy/store/state'
// import * as getters from '/imports/_legacy/store/getters'
// import * as actions from '/imports/_legacy/store/actions'
import * as mutations from '/imports/_legacy/store/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
