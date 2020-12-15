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
    // The video source to use. If not present, one will be created to capture webcam
    video: {
      $el: null,
      width: 1280,
      height: 720
    },
    // The canvas element to use for rendering debug info like skeletons and keypoints
    canvas: {
      $el: null,
      width: 1280,
      height: 720
    },
    // The wrapping element
    wrap: {
      $el: null,
      $target: null
    }
  },

  // Holistic model
  holistic: {
    enabled: false,
    upperBodyOnly: true,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  },

  // Weboji model
  weboji: {
    enabled: false,
    videoSettings: null,
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

  handpose: {
    enabled: false,
    
    // How many milliseconds to wait between each inference
    throttle: 0,

    // Model config
    model: {
      // How many frames to go without running the bounding box detector.
      // - Set to a lower value if you want a safety net in case the mesh
      //   detector produces consistently flawed predictions
      maxContinuousChecks: Infinity,

      // Threshold for discarding a prediction
      detectionConfidence: 0.8,

      // A float representing the threshold for deciding whether boxes overlap
      // too much in non-maximum suppression. Must be between [0, 1]
      iouThreshold: 0.3,

      // A threshold for deciding when to remove boxes based on score in non-maximum suppression
      scoreThreshold: 0.75
    }
  }
}