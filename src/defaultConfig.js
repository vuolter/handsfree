/**
 * The following are all the defaults
 * 
 * @see https://handsfree.js.org/ref/prop/config
 */
export default {
  // Use CDN by default
  assetsPath: 'https://unpkg.com/handsfree@8.0.0/build/lib/assets',
  
  // Setup config. Ignore this to have everything done for you automatically
  setup: {
    // The canvas element to use for rendering debug info like skeletons and keypoints
    canvas: {
      // The canvas element to hold the skeletons and keypoints
      $el: null,
      width: 1280,
      height: 720
    },
    // The video source to use. If not present, one will be created to capture webcam
    video: {
      // The video element to hold the webcam stream
      $el: null,
      width: 1280,
      height: 720
    },
    // The wrapping element
    wrap: {
      // The element to put the video and canvas inside of
      $el: null,
      // The parent element
      $parent: null
    }
  },

  // Weboji model
  weboji: {
    enabled: false,
    throttle: 0,

    videoSettings: {
      // The video, canvas, or image element
      // Omit this to auto create a <VIDEO> with the webcam
      videoElement: null,

      // ID of the device to use
      // Omit this to use the system default
      deviceId: null,

      // Which camera to use on the device
      // Possible values: 'user' (front), 'environment' (back)
      facingMode: 'user',

      // Video dimensions
      idealWidth: 320,
      idealHeight: 240,
      minWidth: 240,
      maxWidth: 1280,
      minHeight: 240,
      maxHeight: 1280
    },

    // Thresholds needed before these are considered "activated"
    // - Ranges from 0 (not active) to 1 (fully active)
    morphs: {
      threshold: {
        smileRight: 0.7,
        smileLeft: 0.7,
        browLeftDown: 0.8,
        browRightDown: 0.8,
        browLeftUp: 0.8,
        browRightUp: 0.8,
        eyeLeftClosed: 0.4,
        eyeRightClosed: 0.4,
        mouthOpen: 0.3,
        mouthRound: 0.8,
        upperLip: 0.5
      }
    }
  },

  // Hands model
  hands: {
    enabled: false,
    maxNumHands: 2,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  },

  // Facemesh model
  facemesh: {
    enabled: false,
    maxNumFaces: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  },

  // Holistic model
  holistic: {
    enabled: false,
    upperBodyOnly: true,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  },
}