import { useState } from 'react';
import Logo from '../assets/images/logo.png'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function LoginScreen() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (trimmedCode.startsWith('CP')) {
        router.push('../dashboard');
      } else if (trimmedCode.startsWith('P')) {
        router.push('../pilote/pilote');
      } else {
        Alert.alert('Erreur', 'Code invalide');
      }
    }, 1500);
  };

  return (
    <LinearGradient
      colors={['#b993f8', '#8ca6db']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* WRAP EVERYTHING INSIDE FADE-IN */}
          <Animatable.View animation="fadeIn" duration={1000} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Header */}
            <Animatable.View
              animation="fadeInDown"
              duration={1200}
              style={{ alignItems: 'center', marginBottom: 24 }}
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png' }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
                     <Text style={styles.appTitle}>Bienvenue sur NaviPort 👋</Text>
                      </Animatable.View>

            {/* Card */}
            <Animatable.View
              animation="fadeInUp"
              delay={300}
              style={styles.card}
            >
              <Text style={styles.loginTitle}>Connexion</Text>

              <TextInput
                placeholder="Code (ex: P1, CP2)"
                style={styles.input}
                value={code}
                onChangeText={setCode}
                autoCapitalize="characters"
              />
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              <Animatable.View animation={loading ? undefined : 'pulse'} iterationCount="infinite" direction="alternate">
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  style={[styles.loginButton, loading && { backgroundColor: '#93c5fd' }]}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Se connecter</Text>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    minHeight: '100vh',
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  appTitle: {
    marginTop: 12,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    minHeight: 320,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#111827',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

