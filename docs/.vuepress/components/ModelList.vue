<template lang="pug">
div.mt-md
  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/model/weboji.html')
            img(src='https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif')
        .col-6
          h3
            router-link(to='/model/weboji.html') Jeeliz Weboji
          ul
            li 6DOF head pose estimations
            li 11 face morphs
            li 16 helper states
  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/model/hanpose.html')
            img(src='https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif')
        .col-6
          h3
            router-link(to='/model/hanpose.html') TensorFlow.js Handpose
          ul
            li 20 3D landmarks for 1 hand
            li A Three.js scene with a hand skeleton
            li Finger tip vector for pointing at things
          p
            small
              strong Note:
              |  This will be changed to 
              a(href='https://google.github.io/mediapipe/solutions/hands') MediaPipe Hands
              |  soon so that you can use 2 hands. The API will remain the same.
  .window
    .window-body
      .row
        .col-6
          router-link(to='/model/holistic.html')
            img(src='https://media3.giphy.com/media/mssf4vZa4gO5rZyItA/giphy.gif')
        .col-6
          h3
            router-link(to='/model/holistic.html') MediaPipe Holistic
          ul
            li 468 2D face landmarks
            li 21 2D hand landmarks per hand
            li 33 2D pose landmarks
</template>