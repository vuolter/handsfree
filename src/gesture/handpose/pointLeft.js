// 👈
export default {
  description: [
    ["addCurl", "Thumb", "HalfCurl", 0.5],
    ["addCurl", "Thumb", "NoCurl", 0.5],

    ["addCurl", "Index", "NoCurl", 1.0],
    ["addCurl", "Index", "HalfCurl", 0.5],
    ["addDirection", "Index", "HorizontalLeft", 1.0],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "HorizontalRight", 1.0],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "HorizontalRight", 1.0],
    
    ["addCurl", "Pinky", "FullCurl", 1.0],
    ["addDirection", "Pinky", "HorizontalRight", 1.0],

    ["setWeight", "Index", 2],
  ],

  config: {
    enabled: true,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}