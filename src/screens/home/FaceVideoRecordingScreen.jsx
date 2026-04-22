import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  useCameraFormat,
} from 'react-native-vision-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CAMERA_SIZE = width - 48;

const DURATIONS = [
  { label: '15s', sub: 'Quick', value: 15 },
  { label: '30s', sub: 'Standard', value: 30 },
  { label: '60s', sub: 'Deep', value: 60 },
];

const TODAY_PROMPT = '"How is your body feeling right now?"';

export default function FaceVideoRecordingScreen() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(30);

  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } = useMicrophonePermission();

  const device = useCameraDevice('front');
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } },
    { fps: 30 },
    { videoAspectRatio: 16 / 9 },
  ]);

  const cameraRef = useRef(null);
  const timerRef = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const requestPermissions = async () => {
      if (!hasCameraPermission) await requestCameraPermission();
      if (!hasMicPermission) await requestMicPermission();
    };
    requestPermissions();
  }, [hasCameraPermission, hasMicPermission]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const hasAllPermissions = hasCameraPermission && hasMicPermission;

  const recordVideo = async () => {
    if (!cameraRef.current || recording || !device) return;

    setRecording(true);
    setCountdown(selectedDuration);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      await cameraRef.current.startRecording({
        flash: 'off',
        onRecordingFinished: (video) => {
          console.log('✅ Video saved:', video.path);
          clearInterval(timerRef.current);
          setRecording(false);
          setCountdown(selectedDuration);

          navigation.navigate('VideoResult', { videoPath: video.path });
        },
        onRecordingError: (error) => {
          console.error('Recording Error:', error);
          clearInterval(timerRef.current);
          setRecording(false);
          setCountdown(selectedDuration);
          Alert.alert('Recording Failed', error.message);
        },
      });

      setTimeout(() => {
        if (cameraRef.current) cameraRef.current.stopRecording();
      }, selectedDuration * 1000);
    } catch (error) {
      console.error('Start Recording Error:', error);
      clearInterval(timerRef.current);
      setRecording(false);
    }
  };

  if (!hasAllPermissions) {
    return (
      <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Camera & Microphone{'\n'}Permissions Required</Text>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => Linking.openSettings()}>
          <Text style={styles.settingsBtnText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>No Front Camera Found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A17" />

      {/* Camera Viewfinder */}
      <View style={styles.cameraWrapper}>
        {/* Corner Brackets */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        {device ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            format={format}
            isActive={true}
            video={true}
            audio={true}
            fps={30}
            pixelFormat="yuv"
            onInitialized={() => setIsCameraReady(true)}
            onError={(error) => console.error('Camera Error:', error)}
          />
        ) : null}

        {/* Camera not ready overlay */}
        {!isCameraReady && (
          <View style={styles.cameraLoadingOverlay}>
            <Text style={styles.cameraLoadingText}>me.</Text>
          </View>
        )}

        {/* REC indicator */}
        {recording && (
          <View style={styles.recBadge}>
            <View style={styles.recDot} />
            <Text style={styles.recText}>REC</Text>
          </View>
        )}

        {/* Countdown overlay */}
        {recording && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}
      </View>

      {/* Duration Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>DURATION</Text>
        <View style={styles.durationRow}>
          {DURATIONS.map((d) => {
            const isSelected = selectedDuration === d.value;
            return (
              <TouchableOpacity
                key={d.value}
                style={[styles.durationBtn, isSelected && styles.durationBtnActive]}
                onPress={() => {
                  if (!recording) {
                    setSelectedDuration(d.value);
                    setCountdown(d.value);
                  }
                }}
                activeOpacity={0.8}
              >
                <Text style={[styles.durationValue, isSelected && styles.durationValueActive]}>
                  {d.label}
                </Text>
                <Text style={[styles.durationSub, isSelected && styles.durationSubActive]}>
                  {d.sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Today's Prompt */}
      <View style={styles.promptCard}>
        <Text style={styles.promptLabel}>TODAY PROMPT</Text>
        <Text style={styles.promptText}>{TODAY_PROMPT}</Text>
      </View>

      {/* Record Button */}
      {!recording && (
        <TouchableOpacity
          style={styles.recordBtn}
          onPress={recordVideo}
          activeOpacity={0.85}
        >
          <View style={styles.recordBtnInner} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A17',
    paddingHorizontal: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1A17',
    gap: 20,
    padding: 24,
  },
  loadingText: {
    color: '#EEE8DF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
  },
  settingsBtn: {
    backgroundColor: '#3D6B4F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  settingsBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Camera
  cameraWrapper: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    alignSelf: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#0D0C0A',
    marginBottom: 28,
    position: 'relative',
  },
  cameraLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0C0A',
  },
  cameraLoadingText: {
    color: '#2C4A35',
    fontSize: 52,
    fontWeight: '700',
    letterSpacing: 2,
  },

  // Corner brackets
  corner: {
    position: 'absolute',
    width: 22,
    height: 22,
    zIndex: 10,
  },
  cornerTL: {
    top: 14,
    left: 14,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#EEE8DF',
  },
  cornerTR: {
    top: 14,
    right: 14,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#EEE8DF',
  },
  cornerBL: {
    bottom: 14,
    left: 14,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#EEE8DF',
  },
  cornerBR: {
    bottom: 14,
    right: 14,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#EEE8DF',
  },

  // REC badge
  recBadge: {
    position: 'absolute',
    top: 16,
    left: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 20,
  },
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C0552A',
  },
  recText: {
    color: '#EEE8DF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
  },

  // Countdown
  countdownOverlay: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  countdownText: {
    color: '#EEE8DF',
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 2,
    opacity: 0.85,
  },

  // Duration
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#8A8575',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  durationBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#2A2720',
    borderWidth: 1,
    borderColor: '#3A3730',
  },
  durationBtnActive: {
    backgroundColor: '#C0552A',
    borderColor: '#C0552A',
  },
  durationValue: {
    color: '#8A8575',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  durationValueActive: {
    color: '#fff',
  },
  durationSub: {
    color: '#5A5650',
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 0.3,
  },
  durationSubActive: {
    color: '#F0E8E0',
  },

  // Prompt
  promptCard: {
    backgroundColor: '#2A2720',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3A3730',
    padding: 18,
    marginBottom: 28,
  },
  promptLabel: {
    color: '#8A8575',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  promptText: {
    color: '#C4B89A',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // Record button
  recordBtn: {
    alignSelf: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#EEE8DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordBtnInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C0552A',
  },
});