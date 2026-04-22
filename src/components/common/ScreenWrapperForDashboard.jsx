import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';

const ScreenWrapperForDashboard = ({ children }) => {
    const insets = useSafeAreaInsets();
    const tabBarHeight = useBottomTabBarHeight();

    return (
        <ScrollView
            style={styles.screenWrapper}
            contentContainerStyle={[
                styles.contentContainerStyle,
                {
                    paddingTop: insets.top + 20,           // thoda extra spacing top pe
                    paddingBottom: tabBarHeight + insets.bottom + 30, // tab bar + safe + breathing space
                    paddingHorizontal: 20,
                },
            ]}
            showsVerticalScrollIndicator={false}
            bounces={true} // iOS pe nice bounce effect
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: '#EEE8DF',
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
})

export default ScreenWrapperForDashboard