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

  Docs:     https://handsfree.js.org
  Repo:     https://github.com/midiblocks/handsfree
  Discord:  https://discord.gg/TWemTd85

*/

/**
 * The Handsfree class
 * @see https://handsfree.js.org/getting-started
 */
class Handsfree {
  constructor (config = {}) {
    this.config = config
    
    this.emit('init', this)
  }

  /**
   * Starts the trackers
   */
  start (callback) {
    
  }

  /**
   * Triggers a document event with `handsfree-${eventName}`
   */
  emit (eventName, detail = null) {
    const event = new CustomEvent(`handsfree-${eventName}`, {detail})
    document.dispatchEvent(event)
  }
}

export default Handsfree