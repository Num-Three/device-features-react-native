import { StyleSheet } from 'react-native';

export const getGlobalStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    },
    entryContainer: {
        alignItems: 'center',     // horizontal center
    },
    header: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? '#003049' : '#780000',
    },
    text: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-end', // vertically align to bottom
      justifyContent: 'space-between', // push title and titleSide apart
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#e63946' : '#780000',
      flex: 1, // take up available space
    },
    titleSide: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#e63946' : '#780000',
      textAlign: 'right',
      flexShrink: 0, // don't let it get pushed
    },
    feather: {
      color: isDarkMode ? '#ffffff' : '#000000',
      marginRight: 8,
    },
    featherButton: {
      color: '#fff',
      backgroundColor: isDarkMode ? '#e63946' : '#780000',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 30,
      width: 40,
      height: 40,
      marginTop: 10,
    },
    featherTitle: {
      color: isDarkMode ? '#e63946' : '#780000',
    },
    image: {
      width: '100%',
      aspectRatio: '1',
      borderRadius: 10,
    },
    address: {
      color: '#bbb',
      fontWeight: 'bold',
      fontSize: 18,
      margin: 10,
      textAlign: 'center',
    },
    entry: {
      marginBottom: 15,
    },
    bottomContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      fontSize: 20,
      color: '#fff',
      backgroundColor: isDarkMode ? '#003049' : '#780000',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 20,
      width: 40,
      height: 40,
    },
    divider: {
      height: 1,
      backgroundColor: isDarkMode ? '#444' : '#ccc',
      marginBottom: 10,
    },
    emptyText: {
      fontSize: 20,
      textAlign: 'center',
      padding: 5,
      color: '#bbb'
    },
    formLabel: {
      fontSize: 20,
      padding: 5,
    },
    error: {
      fontSize: 14,
      padding: 5,
      color: 'red',
    },
    formInput: {
      padding: 5,
      fontSize: 18,
      backgroundColor: "transparent",
      color: isDarkMode ? '#fff' : '#000',
      borderColor: isDarkMode ? '#606060' : '#ccc',  // Border color
      borderWidth: 2,       // Set border width
      borderRadius: 10,     // Border radius for rounded corners
      textAlign: 'center',
    }
  });