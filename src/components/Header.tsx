import { useGlobalContext } from "../context/GlobalContext";
import { getGlobalStyles } from '../styles/globalStyles';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

const FloatingDarkModeButton = () => {
    const { isDarkMode, toggleDarkMode } = useGlobalContext();

    return (
        <TouchableOpacity
            style={[fabStyle.fab, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
            onPress={toggleDarkMode}
        >
            <Feather name="moon" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
    );
};

const fabStyle = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 90,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 999,
    },
});

export default FloatingDarkModeButton;