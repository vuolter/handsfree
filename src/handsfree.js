/*
                   ____                  
                _.' :  `._               
            .-.'`.  ;   .'`.-.           
   __      / : ___\ ;  /___ ; \      __  
 ,'_ ""--.:__;".-.";: :".-.":__;.--"" _`,
 :' `.t""--.. '<@.`;_  ',@>` ..--""j.' `;
      `:-.._J '-.-'L__ `-- ' L_..-;'     
        "-.__ ;  .-"  "-.  : __.-"       
            L ' /.------.\ ' J           
             "-.   "--"   .-"            
            __.l"-:_JL_;-";.__   

        "For my ally is the Force,
        and a powerful ally it is."
                - Yoda

              ~ Presenting ~

               Handsfree.js
                  8.0.0

  Docs:       https://handsfree.js.org
  Repo:       https://github.com/midiblocks/handsfree
  Discord:    https://discord.gg/TWemTd85
  Newsletter: http://eepurl.com/hhD7S1
*/

/**
 * The Handsfree class
 * @see https://handsfree.js.org/getting-started
 */
class Handsfree {
  /**
   * Let's do this 🖐
   * @param {Object} config The initial config to use
   */
  constructor (config = {}) {
    this.config = this.cleanConfig(config)
    
    this.emit('init', this)
  }

  /**
   * Starts the trackers
   * @param {Function} callback The callback to run before the very first frame
   * @see https://handsfree.js.org/ref/method/start
   */
  start (callback) {
    
  }

  /**
   * Triggers a document event with `handsfree-${eventName}`
   * @param {String} eventName The name of the event
   * @param {*} detail (optional) Data to send with the event
   */
  emit (eventName, detail = null) {
    const event = new CustomEvent(`handsfree-${eventName}`, {detail})
    document.dispatchEvent(event)
  }

  /**
   * Cleans and sanitizes the config, setting up defaults
   * @param config
   * @see https://handsfree.js.org/ref/method/cleanConfig
   */
  cleanConfig (config) {
    console.log('config', config)
  }
}

/**
 * Default Config
 */
const defaultConfig = {
  // Setup config. Ignore this to have everything done for you automatically
  setup: {
    // The video source to use. If not present, one will be created to capture webcam
    video: null,
    // The canvas element to use for rendering debug info like skeletons and keypoints
    canvas: null
  }
}

export default Handsfree