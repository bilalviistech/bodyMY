import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const VIDEO_WIDTH = width - 48;
const VIDEO_HEIGHT = VIDEO_WIDTH * 0.6;

const ANALYSIS_RESULTS = [
  { id: 1, text: 'Heart rate extracted · 64 bpm', type: 'success' },
  { id: 2, text: 'Skin tone & age analysed', type: 'success' },
  { id: 3, text: 'Stress markers · mild elevation', type: 'warning' },
  { id: 4, text: 'Energy tone · good', type: 'success' },
];

export default function VideoResultScreen({ route, navigation }) {
  const { videoPath } = route.params ?? {};
  const insets = useSafeAreaInsets();
  const videoRef = useRef(null);

  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [showControls, setShowControls] = useState(true);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleDiscard = () => {
    navigation.goBack();
  };

  const handleSeeResults = () => {
    // Navigate to full results screen
    // navigation.navigate('FullResults');
    console.log('See full results');
navigation.navigate('MainTabs', {
    screen: 'Insight',
    params: {
        screen: 'WellnessScoreResult',
    }
});
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A17" />

      {/* Video Player */}
      <TouchableOpacity
        style={styles.videoWrapper}
        activeOpacity={1}
        onPress={() => {
          setPaused(!paused);
          setShowControls(true);
        }}
      >
        {videoPath ? (
          <Video
            ref={videoRef}
            source={{ uri: `file://${videoPath}` }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            paused={paused}
            onProgress={({ currentTime }) => setCurrentTime(currentTime)}
            onLoad={({ duration }) => setDuration(duration)}
            onEnd={() => {
              setPaused(true);
              setCurrentTime(0);
            }}
          />
        ) : (
          <View style={styles.videoPlaceholder} />
        )}

        {/* REC Badge */}
        <View style={styles.recBadge}>
          <View style={styles.recDot} />
          <Text style={styles.recText}>REC</Text>
          <Text style={styles.recCheck}>✓</Text>
        </View>

        {/* Play/Pause Button */}
        {(paused || showControls) && (
          <View style={styles.playButton}>
            {paused ? (
              <View style={styles.playIcon} />
            ) : null}
          </View>
        )}

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </TouchableOpacity>

      {/* Duration Label */}
      <Text style={styles.sectionLabel}>DURATION</Text>

      {/* Analysis Results */}
      <View style={styles.resultsList}>
        {ANALYSIS_RESULTS.map((item) => (
          <View
            key={item.id}
            style={[
              styles.resultItem,
              item.type === 'warning' && styles.resultItemWarning,
            ]}
          >
            <View
              style={[
                styles.resultDot,
                item.type === 'warning' && styles.resultDotWarning,
              ]}
            />
            <Text style={styles.resultText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={[styles.bottomRow, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.discardBtn} onPress={handleDiscard} activeOpacity={0.8}>
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resultsBtn} onPress={handleSeeResults} activeOpacity={0.85}>
          <Text style={styles.resultsBtnText}>See full results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A17',
    paddingHorizontal: 24,
  },

  // Video
  videoWrapper: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0D0C0A',
    marginBottom: 24,
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D0C0A',
  },

  // REC badge
  recBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C0552A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    zIndex: 10,
  },
  recDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  recText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  recCheck: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  // Play button
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 18,
    borderBottomWidth: 18,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
    marginLeft: 6,
    opacity: 0.9,
  },
  // outer circle around play
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },

  // Progress bar
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 8,
    zIndex: 10,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3D6B4F',
    borderRadius: 2,
  },
  timeText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '500',
    minWidth: 28,
  },

  // Section label
  sectionLabel: {
    color: '#8A8575',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.8,
    marginBottom: 12,
  },

  // Results list
  resultsList: {
    gap: 10,
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#233D2C',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 12,
  },
  resultItemWarning: {
    backgroundColor: '#4A2218',
  },
  resultDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#4A9B6A',
  },
  resultDotWarning: {
    backgroundColor: '#C0552A',
  },
  resultText: {
    color: '#EEE8DF',
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.2,
  },

  // Bottom buttons
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 20,
  },
  discardBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#4A4640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discardText: {
    color: '#8A8575',
    fontSize: 16,
    fontWeight: '500',
  },
  resultsBtn: {
    flex: 1.4,
    paddingVertical: 16,
    borderRadius: 50,
    backgroundColor: '#3D6B4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});