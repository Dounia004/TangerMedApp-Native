// app/dashboard/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useIncidentContext } from '../../contexts/IncidentContext';


export default function IncidentDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [etat, setEtat] = useState('En attente');
  const { updateEtat } = useIncidentContext();

  const handleValidation = () => {
    updateEtat(id as string, 'Validé');
    Alert.alert('Validé', 'Incident validé.');
  };
  
  const handleRejet = () => {
    updateEtat(id as string, 'Rejeté');
    Alert.alert('Rejeté', 'Incident rejeté.');
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détail Incident #{id}</Text>
      <Text style={styles.info}>📝 Libellé : Exemple de libellé</Text>
      <Text style={styles.info}>🧾 Description : Exemple de description longue de l'incident.</Text>
      <Text style={styles.info}>📌 Type : Accident</Text>
      <Text style={styles.info}>🚢 Nature : Pilotage</Text>
      <Text style={styles.etat}>📍 État : {etat}</Text>

      <View style={styles.buttons}>
        <Button title="✅ Valider" onPress={handleValidation} />
        <Button title="❌ Rejeter" onPress={handleRejet} color="red" />
        <Button title="↩️ Retour" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  info: { fontSize: 16, marginBottom: 8 },
  etat: { fontSize: 18, fontWeight: '600', marginVertical: 12 },
  buttons: { gap: 12 }
});
