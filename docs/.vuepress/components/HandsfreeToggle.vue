<template>
<div>
  <button class="handsfree-show-when-stopped handsfree-hide-when-loading" onclick="handsfree.start()"><Fa-Video /> <span>{{textOff}}</span></button>
  <button class="handsfree-show-when-loading" disabled><Fa-Spinner :spin='true' /> <span>Loading...</span></button>
  <button class="handsfree-show-when-started negative" onclick="handsfree.stop()"><Fa-VideoSlash /> <span>{{textOn}}</span></button>
</div>
</template>

<script>
export default {
  name: 'HandsfreeToggle',

  props: ['textOff', 'textOn']
}
</script>