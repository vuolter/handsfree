import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#ff9d00',
        secondary: '#a599e9',
        info: '#9effff',
        success: '#a5ff90',
        error: '#f2628c',
        warning: '#ff9d00',
        anchor: '#ff9d00'
      }
    }
  }
})
