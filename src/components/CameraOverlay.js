import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Ellipse, Rect } from 'react-native-svg';
import { isFaceInGoodPosition, getGuidanceMessage } from '../utils/faceUtils';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CameraOverlay = ({ face, isRecording }) => {
  const isGoodPosition = face ? isFaceInGoodPosition(face) : false;
  const message = getGuidanceMessage(face);

  const ovalColor = isGoodPosition ? '#00FF00' : '#FF0000';

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Dark mask */}
      <View style={styles.maskContainer} />

      {/* SVG Oval */}
      <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${SCREEN_WIDTH} ${SCREEN_HEIGHT}`}>
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="rgba(0,0,0,0.6)"
        />
        <Ellipse
          cx={SCREEN_WIDTH / 2}
          cy={SCREEN_HEIGHT * 0.4}
          rx={SCREEN_WIDTH * 0.325}
          ry={SCREEN_WIDTH * 0.44}
          stroke={ovalColor}
          strokeWidth="4"
          fill="transparent"
        />
      </Svg>

      {/* Guidance */}
      <View style={styles.guidanceContainer}>
        <Text style={styles.guidanceText}>{message}</Text>

        {isGoodPosition && !isRecording && (
          <Text style={styles.readyText}>
            Face sahi position mein hai ✓
          </Text>
        )}
      </View>

      {/* Recording Indicator */}
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>
            ● RECORDING (15s)
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  guidanceContainer: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  guidanceText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  readyText: {
    color: '#00FF00',
    fontSize: 14,
    marginTop: 6,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,0,0,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  recordingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});