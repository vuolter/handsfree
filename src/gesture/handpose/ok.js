// 👌
export default {
  description: [
    ["addCurl", "Thumb", "HalfCurl", 1],
    ["addCurl", "Thumb", "FullCurl", 0.5],
    ["addDirection", "Thumb", "VerticalUp", 1.0],
    ["addDirection", "Thumb", "DiagonalUpLeft", 1.0],
    ["addDirection", "Thumb", "DiagonalUpRight", 1.0],
    ["addDirection", "Thumb", "HorizontalUpLeft", 0.75],
    ["addDirection", "Thumb", "HorizontalUpRight", 0.75],
    
    ["addCurl", "Index", "HalfCurl", 1.0],
    ["addCurl", "Index", "FullCurl", 0.5],
    ["addDirection", "Index", "VerticalUp", 1.0],
    ["addDirection", "Index", "DiagonalDownLeft", 1.0],
    ["addDirection", "Index", "DiagonalDownRight", 1.0],
    
    ["addCurl", "Middle", "NoCurl", 1.0],
    ["addDirection", "Middle", "VerticalUp", 1.0],
    ["addDirection", "Middle", "DiagonalUpLeft", 1.0],
    ["addDirection", "Middle", "DiagonalUpRight", 1.0],
    
    ["addCurl", "Ring", "NoCurl", 1.0],
    ["addDirection", "Ring", "VerticalUp", 1.0],
    ["addDirection", "Ring", "DiagonalUpLeft", 1.0],
    ["addDirection", "Ring", "DiagonalUpRight", 1.0],
    
    ["addCurl", "Pinky", "NoCurl", 1.0],
    ["addDirection", "Pinky", "VerticalUp", 1.0],
    ["addDirection", "Pinky", "DiagonalUpLeft", 1.0],
    ["addDirection", "Pinky", "DiagonalUpRight", 1.0],

    ["setWeight", "Thumb", 2],
    ["setWeight", "Index", 2],
  ],

  config: {
    enabled: true,
    models: ['handpose', 'hands'],
    algorithm: 'fingerpose'
  }
}