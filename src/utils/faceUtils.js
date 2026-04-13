import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Oval config
const OVAL_CENTER_X = SCREEN_WIDTH / 2;
const OVAL_CENTER_Y = SCREEN_HEIGHT * 0.4;
const OVAL_WIDTH = SCREEN_WIDTH * 0.65;
const OVAL_HEIGHT = OVAL_WIDTH * 1.35;

export const isFaceInGoodPosition = (face) => {
  if (!face) return false;

  const { bounds } = face;

  const faceCenterX = bounds.x + bounds.width / 2;
  const faceCenterY = bounds.y + bounds.height / 2;

  const centerToleranceX = OVAL_WIDTH * 0.25;
  const centerToleranceY = OVAL_HEIGHT * 0.25;

  const sizeMin = OVAL_WIDTH * 0.65;
  const sizeMax = OVAL_WIDTH * 1.1;

  const isCenteredX = Math.abs(faceCenterX - OVAL_CENTER_X) < centerToleranceX;
  const isCenteredY = Math.abs(faceCenterY - OVAL_CENTER_Y) < centerToleranceY;
  const isGoodSize = bounds.width > sizeMin && bounds.width < sizeMax;

  return isCenteredX && isCenteredY && isGoodSize;
};

export const getGuidanceMessage = (face) => {
  if (!face) return "Apna chehra camera mein dikhao";

  const { bounds } = face;
  const faceCenterX = bounds.x + bounds.width / 2;

  if (bounds.width < OVAL_WIDTH * 0.6) return "Thoda kareeb aao";
  if (bounds.width > OVAL_WIDTH * 1.15) return "Thoda door jao";

  if (faceCenterX < OVAL_CENTER_X - 50) return "Chehra right taraf le aao";
  if (faceCenterX > OVAL_CENTER_X + 50) return "Chehra left taraf le aao";

  return "Perfect! Ab recording start ho sakti hai";
};