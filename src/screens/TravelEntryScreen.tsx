import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { saveEntry } from '../utils/storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { getGlobalStyles } from '../styles/globalStyles';
import { useGlobalContext } from '../context/GlobalContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Feather } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .max(25, 'Must not be higher than 25 characters')
        .required('Title is required'),
});

interface LocationCoords {
    latitude: number;
    longitude: number;
}

export default function TravelEntryScreen() {
    const [image, setImageUri] = useState<string | null>(null);
    const [location, setLocation] = useState<LocationCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const navigation = useNavigation();
    const { isDarkMode } = useGlobalContext();
    const styles = getGlobalStyles(isDarkMode);

    useEffect(() => {
        requestLocationPermissions();
        registerForPushNotificationsAsync();
        return () => {
            setImageUri(null);
            setAddress(null);
        };
    }, []);

    useEffect(() => {
        if (location) {
            getAddress();
        }
    }, [location]);

    const requestLocationPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied.');
        }
    };

    const getAddress = async () => {
        if (!location) return;

        try {
            const address = await Location.reverseGeocodeAsync({
                latitude: location.latitude,
                longitude: location.longitude,
            });

            setAddress(
                formatAddress(
                    address[0].name ?? '',
                    address[0].city ?? '',
                    address[0].region ?? '',
                    address[0].postalCode ?? ''
                )
            );
        } catch (error) {
            setErrorMsg('Failed to fetch address');
        }
    };

    const handleSave = async (title: string) => {
        if (!image || !address) {
            Alert.alert('Missing Data', 'Please make sure to take a photo and ensure address is retrieved.');
            return;
        }

        await getAddress();
        const entry = { id: uuid.v4(), uri: image, address, title: title };
        await saveEntry(entry);
        await sendNotification('New Travel Entry', 'Travel entry saved!');
        navigation.goBack();
    };

    function formatAddress(
        name: string,
        city: string,
        region: string,
        postalCode: string
    ): string {
        return name + ', ' + city + ', ' + region + ' ' + postalCode;
    }

    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permission is required to take pictures.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const photoUri = result.assets[0].uri;
            setImageUri(photoUri);

            const loc = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            };
            setLocation(coords);
        }
    };

    const sendNotification = async (title: string, body: string) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: 'default',
            },
            trigger: null,
        });
    };

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (!Device.isDevice) {
            alert('Must use a physical device for push notifications');
            return;
        }

        const { granted: existingPermission } = await Notifications.getPermissionsAsync();
        let finalPermission = existingPermission;

        if (!existingPermission) {
            const { granted: newPermission } = await Notifications.requestPermissionsAsync();
            finalPermission = newPermission;
        }

        if (!finalPermission) {
            alert('Failed to get push token for push notifications!');
            return;
        }

        token = await Notifications.getExpoPushTokenAsync();
        console.log('Expo Push Token:', token);
        return token;
    }

    return (
        <View style={[styles.container, styles.entryContainer]}>
            {image && address ? <Image source={{ uri: image }} style={styles.image} /> : <Text style={styles.emptyText}>No Photo Taken</Text>}
            {image && address && (
                <Formik
                    initialValues={{ title: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSave(values.title);
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                            <TextInput
                                placeholder="Enter Photo Title"
                                placeholderTextColor={isDarkMode ? '#ddd' : '#000'}
                                onChangeText={handleChange('title')}
                                value={values.title}
                                style={styles.formInput}
                            />
                            {errors.title && <Text style={styles.error}>{errors.title}</Text>}
                            {address && image ? <Text style={styles.address}>{address}</Text> : <Text style={styles.emptyText}>No Address Given</Text>}

                            <TouchableOpacity style={styles.entryContainer} onPress={() => {
                                if (Object.keys(errors).length > 0) {
                                    Alert.alert('Error', 'Please fill in all the required fields before submitting.');
                                } else {
                                    handleSubmit();
                                }
                            }}>
                                <Feather style={styles.featherButton} size={20} name='save' />
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            )}

            <TouchableOpacity onPress={takePicture}>
                <Feather style={styles.featherButton} size={20} name="camera" />
            </TouchableOpacity>
        </View>
    );
}