// 🖖
export default {
  description: [
    ["addCurl", "Thumb", "NoCurl", 1],
    ["addDirection", "Thumb", "DiagonalUpLeft", 1.0],
    ["addDirection", "Thumb", "DiagonalUpRight", 1.0],
    ["addDirection", "Thumb", "HorizontalRight", 1.0],
    ["addDirection", "Thumb", "HorizontalLeft", 1.0],
    
    ["addCurl", "Index", "NoCurl", 1.0],
    ["addDirection", "Index", "DiagonalUpLeft", 1.0],
    ["addDirection", "Index", "DiagonalUpRight", 1.0],
    
    ["addCurl", "Middle", "NoCurl", 1.0],
    ["addDirection", "Middle", "DiagonalUpLeft", 1.0],
    ["addDirection", "Middle", "DiagonalUpRight", 1.0],
    
    ["addCurl", "Ring", "NoCurl", 1.0],
    ["addDirection", "Ring", "DiagonalUpLeft", 1.0],
    ["addDirection", "Ring", "DiagonalUpRight", 1.0],
    
    ["addCurl", "Pinky", "NoCurl", 1.0],
    ["addDirection", "Pinky", "DiagonalUpLeft", 1.0],
    ["addDirection", "Pinky", "DiagonalUpRight", 1.0]
  ],

  config: {
    enabled: true,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}