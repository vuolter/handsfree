// 🤟
export default {
  description: [
    ["addCurl", "Thumb", "NoCurl", 1],
    ["addDirection", "Index", "DiagonalUpRight", 1.0],
    ["addDirection", "Index", "DiagonalUpLeft", 1.0],
    ["addDirection", "Index", "HorizontalRight", 1.0],
    ["addDirection", "Index", "HorizontalLeft", 1.0],
    
    ["addCurl", "Index", "NoCurl", 1.0],
    ["addDirection", "Index", "VerticalUp", 1.0],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "VerticalDown", 1.0],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "VerticalDown", 1.0],
    
    ["addCurl", "Pinky", "NoCurl", 1.0],
    ["addDirection", "Pinky", "VerticalUp", 1.0],

    ["setWeight", "Thumb", 2],
  ],

  config: {
    enabled: true,
    models: ['handpose', 'hands'],
    algorithm: 'fingerpose'
  }
}