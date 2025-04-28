import { Stack } from 'expo-router';
import { IncidentProvider } from '../contexts/IncidentContext';

export default function Layout() {
  return (
    <IncidentProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </IncidentProvider>
  );
}

