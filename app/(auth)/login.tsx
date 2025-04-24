// app/login.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const trimmedCode = code.trim().toUpperCase();

    if (trimmedCode.startsWith('CP')) {
      router.push('/dashboard');
    } else if (trimmedCode.startsWith('P')) {
      router.push('/pilote');
    } else {
      Alert.alert('Erreur', 'Code invalide');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, marginBottom: 20, borderRadius: 5
  }
});
