import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="(auth)/login">
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pilote" options={{ title: "Pilote" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Stack>
  );
}

