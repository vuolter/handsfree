import Vue from 'vue'
import Vuex from 'vuex'
import { set } from 'lodash'
import hljs from 'highlight.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTracking: false,

    handsfree: {
      isStarted: false
    }
  },

  mutations: {
    /**
     * Assigns a deep value
     * @param {*} state
     * @param {*} payload [0] = The state path, [1] = The value to assign, [2] = Whether to persist in localstorage
     */
    set(state, payload) {
      set(state, payload[0], payload[1])
    }
  },

  actions: {
    /**
     * Starts/stops Handsfree.js tracking
     */
    startTracking({ state }) {
      state.handsfree.start()
      state.isTracking = true
    },
    stopTracking({ state }) {
      state.handsfree.stop()
      state.isTracking = false
    },

    /**
     * Syntax Highlight
     */
    syntaxHighlight() {
      hljs.initHighlighting.called = false
      hljs.initHighlighting()
    }
  },

  modules: {}
})
