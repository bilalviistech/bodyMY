// Sirf reference ke liye, JS mein types enforce nahi hote

export const createFace = (bounds) => ({
  bounds: {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  },
});