import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { getGlobalStyles } from '../styles/globalStyles';
import { getEntries, removeEntry } from '../utils/storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Moon icon

interface TravelEntry {
    id: string;
    uri: string;
    address: string;
    title: string;
}

export default function HomeScreen() {
    const { isDarkMode } = useGlobalContext();
    const styles = getGlobalStyles(isDarkMode);
    const [entries, setEntries] = useState<TravelEntry[]>([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused) {
            loadEntries();
        }
    }, [isFocused]);

    const loadEntries = async () => {
        const data = await getEntries();
        setEntries(data);
    };

    const handleRemove = async (id: string) => {
        await removeEntry(id);
        loadEntries();
    };

    const renderItem = ({ item }: { item: TravelEntry }) => (
        <View style={styles.entry}>
            <View style={styles.titleRow}>
                <Feather style={[styles.feather, styles.featherTitle]} name="aperture" size={24} />
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                    onPress={() => handleRemove(item.id)}>

                    <Feather style={styles.titleSide} name="minus" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.address}>
                <Feather style={styles.feather} name="map-pin" />
                {item.address}
            </Text>
        </View>

    );

    return (
        <View style={styles.container}>
            {entries.length === 0 ? (<Text style={styles.emptyText}>Your travel diary is empty! Start taking pictures with the button below to add to your diary!</Text>) : (
                <FlatList
                    data={entries}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
            <TouchableOpacity style={styles.bottomContainer} onPress={() => navigation.navigate('Travel Entry' as never)}>
                <Feather style={styles.addButton} name='plus'></Feather>
            </TouchableOpacity>
        </View>
    );
};