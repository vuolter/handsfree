import Vue from 'vue'
import Vuex from 'vuex'
import { set } from 'lodash'
import hljs from 'highlight.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTracking: false,

    // Replaced with new Handsfree
    handsfree: {
      isStarted: false
    },

    // Tracks the state of different sidebars
    sidebar: {
      main: true
    },

    // Determines which dependencies have been loaded
    dependenciesLoaded: {
      youtubeIframe: false
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
