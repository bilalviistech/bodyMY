import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const WellnessScoreGauge = ({
    score = 78,
    total = 100,
    trend = 'up',
    trendText = '5 pts this week',
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const scale = screenWidth / 375;
    const rs = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

    const SIZE = rs(240);
    const CX = SIZE / 2;
    const CY = SIZE / 2;

    // Outer ring — full light mint circle (no gap)
    const R_OUTER = rs(80);
    const STROKE_OUTER = rs(7);

    // Inner ring — thicker, has gap at top-right, shows progress
    const R_INNER = rs(77);
    const STROKE_INNER = rs(7);

    // Inner ring arc — gap ~40 degrees at top-right
    const GAP_DEG = 40;
    const TOTAL_DEG = 360 - GAP_DEG;

    const toRad = (deg) => (deg * Math.PI) / 180;

    const innerCirc = 2 * Math.PI * R_INNER;
    const arcLen = (TOTAL_DEG / 360) * innerCirc;

    // Progress arc
    const progressArc = (score / total) * arcLen;

    // Rotation: gap at top-right means we start from ~top-right going clockwise
    // So rotate = 90 + GAP/2 puts the gap at top
    const ROTATE = 270;

    return (
        <View style={st(rs).wrapper}>
            <View style={{ width: SIZE, height: SIZE, position: "relative" }}>
                <View >
                    <Svg width={SIZE} height={SIZE}>
                        {/* Outer ring — full light beige/mint circle */}
                        <Circle
                            cx={CX}
                            cy={CY}
                            r={R_OUTER}
                            stroke="#C8DDD8"
                            strokeWidth={STROKE_OUTER}
                            fill="none"
                            strokeOpacity={0.6}
                        />
                    </Svg>
                </View>

                <View style={{ position: "absolute", top: 19, left: 10, zIndex: 99 }}>
                    <Svg width={SIZE} height={SIZE}>
                        <Circle
                            cx={CX}
                            cy={CY}
                            r={R_INNER}
                            stroke="#3D6B4F"
                            strokeWidth={STROKE_INNER}
                            fill="none"
                            strokeDasharray={`${progressArc} ${innerCirc}`}
                            strokeLinecap="round"
                            rotation={ROTATE}
                            origin={`${CX}, ${CY}`}
                        />
                    </Svg>
                </View>

                <View style={{ position: "absolute", top: 19, left: 10 }}>
                    <Svg width={SIZE} height={SIZE}>
                        <Circle
                            cx={CX}
                            cy={CY}
                            r={R_INNER}
                            stroke="#DDD5C6"
                            strokeWidth={STROKE_INNER}
                            fill="none"
                        />
                    </Svg>
                </View>

                {/* Score in center */}
                <View style={[st(rs).centerOverlay, { width: SIZE, height: SIZE }]}>
                    <Text style={st(rs).scoreText}>{score}</Text>
                </View>
            </View>

            {/* Label */}
            <Text style={st(rs).label}>WELLNESS SCORE</Text>

            {/* Trend pill */}
            <View style={st(rs).pill}>
                <Text style={st(rs).pillArrow}>{trend === 'up' ? '↑' : '↓'}</Text>
                <Text style={st(rs).pillText}>{trendText}</Text>
            </View>
        </View>
    );
};

export default WellnessScoreGauge;

const st = (rs) => StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },
    centerOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: rs(52),
        color: '#1C1A17',
        fontFamily: 'PlayfairDisplay-Bold',
    },
    label: {
        fontSize: rs(16),
        color: '#727272',
        marginBottom: rs(7),
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: rs(6),
        backgroundColor: '#C8E0D0',
        paddingHorizontal: rs(20),
        paddingVertical: rs(3),
        borderRadius: rs(50),
    },
    pillArrow: {
        color: '#3D6B4F',
        fontSize: rs(13),
        fontWeight: '700',
    },
    pillText: {
        color: '#3D6B4F',
        fontSize: rs(13),
        fontWeight: '500',
    },
});
