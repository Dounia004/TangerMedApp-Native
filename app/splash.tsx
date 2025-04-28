import { useEffect, useRef } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import Logo from '../assets/images/logo.png'; // Your NaviPort logo

export default function SplashScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const splashRef = useRef(null); // Ref to animate Fade Out

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Wait for router ready

    const timeout = setTimeout(async () => {
      // 1. Animate Fade Out
      if (splashRef.current) {
        await splashRef.current.fadeOut(800); // 800ms Fade Out
      }

      // 2. After fade animation, navigate to login
      router.replace('/(auth)/login');
    }, 2000); // 2 seconds showing splash

    return () => clearTimeout(timeout);
  }, [rootNavigationState]);

  return (
    <Animatable.View
      ref={splashRef}
      animation="fadeIn"
      duration={1000}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bienvenue sur NaviPort 🚢</Text>
      </View>
      <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 30 }} />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8ca6db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
