<template lang="pug">
div.mt-md
  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/ref/model/hands.html')
            img(src='https://media0.giphy.com/media/y4S6WFaCUWvqHL7UA8/giphy.gif')
        .col-6
          h3
            router-link(to='/ref/model/hands.html') MediaPipe Hands
          ul
            li 21 2D hand landmarks per hand
            li Track up to 4 hands at once
            li 📅 Extra helpers and plugins coming soon
          div
            HandsfreeToggle.full-width.handsfree-hide-when-started-without-hands(text-off='Try Hands' text-on='Stop Hands' :opts='demo.hands' @stop='stop("hands")')
            button.handsfree-show-when-started-without-hands.handsfree-show-when-loading(disabled)
              Fa-Spinner(spin)
              | Loading...
            button.handsfree-show-when-started-without-hands.handsfree-hide-when-loading(@click='start("hands")')
              Fa-Video
              | Try Hands

  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/ref/model/facemesh.html')
            img(src='https://media0.giphy.com/media/g2msiDwoLqabEMrmaL/giphy.gif')
        .col-6
          h3
            router-link(to='/ref/model/facemesh.html') MediaPipe FaceMesh
          ul
            li 468 2D face landmarks
            li Track up to 4 faces at once
            li 📅 Extra helpers and plugins coming soon
          div
            HandsfreeToggle.full-width.handsfree-hide-when-started-without-facemesh(text-off='Try FaceMesh' text-on='Stop FaceMesh' :opts='demo.facemesh' @stop='stop("facemesh")')
            button.handsfree-show-when-started-without-facemesh.handsfree-show-when-loading(disabled)
              Fa-Spinner(spin)
              | Loading...
            button.handsfree-show-when-started-without-facemesh.handsfree-hide-when-loading(@click='start("facemesh")')
              Fa-Video
              | Try FaceMesh

  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/ref/model/pose.html')
            img(src='https://media2.giphy.com/media/VJ7aDV6F5id8wY2Ff0/giphy.gif')
        .col-6
          h3
            router-link(to='/ref/model/pose.html') MediaPipe Pose
          ul
            li Full body mode with 33 2D pose landmarks
            li Upper body mode with 25 2D upper pose landmarks
            li 📅 Extra helpers and plugins coming soon
          div
            HandsfreeToggle.full-width.handsfree-hide-when-started-without-pose(text-off='Try Pose' text-on='Stop Pose' :opts='demo.pose' @stop='stop("pose")')
            button.handsfree-show-when-started-without-pose.handsfree-show-when-loading(disabled)
              Fa-Spinner(spin)
              | Loading...
            button.handsfree-show-when-started-without-pose.handsfree-hide-when-loading(@click='start("pose")')
              Fa-Video
              | Try Pose

  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/ref/model/holistic.html')
            img(src='https://media3.giphy.com/media/9wXxXyUldVNKADnpwn/giphy.gif')
        .col-6
          h3
            router-link(to='/ref/model/holistic.html') MediaPipe Holistic
          ul
            li 468 2D face landmarks
            li 21 2D hand landmarks per hand with up to 4 hands
            li 33 2D pose landmarks
            li 📅 Extra helpers and plugins coming soon
          div
            HandsfreeToggle.full-width.handsfree-hide-when-started-without-holistic(text-off='Try Holistic' text-on='Stop Holistic' :opts='demo.holistic' @stop='stop("holistic")')
            button.handsfree-show-when-started-without-holistic.handsfree-show-when-loading(disabled)
              Fa-Spinner(spin)
              | Loading...
            button.handsfree-show-when-started-without-holistic.handsfree-hide-when-loading(@click='start("holistic")')
              Fa-Video
              | Try Holistic

  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/ref/model/handpose.html')
            img(src='https://media1.giphy.com/media/qtDKTxsvD2fegGlRFr/giphy.gif')
        .col-6
          h3
            router-link(to='/ref/model/handpose.html') TensorFlow Handpose
          ul
            li 21 3D hand landmarks
            li Can only track 1 hand at a time
            li 📅 Extra helpers and plugins coming soon
          div
            HandsfreeToggle.full-width.handsfree-hide-when-started-without-handpose(text-off='Try Handpose' text-on='Stop Handpose' :opts='demo.handpose' @stop='stop("handpose")')
            button.handsfree-show-when-started-without-handpose.handsfree-show-when-loading(disabled)
              Fa-Spinner(spin)
              | Loading...
            button.handsfree-show-when-started-without-handpose.handsfree-hide-when-loading(@click='start("handpose")')
              Fa-Video
              | Try Handpose

  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/ref/model/weboji.html')
            img(src='https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif')
        .col-6
          h3
            router-link(to='/ref/model/weboji.html') Jeeliz Weboji
          ul
            li 6DOF head pose estimations
            li 11 face morphs and 16 helper states
            li Comes with "Face Pointer" based plugins
          div
            HandsfreeToggle.full-width.handsfree-hide-when-started-without-weboji(text-off='Try Weboji' text-on='Stop Weboji' :opts='demo.weboji' @stop='stop("weboji")')
            button.handsfree-show-when-started-without-weboji.handsfree-show-when-loading(disabled)
              Fa-Spinner(spin)
              | Loading...
            button.handsfree-show-when-started-without-weboji.handsfree-hide-when-loading(@click='start("weboji")')
              Fa-Video
              | Try Weboji
</template>

<script>
export default {
  data () {
    return {
      demo: {
        weboji: {
          autostart: true,
          weboji: true
        },
        hands: {
          autostart: true,
          hands: true
        },
        facemesh: {
          autostart: true,
          facemesh: true
        },
        pose: {
          autostart: true,
          pose: true
        },
        holistic: {
          autostart: true,
          holistic: true
        },
        handpose: {
          autostart: true,
          handpose: true
        }
      }
    }
  },

  methods: {
    /**
     * Start the page with our preset options
     */
    start (modelName) {
      this.$root.handsfree.update(this.demo[modelName])
    },

    stop (modelName) {
      this.$root.handsfree.model[modelName].disable()
    }
  }
}
</script>