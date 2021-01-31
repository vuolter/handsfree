// 🤚
export default {
  description: [
    ["addCurl", "Thumb", "NoCurl", 1],
    ["addDirection", "Thumb", "VerticalUp", 1.0],
    
    ["addCurl", "Index", "NoCurl", 1.0],
    ["addDirection", "Index", "VerticalUp", 1.0],
    
    ["addCurl", "Middle", "NoCurl", 1.0],
    ["addDirection", "Middle", "VerticalUp", 1.0],
    
    ["addCurl", "Ring", "NoCurl", 1.0],
    ["addDirection", "Ring", "VerticalUp", 1.0],
    
    ["addCurl", "Pinky", "NoCurl", 1.0],
    ["addDirection", "Pinky", "VerticalUp", 1.0],
  ],

  config: {
    enabled: true,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}