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
            li 11 face morphs and 16 helper states
            li Comes with "Face Pointer" based plugins
  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/model/hands.html')
            img(src='https://media0.giphy.com/media/y4S6WFaCUWvqHL7UA8/giphy.gif')
        .col-6
          h3
            router-link(to='/model/hands.html') MediaPipe Hands
          ul
            li 21 3D hand landmarks per hand
            li Track up to 4 hands at once
            li 📅 Extra helpers and plugins coming soon
  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/model/facemesh.html')
            img(src='https://media0.giphy.com/media/g2msiDwoLqabEMrmaL/giphy.gif')
        .col-6
          h3
            router-link(to='/model/facemesh.html') MediaPipe FaceMesh
          ul
            li 468 3D face landmarks
            li Track up to 4 faces at once
            li 📅 Extra helpers and plugins coming soon
  .window.mb-md
    .window-body
      .row
        .col-6
          router-link(to='/model/pose.html')
            img(src='https://media2.giphy.com/media/VJ7aDV6F5id8wY2Ff0/giphy.gif')
        .col-6
          h3
            router-link(to='/model/pose.html') MediaPipe Pose
          ul
            li Full body mode with 33 2D pose landmarks
            li Upper body mode with 25 2D upper pose landmarks
            li 📅 Extra helpers and plugins coming soon
  .window
    .window-body
      .row
        .col-6
          router-link(to='/model/holistic.html')
            img(src='https://media3.giphy.com/media/9wXxXyUldVNKADnpwn/giphy.gif')
        .col-6
          h3
            router-link(to='/model/holistic.html') MediaPipe Holistic
          ul
            li 468 2D face landmarks
            li 21 2D hand landmarks per hand with up to 4 hands
            li 33 2D pose landmarks
            li 📅 Extra helpers and plugins coming soon
</template>