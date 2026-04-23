import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ScreenWrapperForDashboard from '../../components/common/ScreenWrapperForDashboard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

const DataSources = () => {
        const navigation = useNavigation();
    return (
        <ScreenWrapperForDashboard>
            <TouchableOpacity
                style={styles.container1}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
                <View style={styles.iconWrapper}>
                    <Icon name="chevron-left" size={25} color="#727272" />
                </View>
                <Text style={styles.text}>Me</Text>
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.header}>
                <Text style={styles.title}>data <Text style={styles.subtitle}>sources.</Text></Text>

                <Text style={{ marginVertical: 15, color: "#727272" }}>
                    Manage connected apps & integrations
                </Text>
            </View>

            {/* Account Card */}
            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>CONNECTED</Text>
                <View style={styles.accountCard}>
                    <TouchableOpacity style={styles.accountItem}>
                        <Octicons name="dot-fill" size={17} color="#3D6B4F" />
                        <View style={styles.accountItemLeft}>
                            <Text style={styles.accountItemTitle}>Apple Health</Text>
                            <Text style={styles.accountItemSubtitle}>Steps, HR, sleep · syncing</Text>
                        </View>
                        <Text style={styles.chevron}>Active</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem}>
                        <Octicons name="dot-fill" size={17} color="#3D6B4F" />
                        <View style={styles.accountItemLeft}>
                            <Text style={styles.accountItemTitle}>MyFitnessPal</Text>
                            <Text style={styles.accountItemSubtitle}>Nutrition data · syncing</Text>
                        </View>
                        <Text style={styles.chevron}>Active</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>CONNECTED</Text>
                <View style={styles.accountCard}>
                    <TouchableOpacity style={styles.accountItem}>
                        <Octicons name="dot-fill" size={17} color="#DDD5C6" />
                        <View style={styles.accountItemLeft}>
                            <Text style={[styles.accountItemTitle, { color: "#8A7E6A" }]}>Whoop</Text>
                            <Text style={[styles.accountItemSubtitle, { fontSize: 12, paddingVertical: 4 }]}>Recovery & HRV</Text>
                        </View>
                        <Text style={styles.chevron}>Connect</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem}>
                        <Octicons name="dot-fill" size={17} color="#DDD5C6" />
                        <View style={styles.accountItemLeft}>
                            <Text style={[styles.accountItemTitle, { color: "#8A7E6A" }]}>Garmin</Text>
                            <Text style={[styles.accountItemSubtitle, { fontSize: 12, paddingVertical: 4 }]}>Activity & GPS</Text>
                        </View>
                        <Text style={styles.chevron}>Connect</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem}>
                        <Octicons name="dot-fill" size={17} color="#DDD5C6" />
                        <View style={styles.accountItemLeft}>
                            <Text style={[styles.accountItemTitle, { color: "#8A7E6A" }]}>Strava</Text>
                            <Text style={[styles.accountItemSubtitle, { fontSize: 12, paddingVertical: 4 }]}>Exercise sessions</Text>
                        </View>
                        <Text style={[styles.chevron, { backgroundColor: "#EDD5C5", color: "#B85C38" }]}>Coming soon</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.title1}>
                    More integrations coming
                </Text>

                <Text style={styles.subtitle1}>
                    Strava, Cronometer, Garmin and more in Q3 2025. Connected apps make your wellness score much more accurate.
                </Text>
            </View>
        </ScreenWrapperForDashboard>
    )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 10,
        marginHorizontal: 7,
    },
    title: {
        fontSize: 35,
        color: '#151515',
        fontFamily: 'PlayfairDisplay-Bold',
    },
    subtitle: {
        fontSize: 35,
        color: '#3D6B4F',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: 40
    },
    container1: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderColor: "#727272",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#727272",
    },
    accountSection: {
        marginBottom: 22,
    },
    sectionLabel: {
        fontSize: 14,
        color: '#727272',
        backgroundColor: "#DDD5C6",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    accountCard: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        overflow: 'hidden',
    },
    accountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 2,
    },
    accountItemLeft: {
        flex: 1,
        marginLeft: 10
    },
    accountItemTitle: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '400',
    },
    accountItemSubtitle: {
        fontSize: 13,
        color: '#727272',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#C4B89A',
    },
    chevron: {
        fontSize: 13,
        color: '#3D6B4F',
        backgroundColor: "#C8E0D0",
        paddingHorizontal: 16,
        paddingVertical: 2,
        borderRadius: 30
    },
    card: {
        width: '100%',
        backgroundColor: '#C8E0D0',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderColor: '#3D6B4F',
        position: 'relative',
        borderLeftColor: "#3D6B4F",
        borderLeftWidth: 4
    },
    title1: {
        fontSize: 15,
        fontWeight: '600',
        color: '#3D6B4F',
        marginBottom: 4,
    },
    subtitle1: {
        fontSize: 13,
        color: '#727272',
        lineHeight: 20,
    },
});

export default DataSources