---
sidebarDepth: 2
---
# 🖖 Create Gesture

<div class="row align-top">
  <div class="col-6"><div></div></div>
  <div class="col-6">
    <Window title="Step 1: Choose a model">
      <section>
        <p>To begin, select a model below:</p>
        <p>
          <select ref="modelSelector" class="full-width" @change="updateModel">
            <option value="hands">🖐 MediaPipe Hands</option>
          </select>
        </p>
        <div class="model-button-container model-button-container-hands">
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Start Hands" text-on="Stop Hands Model" :opts="demoOpts.hands" />
          <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo('hands')"><Fa-Video /> Start Hands</button>
        </div>
        <div class="model-button-container model-button-container-handpose hidden">
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-handpose" text-off="Start Handpose" text-on="Stop Handpose Model" :opts="demoOpts.handpose" />
          <button class="handsfree-show-when-started-without-handpose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-handpose handsfree-hide-when-loading" @click="startDemo('handpose')"><Fa-Video /> Start Handpose</button>
        </div>
      </section>
    </Window>
  </div>
</div>

<Window title="Step 2: Collect samples">
  <div class="row align-top">
    <div class="col-6">
      <fieldset>
        <legend>Current Shape</legend>
        <ul ref="currentShapeBox" class="mt-0 mb-0 tree-view" style="min-height: 220px">
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
      </fieldset>
    </div>
    <div class="col-6">
      <ol>
        <li>Select the number of hands required for this gesture to work</li>
        <li>Click the button below to record landmarks for 3 seconds</li>
        <li>Move your hands around slightly to capture subtle variations</li>
      </ol>
      <p>
        <fieldset>
          <legend>Number of hands</legend>
          <div class="field-row">
            <input id="radio-1-hands" type="radio" name="radio-number-hands" checked>
            <label for="radio-1-hands">1 Hand</label>
          </div>
          <div class="field-row">
            <input id="radio-2-hands" disabled type="radio" name="radio-number-hands">
            <label for="radio-2-hands">2 Hands</label>
          </div>
        </fieldset>
      </p>
      <div>
        <button ref="recordLandmarks" class="handsfree-hide-when-loading full-width" @click="startRecordingShapes">Record landmarks</button>
        <button disabled class="handsfree-show-when-loading"><Fa-Spinner spin /> Loading...</button>
      </div>
    </div>
  </div>
</Window>


<Window title="Step 3: Clean Data">
  <p>Click on any of the frames below that don't look right to remove them. The final gesture description does not use a neural network, so the number of samples isn't as important as the quality!</p>
  <div ref="recordingCanvasContainer" class="row align-top">
  </div>
</Window>

<Window title="Step 4: Gesture Description">
  <div class="row align-top">
    <div class="col-6">
      <fieldset>
        <legend>Gesture Description</legend>
        <textarea readonly ref="gestureDescriptionJSON" style="width: 100%" rows=20 :value="gestureJSON | prettyPrintJSON"></textarea>
      </fieldset>
    </div>
    <div class="col-6"></div>
  </div>
</Window>




<!-- Code -->
<script>
import CreateGesture from './index.js'
export default CreateGesture
</script>

<!-- Styles -->
<style lang="stylus">
.gesture-emoji
  font-size 30px
  display inline-block
  margin-right 10px
  margin-bottom 10px
  opacity 0.2

  &.active
    opacity 1

.landmark-canvas-wrap
  padding 3px
  box-sizing border-box
  
.landmark-canvas
  background #222
  width 100%
  transform scale(-1, 1)

  &:hover
    opacity 0.5
    background #666
  
  &.removed
    opacity 0.35
    background #999
</style>