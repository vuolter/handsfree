---
prev: /
next: /ref/
---
# 📋 Guides

- [🔌 Plugins and the main loop](/guide/the-loop/) - Learn how to hook into the main loop to work with the model data
- [🎭 Updating configs and switching models](/guide/updating-config/) - Learn how to swap out and combine models and configs in real time
<!-- - [💻 Interacting with the desktop](/guide/desktop) - Explore how to use Handsfree.js to interact with the desktop and Internet of Things -->

<style lang="stylus">
  // Fixes issue where home link pagers shows up as just "/" instead of "🏠 Home"
  .prev[href='/']
    color transparent
    &:after
      color $link
      content '🏠 Home'
      position relative
      left -.85em
</style>