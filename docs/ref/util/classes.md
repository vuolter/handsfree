---
prev: /ref/util/
next: /community/
---
# 🎨 Classes

The following classes are available to help you style your site based on different Handsfree.js states.

## Body Classes
The following classes are added to the body during various parts of the Handsfree workflow:

```css
body.handsfree-started
body.handsfree-loading

body.handsfree-model-weboji
body.handsfree-model-handpose
body.handsfree-model-holistic
```

## Started, loading, and stopped states
The following can be added to elements to only show that element when the matching handsfree state is active:

```css
.handsfree-show-when-stopped
.handsfree-show-when-started
.handsfree-show-when-loading
```

## Model specific
The following can be added to elements to show that element only when specific models are active:

```css
.handsfree-hide-when-started-without-weboji
.handsfree-hide-when-started-without-handpose
.handsfree-hide-when-started-without-holistic

.handsfree-show-when-started-without-weboji
.handsfree-show-when-started-without-handpose
.handsfree-show-when-started-without-holistic
```