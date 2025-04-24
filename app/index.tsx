import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Utilise setTimeout pour attendre que le layout soit prêt
    const timeout = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 0); // ou 100ms si tu veux être sûr

    return () => clearTimeout(timeout);
  }, []);

  return <View />;
}

