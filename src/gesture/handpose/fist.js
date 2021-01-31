// 🤟
export default {
  description: [
    ["addCurl", "Thumb", "FullCurl", 1.0],
    ["addDirection", "Index", "HorizontalLeft", 1.0],
    ["addDirection", "Index", "HorizontalRight", 1.0],
    ["addDirection", "Index", "DiagonalUpLeft", 1.0],
    ["addDirection", "Index", "DiagonalUpRight", 1.0],
    ["addDirection", "Index", "DiagonalDownLeft", 1.0],
    ["addDirection", "Index", "DiagonalDownRight", 1.0],
    
    ["addCurl", "Index", "FullCurl", 1.0],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    
    ["addCurl", "Pinky", "FullCurl", 1.0],

    ["setWeight", "Thumb", 2],
  ],

  config: {
    enabled: true,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}