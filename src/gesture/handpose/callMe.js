// 🤙
export default {
  description: [
    ["addCurl", "Thumb", "NoCurl", 1],
    ["addDirection", "Thumb", "VerticalUp", 1.0],
    ["addDirection", "Pinky", "DiagonalUpRight", 1.0],
    ["addDirection", "Pinky", "DiagonalUpLeft", 1.0],
    
    ["addCurl", "Index", "FullCurl", 1.0],
    ["addDirection", "Index", "HorizontalRight", 1.0],
    ["addDirection", "Index", "HorizontalLeft", 1.0],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "HorizontalRight", 1.0],
    ["addDirection", "Middle", "HorizontalLeft", 1.0],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "HorizontalRight", 1.0],
    ["addDirection", "Ring", "HorizontalLeft", 1.0],
    
    ["addCurl", "Pinky", "NoCurl", 1.0],
    ["addDirection", "Pinky", "VerticalDown", 1.0],
    ["addDirection", "Pinky", "DiagonalDownRight", 1.0],
    ["addDirection", "Pinky", "DiagonalDownLeft", 1.0],

    ["setWeight", "Thumb", 2],
    ["setWeight", "Pinky", 2],
  ],

  config: {
    enabled: true,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}