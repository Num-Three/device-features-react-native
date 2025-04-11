import AsyncStorage from '@react-native-async-storage/async-storage';

interface TravelEntry {
  id: string;
  uri: string;
  address: string;
  title: string;
}

const STORAGE_KEY = '@travel_entries';

export async function getEntries(): Promise<TravelEntry[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveEntry(entry: TravelEntry) {
  const entries = await getEntries();
  entries.push(entry);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export async function removeEntry(id: string) {
  const entries = await getEntries();
  const filtered = entries.filter((e) => e.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
