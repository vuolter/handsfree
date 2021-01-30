// 👎
export default {
  description: [
    ["addCurl", "Thumb", "NoCurl", 1.0],
    ["addDirection", "Thumb", "VerticalUp", 1.0],
    ["addDirection", "Thumb", "DiagonalUpLeft", 0.25],
    ["addDirection", "Thumb", "DiagonalUpRight", 0.25],

    ["addCurl", "Index", "FullCurl", 1.0],
    ["addDirection", "Index", "HorizontalLeft", 1.0],
    ["addDirection", "Index", "HorizontalRight", 1.0],

    ["addCurl", "Middle", "FullCurl", 1.0],
    ["addDirection", "Middle", "HorizontalLeft", 1.0],
    ["addDirection", "Middle", "HorizontalRight", 1.0],

    ["addCurl", "Ring", "FullCurl", 1.0],
    ["addDirection", "Ring", "HorizontalLeft", 1.0],
    ["addDirection", "Ring", "HorizontalRight", 1.0],

    ["addCurl", "Pinky", "FullCurl", 1.0],
    ["addDirection", "Pinky", "HorizontalLeft", 1.0],
    ["addDirection", "Pinky", "HorizontalRight", 1.0],
  ],

  config: {
    enabled: false,
    models: 'handpose',
    algorithm: 'fingerpose'
  }
}