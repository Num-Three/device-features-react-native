import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

let permissionsRequested = false;
export const registerForPushNotificationsAsync = async () => {
    if (permissionsRequested) return;
    permissionsRequested = true;

    if (!Device.isDevice) {
        alert('Must use physical device for push notifications');
        return;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { granted: existingPermission, status } = await Notifications.getPermissionsAsync();
    let finalPermission = existingPermission;

    if (!existingPermission || status !== 'granted') {
        const { granted } = await Notifications.requestPermissionsAsync();
        finalPermission = granted;
    }

    if (!finalPermission) {
        alert('Failed to get push token for push notifications!');
        return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log('Expo Push Token:', tokenData.data);

    return tokenData.data;
};

export const sendNotification = async (title: string, body: string) => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (!granted) {
        alert('Please grant notification permissions');
        return;
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: 'default',
            },
            trigger: null, // Fires immediately
        });
        console.log('Notification scheduled');
    } catch (err) {
        console.error('Error scheduling notification:', err);
    }
};