import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigation';
import { GlobalProvider } from './src/context/GlobalContext';
import Header from './src/components/Header';

export default function App() {
  return (
    <GlobalProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <Header />

        <AppNavigator />
      </SafeAreaView>
    </GlobalProvider>
  );
}