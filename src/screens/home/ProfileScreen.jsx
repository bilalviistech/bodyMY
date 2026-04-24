import React, { useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const insets = useSafeAreaInsets();
    const tabBarHeight = useBottomTabBarHeight();
    const { logout } = useContext(AuthContext);
    const navigation = useNavigation()

    const [dailyReminder, setDailyReminder] = React.useState(true);
    const [highAlerts, setHighAlerts] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const logOutHandler = () => {
        setIsLoading(true);
        setTimeout(async () => {
            logout();
            setIsLoading(false);
            Toast.show({
                type: 'custom_success',
                text1: 'Logout Successfull',
                text2: 'Thank You!',
                visibilityTime: 2000,
                position: 'top',
            });
        }, 2000);
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[
                styles.content,
                {
                    paddingTop: insets.top + 20,
                    paddingBottom: tabBarHeight + insets.bottom + 40,
                },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <Text style={styles.title}>
                me.
            </Text>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>PM</Text>
                    </View>
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Patrick{"\n"}Martin</Text>
                    <Text style={styles.email}>patrick@thisisme.co</Text>

                    <View style={styles.badges}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Day 14</Text>
                        </View>
                        <View style={[styles.badge, styles.secondBadge]}>
                            <Text style={styles.secondBadgeText}>8161.co</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>5'11"</Text>
                    <Text style={styles.statLabel}>Height</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>185</Text>
                    <Text style={styles.statLabel}>lbs</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>60s</Text>
                    <Text style={styles.statLabel}>Deep</Text>
                </View>
            </View>

            {/* Account Card */}
            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>ACCOUNT</Text>
                <View style={styles.accountCard}>
                    <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                        <View style={styles.accountItemLeft}>
                            <Text style={styles.accountItemTitle}>Edit Profile</Text>
                            <Text style={styles.accountItemSubtitle}>Name, height, weight, zip</Text>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                        <Text style={styles.accountItemTitle}>Change password</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                        <Text style={styles.accountItemTitle}>Integrations</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                        <View style={styles.accountItemLeft}>
                            <Text style={styles.accountItemTitle}>Email address</Text>
                            <Text style={styles.accountItemSubtitle}>patrick@thisisme.co</Text>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Notification Card */}
            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>Notification</Text>
                <View style={styles.accountCard}>
                    <TouchableOpacity style={styles.notifyItem} onPress={() => navigation.navigate('DataSources')}>
                        <View style={styles.accountItemLeft}>
                            <Text style={styles.accountItemTitle}>Daily check-in reminder</Text>
                            <Text style={styles.accountItemSubtitle}>9:00 AM daily</Text>
                        </View>
                        {/* <Text style={styles.chevron}>›</Text> */}
                        <Switch
                            value={dailyReminder}
                            onValueChange={setDailyReminder}
                            trackColor={{ false: '#ddd', true: '#3D6B4F' }}
                            thumbColor="#fff"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('DataSources')}>
                        <View style={[styles.accountItemLeft, { paddingVertical: 10 }]}>
                            <Text style={styles.accountItemTitle}>high alerts</Text>
                            <Text style={styles.accountItemSubtitle}>patrick@thisisme.co</Text>
                        </View>
                        <Switch
                            value={highAlerts}
                            onValueChange={setHighAlerts}
                            trackColor={{ false: '#ddd', true: '#3D6B4F' }}
                            thumbColor="#fff"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />
                </View>
            </View>

            <TouchableOpacity onPress={logOutHandler} disabled={isLoading}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10  }}>
                <Text style={{ color: "#B85C38", textAlign: "center", fontSize: 17, fontWeight: '600' }}>Sign out</Text>
                {isLoading && (
                    <ActivityIndicator
                        color="#B85C38"
                        size="small"
                        style={{ marginLeft: 10 }}
                    />
                )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ color: "#8A7E6A", textAlign: "center", fontSize: 17, fontWeight: '600', marginBottom: 5 }}>Delete account</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    title: {
        marginVertical: 15,
        marginHorizontal: 5,
        color: "#3D6B4F",
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: 35,
    },
    container: {
        flex: 1,
        backgroundColor: '#EEE8DF',
    },
    content: {
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#2C2C2C',
        marginBottom: 24,
    },
    profileCard: {
        backgroundColor: '#1C1C1C',
        borderRadius: 5,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    avatarContainer: {
        marginRight: 30,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#4A7043',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        fontFamily: 'PlayfairDisplay-Bold',
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    email: {
        color: '#F7F3EE',
        fontSize: 13,
        marginBottom: 12,
    },
    badges: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        backgroundColor: '#3D6B4F4D',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 30,
    },
    secondBadge: {
        backgroundColor: '#8A85757D',
    },
    badgeText: {
        color: '#639878',
        fontSize: 13,
        fontWeight: '500',
    },
    secondBadgeText: {
        color: '#8A8575',
        fontSize: 13,
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 32,
        gap: 5
    },
    statBox: {
        backgroundColor: '#F7F3EE',
        borderColor: "#C4B89A",
        width: (width - 60) / 4,
        paddingVertical: 16,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    statValue: {
        fontSize: 23,
        color: '#333',
        fontFamily: 'PlayfairDisplay-Bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#000000',
        marginTop: 4,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
        paddingLeft: 4,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 12,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
    },
    listSubtitle: {
        fontSize: 13,
        color: '#777',
        marginTop: 3,
    },
    chevron: {
        fontSize: 24,
        color: '#ccc',
        fontWeight: '300',
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
    notifyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    accountItemLeft: {
        flex: 1,
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
        fontSize: 35,
        color: '#DDD5C6',
        marginLeft: 8,
    },
});