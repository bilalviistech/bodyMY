import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileScreen from '../screens/home/ProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FaceVideoRecordingScreen from '../screens/home/FaceVideoRecordingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import Trends from '../screens/home/Trends';
import WellnessScoreResult from '../screens/home/WellnessScoreResult'
import ProfileStack from '../navigation/ProfileStack'
import InsightStack from '../navigation/InsightStack'

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
            <View style={styles.tabBar}>
                {/* Today */}
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
                    <View style={[styles.iconBorder, { backgroundColor: state.index === 0 ? '#3D6B4F' : 'transparent' }]}>
                        <Ionicons name="calendar-outline" size={24} color={state.index === 0 ? '#fff' : '#8A7E6A'} />
                    </View>
                    <Text style={[styles.tabLabel, { color: state.index === 0 ? "#3D6B4F" : "#8A7E6A" }]}>Today</Text>
                </TouchableOpacity>

                {/* Trends */}
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Trends')}>
                    <View style={[styles.iconBorder, { backgroundColor: state.index === 1 ? '#3D6B4F' : 'transparent' }]}>
                        <FontAwesome name="bar-chart" size={24} color={state.index === 1 ? '#fff' : '#8A7E6A'} />
                    </View>
                    <Text style={[styles.tabLabel, { color: state.index === 1 ? "#3D6B4F" : "#8A7E6A" }]}>Trends</Text>
                </TouchableOpacity>

                {/* Records - Big Center Button */}
                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('FaceRecordingScreen')}
                    activeOpacity={0.85}
                >
                    <View style={styles.iconRecBorder}>
                        <Entypo name="circle" size={28} color="#fff" />
                    </View>
                    <Text style={[styles.tabLabel, { paddingBottom: 4 }]}>Records</Text>
                </TouchableOpacity>

                {/* Insights */}
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Insight')}>
                    <View style={[styles.iconBorder, { backgroundColor: state.index === 3 ? '#3D6B4F' : 'transparent' }]}>
                        <Feather name="bar-chart" size={24} color={state.index === 3 ? '#fff' : '#8A7E6A'} />
                    </View>
                    <Text style={[styles.tabLabel, { color: state.index === 3 ? "#3D6B4F" : "#8A7E6A" }]}>Insights</Text>
                </TouchableOpacity>

                {/* Me */}
                {/* <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}> */}
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile', { screen: 'ProfileScreen' })}>
                    <View style={[styles.iconBorder, { backgroundColor: state.index === 4 ? '#3D6B4F' : 'transparent' }]}>
                        <Feather name="user" size={24} color={state.index === 4 ? '#fff' : '#8A7E6A'} />
                    </View>
                    <Text style={[styles.tabLabel, { color: state.index === 4 ? "#3D6B4F" : "#8A7E6A" }]}>Me</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Trends" component={Trends} />
            <Tab.Screen name="FaceRecordingScreen" component={FaceVideoRecordingScreen} />
            {/* <Tab.Screen name="Insight" component={WellnessScoreResult} /> */}
            <Tab.Screen name="Insight" component={InsightStack} />
            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
            <Tab.Screen name="Profile" component={ProfileStack} />
            {/* navigation.navigate('Insight', { screen: 'InsightToday' }); */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    dummyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        marginBottom: 30,
    },
    dummyCard: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F7F3EE',
        height: 90,
        borderTopWidth: 0.5,
        borderTopColor: '#54545865',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 10,
        paddingTop: 6,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
    },
    iconBorder: {
        borderWidth: 0.5,
        borderColor: '#8A7E6A',
        padding: 10,
        borderRadius: 8,
    },
    iconRecBorder: {
        backgroundColor: '#B85C38',
        padding: 17,
        borderRadius: 90,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
        color: "#8A7E6A"
    },
});