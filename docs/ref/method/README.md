---
next: /ref/plugin/
prev: /ref/event/
---
# 💻 Methods

- [.start()](/ref/method/start/) - Loads dependencies and starts the trackers
- [.emit()](/ref/method/emit/) - Triggers an event on the `document` with a `handsfree-` namespace
- [.cleanConfig()](/ref/method/cleanConfig/) - Cleans and sanitizes the config, setting up defaults
- [.normalize()](/ref/method/normalize/) - A helper method to normalize values between 0 and 1
- [.on()](/ref/method/on/) - A helper method for listening to `.emit()` or browser events prefixed with `handsfree-`
- [.start()](/ref/method/start/) - Starts the [main loop](/guide/the-loop/) and begins tracking
- [.stop()](/ref/method/stop/) - Stops the [main loop](/guide/the-loop/) and tracking
- [.throttle()](/ref/method/throttle/) - Throttles the passed function so that it only runs every n milliseconds
- [.update()](/ref/method/update/) - Updates your `handsfree.config` and loads any missing dependencies
- [.use()](/ref/method/use/) - Adds callback functions to the [main loop](/guide/the-loop/) that can be toggled on/off