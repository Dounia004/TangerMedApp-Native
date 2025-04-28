import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function DashboardChef() {
  const [incidents, setIncidents] = useState([
    { id: '1', libelle: 'Collision quai', date: '2025-04-20', etat: 'En attente' },
    { id: '2', libelle: 'Panne moteur', date: '2025-04-21', etat: 'Validé' },
    { id: '3', libelle: 'Remorquage urgent', date: '2025-04-22', etat: 'Rejeté' },
  ]);

  const handleValider = (id: string) => {
    const updated = incidents.map((i) => (i.id === id ? { ...i, etat: 'Validé' } : i));
    setIncidents(updated);
  };

  const handleRejeter = (id: string) => {
    const updated = incidents.map((i) => (i.id === id ? { ...i, etat: 'Rejeté' } : i));
    setIncidents(updated);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.logo}>NaviPort</Text>

        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <Ionicons name="grid-outline" size={22} color="white" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="alert-circle-outline" size={22} color="white" />
          <Text style={styles.navText}>Incidents</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart-outline" size={22} color="white" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={22} color="white" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Main Area */}
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        
        {/* Header with Search */}
        <View style={styles.header}>
          <TextInput
            placeholder="Search incident..."
            style={styles.searchInput}
          />
          <Ionicons name="notifications-outline" size={24} color="#374151" />
        </View>

        {/* Dashboard Cards */}
        <ScrollView style={{ padding: 10 }}>
          <View style={styles.dashboardCardsContainer}>
            <View style={[styles.dashboardCard, { backgroundColor: '#1e3a8a' }]}>
              <Text style={styles.dashboardCardTitleOne}>Total Incidents</Text>
              <Text style={styles.dashboardCardTotalNumber}>{incidents.length}</Text>
            </View>

            <View style={styles.dashboardCard}>
              <Text style={styles.dashboardCardTitle}>Pending</Text>
              <Text style={styles.dashboardCardNumber}>
                {incidents.filter((i) => i.etat === 'En attente').length}
              </Text>
            </View>

            <View style={styles.dashboardCard}>
              <Text style={styles.dashboardCardTitle}>Approved</Text>
              <Text style={styles.dashboardCardNumber}>
                {incidents.filter((i) => i.etat === 'Validé').length}
              </Text>
            </View>

            <View style={styles.dashboardCard}>
              <Text style={styles.dashboardCardTitle}>Rejected</Text>
              <Text style={styles.dashboardCardNumber}>
                {incidents.filter((i) => i.etat === 'Rejeté').length}
              </Text>
            </View>
          </View>

          {/* Incidents Table */}
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell]}>Libellé</Text>
            <Text style={[styles.cell, styles.headerCell]}>Date</Text>
            <Text style={[styles.cell, styles.headerCell]}>État</Text>
            <Text style={[styles.cell, styles.headerCell]}>Actions</Text>
          </View>

          {incidents.map((incident) => (
            <View key={incident.id} style={styles.tableRow}>
              <Text style={styles.cell}>{incident.libelle}</Text>
              <Text style={styles.cell}>{incident.date}</Text>
              <View style={styles.cell}>
                <View style={getEtatStyle(incident.etat)}>
                  <Text style={styles.etatText}>{incident.etat}</Text>
                </View>
              </View>
              <View style={[styles.cell, styles.actions]}>
                <TouchableOpacity
                  onPress={() => handleValider(incident.id)}
                  style={[styles.actionButton, { backgroundColor: '#4ade80' }]}
                >
                  <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRejeter(incident.id)}
                  style={[styles.actionButton, { backgroundColor: '#f87171' }]}
                >
                  <Text style={styles.buttonText}>Rejeter</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        </ScrollView>
      </View>
    </View>
  );
}

// Helpers
const getEtatStyle = (etat: string) => {
  switch (etat) {
    case 'Validé':
      return { backgroundColor: '#86efac', padding: 5, borderRadius: 6 };
    case 'Rejeté':
      return { backgroundColor: '#fca5a5', padding: 5, borderRadius: 6 };
    default:
      return { backgroundColor: '#fde68a', padding: 5, borderRadius: 6 };
  }
};

// Styles
const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: '#047857',
    paddingTop: 30,
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 40,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    width: '100%',
  },
  activeNav: {
    backgroundColor: '#065f46',
    borderRadius: 8,
  },
  navText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '80%',
    fontSize: 14,
  },
  dashboardCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dashboardCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  dashboardCardTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 6,
  },
  dashboardCardTitleOne: {
    fontSize: 16,
    color: 'white',
    marginBottom: 6,
  },
  dashboardCardNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  dashboardCardTotalNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    paddingVertical: 10,
    marginTop: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  etatText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#111827',
  },
});
