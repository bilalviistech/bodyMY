// import React, { useRef, useState, useCallback } from 'react';
// import { View, StyleSheet, Alert, Button, Text } from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { scanFaces } from 'react-native-vision-camera-face-detector';
// import { runOnJS } from 'react-native-reanimated';

// import { CameraOverlay } from '../../components/CameraOverlay';
// import { isFaceInGoodPosition } from '../../utils/faceUtils';

// const FaceVideoRecordingScreen = () => {
//   const cameraRef = useRef(null);
//   const device = useCameraDevice('front');
//   const { hasPermission, requestPermission } = useCameraPermission();

//   const [face, setFace] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingTimer, setRecordingTimer] = useState(0);

//   // Frame Processor
//   const frameProcessor = useFrameProcessor((frame) => {
//     'worklet';
//     const detected = scanFaces(frame);

//     if (detected.length > 0) {
//       const mainFace = detected[0];

//       runOnJS(setFace)({
//         bounds: {
//           x: mainFace.bounds.x,
//           y: mainFace.bounds.y,
//           width: mainFace.bounds.width,
//           height: mainFace.bounds.height,
//         },
//       });
//     } else {
//       runOnJS(setFace)(null);
//     }
//   }, []);

//   const start15SecRecording = useCallback(async () => {
//     if (!cameraRef.current || isRecording || !face || !isFaceInGoodPosition(face)) {
//       Alert.alert('Face sahi position mein nahi hai');
//       return;
//     }

//     setIsRecording(true);
//     setRecordingTimer(0);

//     try {
//       await cameraRef.current.startRecording({
//         flash: 'off',
//         onRecordingFinished: (video) => {
//           setIsRecording(false);
//           setRecordingTimer(0);

//           Alert.alert(
//             'Recording Complete',
//             `Video saved at: ${video.path}`
//           );
//         },
//         onRecordingError: (error) => {
//           console.error(error);
//           setIsRecording(false);
//           Alert.alert('Recording Error', error.message);
//         },
//       });

//       // Timer UI
//       const interval = setInterval(() => {
//         setRecordingTimer((prev) => {
//           if (prev >= 14) {
//             clearInterval(interval);
//             return 15;
//           }
//           return prev + 1;
//         });
//       }, 1000);

//       // Auto stop after 15 sec
//       setTimeout(async () => {
//         if (cameraRef.current) {
//           await cameraRef.current.stopRecording();
//         }
//       }, 15000);

//     } catch (e) {
//       console.error(e);
//       setIsRecording(false);
//     }
//   }, [face, isRecording]);

//   const stopRecording = useCallback(async () => {
//     if (cameraRef.current && isRecording) {
//       await cameraRef.current.stopRecording();
//       setIsRecording(false);
//     }
//   }, [isRecording]);

//   if (!hasPermission) {
//     return (
//       <View style={styles.center}>
//         <Button title="Camera Permission Do" onPress={requestPermission} />
//       </View>
//     );
//   }

//   if (device == null) {
//     return <Text>No Camera Device Found</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         video={true}
//         audio={true}
//         frameProcessor={frameProcessor}
//         fps={30}
//       />

//       <CameraOverlay face={face} isRecording={isRecording} />

//       <View style={styles.bottomControls}>
//         <Text style={styles.timerText}>
//           {isRecording ? `${recordingTimer} / 15 sec` : ''}
//         </Text>

//         <Button
//           title={isRecording ? "Stop Recording" : "Start 15s Recording"}
//           onPress={isRecording ? stopRecording : start15SecRecording}
//           disabled={isRecording}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'black' },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   bottomControls: {
//     position: 'absolute',
//     bottom: 40,
//     alignSelf: 'center',
//   },
//   timerText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default FaceVideoRecordingScreen;

// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { scanFaces } from 'react-native-vision-camera-face-detector';
// import { runOnJS } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const { width } = Dimensions.get('window');
// const OVAL_SIZE = width * 0.75;

// const FaceVideoRecordingScreen = () => {
//   const cameraRef = useRef(null);
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const device = useCameraDevice('front');

//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(15);
//   const [faceStatus, setFaceStatus] = useState('no-face');
//   const [statusMessage, setStatusMessage] = useState('Position your face inside the oval');
//   const [isFaceDetected, setIsFaceDetected] = useState(false);

//   const insets = useSafeAreaInsets();

//   // Request camera permission
//   useEffect(() => {
//     if (!hasPermission) {
//       requestPermission();
//     }
//   }, [hasPermission, requestPermission]);

//   // Check face position
//   const checkFacePosition = useCallback((face) => {
//     if (!face?.bounds) return 'no-face';

//     const faceWidth = face.bounds.width;
//     const faceCenterX = face.bounds.x + faceWidth / 2;
//     const screenCenterX = width / 2;
//     const distanceFromCenter = Math.abs(faceCenterX - screenCenterX);

//     const idealFaceSize = OVAL_SIZE * 0.65;

//     if (faceWidth < idealFaceSize * 0.7) return 'too-far';
//     if (faceWidth > idealFaceSize * 1.3) return 'too-close';
//     if (distanceFromCenter > 60) return 'too-far';

//     return 'good';
//   }, []);

//   // Real-time face detection frame processor
//   const frameProcessor = useFrameProcessor((frame) => {
//     'worklet';
//     try {
//       const faces = scanFaces(frame);

//       runOnJS((detectedFaces) => {
//         if (detectedFaces.length === 0) {
//           setIsFaceDetected(false);
//           setFaceStatus('no-face');
//           setStatusMessage('No face detected. Please face the camera.');
//           return;
//         }

//         const status = checkFacePosition(detectedFaces[0]);
//         setIsFaceDetected(true);
//         setFaceStatus(status);

//         if (status === 'good') {
//           setStatusMessage('Perfect! Keep still and tap Record.');
//         } else if (status === 'too-far') {
//           setStatusMessage('Move closer to the camera');
//         } else if (status === 'too-close') {
//           setStatusMessage('Move a bit farther');
//         }
//       })(faces);
//     } catch (e) {
//       console.log('Face detection error', e);
//     }
//   }, [checkFacePosition]);

//   // Start 15-second video recording
//   const startRecording = async () => {
//     if (!cameraRef.current || !isFaceDetected || faceStatus !== 'good') {
//       Alert.alert('Warning', 'Please position your face properly inside the oval first.');
//       return;
//     }

//     setIsRecording(true);
//     setRecordingTime(15);

//     try {
//       await cameraRef.current.startRecording({
//         flash: 'off',
//         onRecordingFinished: (video) => {
//           setIsRecording(false);
//           setRecordingTime(15);
//           console.log('Video saved at:', video.path);
//           Alert.alert(
//             'Recording Complete',
//             `Video saved successfully!\n\nPath: ${video.path}`
//           );
//           // TODO: Upload video or save to gallery here
//         },
//         onRecordingError: (error) => {
//           console.error('Recording error:', error);
//           setIsRecording(false);
//           Alert.alert('Recording Failed', error.message);
//         },
//       });

//       // Auto stop after 15 seconds
//       const timer = setInterval(() => {
//         setRecordingTime((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             cameraRef.current?.stopRecording();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } catch (error) {
//       console.error('Start recording error:', error);
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = async () => {
//     if (cameraRef.current) {
//       await cameraRef.current.stopRecording();
//     }
//   };

//   if (!hasPermission) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.permissionText}>Camera permission is required</Text>
//         <TouchableOpacity onPress={requestPermission} style={styles.button}>
//           <Text style={styles.buttonText}>Grant Camera Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!device) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.permissionText}>No camera device found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         video={true}
//         audio={true}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={15}
//       />

//       {/* Face Guide Overlay */}
//       <View style={styles.overlay}>
//         <View
//           style={[
//             styles.faceGuide,
//             {
//               borderColor: faceStatus === 'good' ? '#4CAF50' : '#FF9800',
//             },
//           ]}
//         />

//         {/* Status Message */}
//         <View style={styles.statusContainer}>
//           <Text style={styles.statusText}>{statusMessage}</Text>
//         </View>

//         {/* Recording Timer */}
//         {isRecording && (
//           <View style={styles.timerContainer}>
//             <Text style={styles.timerText}>{recordingTime}s</Text>
//           </View>
//         )}
//       </View>

//       {/* Record Button */}
//       <View style={[styles.controls, { paddingBottom: insets.bottom + 20 }]}>
//         <TouchableOpacity
//           style={[
//             styles.recordButton,
//             isRecording && styles.recordingButton,
//           ]}
//           onPress={isRecording ? stopRecording : startRecording}
//           disabled={!isFaceDetected || faceStatus !== 'good'}
//         >
//           <Icon
//             name={isRecording ? 'stop' : 'videocam'}
//             size={36}
//             color={isRecording ? '#fff' : '#f44336'}
//           />
//         </TouchableOpacity>

//         <Text style={styles.hintText}>
//           {isRecording
//             ? 'Recording... Keep your face still'
//             : 'Tap to record (15 seconds)'}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   faceGuide: {
//     width: OVAL_SIZE,
//     height: OVAL_SIZE,
//     borderRadius: OVAL_SIZE / 2,
//     borderWidth: 3,
//   },
//   statusContainer: {
//     position: 'absolute',
//     top: 80,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   timerContainer: {
//     position: 'absolute',
//     top: 140,
//     backgroundColor: 'rgba(244, 67, 54, 0.9)',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 30,
//   },
//   timerText: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   recordButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: '#f44336',
//   },
//   recordingButton: {
//     backgroundColor: '#f44336',
//     borderColor: '#fff',
//   },
//   hintText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 14,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   permissionText: {
//     color: '#fff',
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   button: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#2196F3',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default FaceVideoRecordingScreen;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function FaceVideoRecordingScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef(null);
  const timerRef = useRef(null);

  // Request camera and microphone permissions
  // useEffect(() => {
  //   async function requestPermissions() {
  //     const cam = await Camera.requestCameraPermission();
  //     const mic = await Camera.requestMicrophonePermission();
  //     if (cam === 'authorized' && mic === 'authorized') {
  //       setHasPermission(true);
  //     } else {
  //       Alert.alert('Permissions not granted');
  //     }
  //   }
  //   requestPermissions();
  // }, []);

  // useEffect(() => {
  //   async function requestPermissions() {
  //     try {
  //       const cameraStatus = await Camera.requestCameraPermission();
  //       const micStatus = await Camera.requestMicrophonePermission();

  //       console.log('Camera Permission:', cameraStatus);
  //       console.log('Microphone Permission:', micStatus);

  //       const isAuthorized = (status) => status === 'authorized' || status === 'granted';

  //       if (isAuthorized(cameraStatus) && isAuthorized(micStatus)) {
  //         setHasPermission(true);
  //       } else {
  //         Alert.alert(
  //           'Permission Required',
  //           'Camera and Microphone permissions are required to record video.\n\nPlease grant them from Settings.',
  //           [
  //             { text: 'Cancel' },
  //             {
  //               text: 'Open Settings',
  //               onPress: () => Linking.openSettings()
  //             }
  //           ]
  //         );
  //       }
  //     } catch (err) {
  //       console.error('Permission request error:', err);
  //       Alert.alert('Error', 'Failed to request permissions');
  //     }
  //   }

  //   requestPermissions();
  // }, []);

  useEffect(() => {
    async function requestPermissions() {
      try {
        const cameraStatus = await Camera.requestCameraPermission();
        const micStatus = await Camera.requestMicrophonePermission();

        console.log('Camera Permission Status:', cameraStatus);
        console.log('Microphone Permission Status:', micStatus);

        // Vision Camera mein 'authorized' ya 'granted' dono possible hain
        const isAuthorized = (status) =>
          status === 'authorized' || status === 'granted';

        if (isAuthorized(cameraStatus) && isAuthorized(micStatus)) {
          setHasPermission(true);
        } else {
          Alert.alert(
            'Permissions Required',
            'Camera and Microphone access is needed to record video.\n\nPlease allow them from Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings()
              },
            ]
          );
        }
      } catch (error) {
        console.error('Permission Error:', error);
        Alert.alert('Error', 'Something went wrong while requesting permissions');
      }
    }

    requestPermissions();
  }, []);

  // Start recording with 15-sec limit and countdown
  const recordVideo = async () => {
    if (!cameraRef.current || recording) return;

    setRecording(true);
    setCountdown(15);

    // Countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start recording
    cameraRef.current.startRecording({
      flash: 'off',
      onRecordingFinished: (video) => {
        console.log('Video saved at:', video.path);
        setRecording(false);
      },
      onRecordingError: (error) => {
        console.error(error);
        setRecording(false);
      },
    });

    // Stop recording after 15 seconds
    setTimeout(() => {
      cameraRef.current.stopRecording();
      clearInterval(timerRef.current);
    }, 15000);
  };

  if (!device || !hasPermission) return null;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />
      {recording && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
      )}
      {!recording && (
        <View style={styles.buttonContainer}>
          <Button title="Record 15 sec" onPress={recordVideo} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  countdownContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 50,
  },
  countdownText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});