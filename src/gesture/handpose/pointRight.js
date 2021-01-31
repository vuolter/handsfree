// 👉
export default {
  description: [
    ["addCurl", "Thumb", "HalfCurl", 0.5],
    ["addCurl", "Thumb", "NoCurl", 0.5],

    ["addCurl", "Index", "NoCurl", 1.0],
    ["addCurl", "Index", "HalfCurl", 0.5],
    ["addDirection", "Index", "HorizontalRight", 1.0],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "HorizontalLeft", 1.0],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "HorizontalLeft", 1.0],
    
    ["addCurl", "Pinky", "FullCurl", 1.0],
    ["addDirection", "Pinky", "HorizontalLeft", 1.0],

    ["setWeight", "Index", 2],
  ],

  config: {
    enabled: true,
    models: ['handpose', 'hands'],
    algorithm: 'fingerpose'
  }
}