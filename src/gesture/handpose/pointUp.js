// ☝
// @fixme Can't get this to work

export default {
  description: [
    ["addCurl", "Thumb", "HalfCurl", 0.5],
    ["addCurl", "Thumb", "NoCurl", 0.5],

    ["addCurl", "Index", "NoCurl", 1.0],
    // ["addCurl", "Index", "HalfCurl", 0.5],
    ["addDirection", "Index", "VerticalUp", 1.0],
    ["addDirection", "Index", "DiagonalUpRight", 0.5],
    ["addDirection", "Index", "DiagonalUpLeft", 0.5],
    
    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "VerticalDown", 1.0],
    // ["addDirection", "Middle", "DiagonalDownLeft", 0.5],
    // ["addDirection", "Middle", "DiagonalDownRight", 0.5],
    
    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "VerticalDown", 1.0],
    // ["addDirection", "Ring", "DiagonalDownLeft", 0.5],
    // ["addDirection", "Ring", "DiagonalDownRight", 0.5],
    
    ["addCurl", "Pinky", "FullCurl", 1.0],
    ["addDirection", "Pinky", "VerticalDown", 1.0],
    // ["addDirection", "Pinky", "DiagonalDownLeft", 0.5],
    // ["addDirection", "Pinky", "DiagonalDownRight", 0.5],

    // ["setWeight", "Index", 2],
  ],

  config: {
    enabled: true,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}