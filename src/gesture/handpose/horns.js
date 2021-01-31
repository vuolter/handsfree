// 🤘
export default {
  description: [
    ["addCurl", "Thumb", "FullCurl", 1],
    
    ["addCurl", "Index", "NoCurl", 1.0],
    ["addDirection", "Index", "VerticalUp", 1.0],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "VerticalDown", 1.0],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "VerticalDown", 1.0],
    
    ["addCurl", "Pinky", "NoCurl", 1.0],
    ["addDirection", "Pinky", "VerticalUp", 1.0],

    ["setWeight", "Index", 2],
    ["setWeight", "Pinky", 2],
  ],

  config: {
    enabled: true,
    models: ['handpose', 'hands'],
    algorithm: 'fingerpose'
  }
}