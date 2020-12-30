---
prev: /community/
next: false
---
# About Handsfree.js.org

## Master Plan

1. Create a library that makes face, hand, eye, and pose tracking and voice and mind control easy to use 
2. Use the library to build a repository of custom handsfree plugins, components, and gestures
3. Use the repository to seed a "user script manager" to power a handsfree browser extension
4. Grow a community of handsfree users and developers around the library and repository
5. Start "The Handsfree Foundation" to promote creative expression

## Special Thanks

This project couldn't have been possible without:

- Invitations to residencies at [The STUDIO for Creative Inquiry]() (Spring 2019, 2021)
- Grant from [Glitch.com](https://glitch.com) (Winter 2019)
- Grant from the School of AI Grant (Fall 2018)
- Grant from [Google PAIR](https://pair.withgoogle.com/) (Spring 2018)

## Support Handsfree.js.org

Please consider supporting this project 💜 There are several ways to help:

- [Sponsor the project on GitHub](https://github.com/sponsors/midiblocks)
- [Make a Pull Request](https://github.com/midiblocks)

---

## Changelog

<div class="next-element-is-changelog"></div>

| Date | Version | Description |
| ---- | ------- | ----------- |
| 2020-12-30 | 8.1.0 | Adds [.showDebugger()](/ref/method/showDebugger/), [.hideDebugger()](/ref/method/hideDebugger/), and helper classes. Renames `feedback` to `debugger`
| 2020-12-29 | 8.0.10 | Fixes a bug where `handsfree.debug.$video` had 0 width and height; Fixed issue where the webcam feed was not showing behind model wireframes when `handsfree.config.showDebug === true`
| 2020-12-28 | 8.0.9 | Adds [isClient Mode](/ref/prop/config#isclient) for remote inference. [.runPlugins()](/ref/method/runPlugins/) [.TweenMax()](/ref/method/TweenMax/), [.throttle()](/ref/method/throttle/), reduced filesize by 80kb+
| 2020-12-22 | 8.0.7 | Adds [handsfree.model.weboji.isDetected](/ref/model/weboji/)