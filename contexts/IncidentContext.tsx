import { createContext, useContext, useState } from 'react';

type Incident = {
  id: string;
  libelle: string;
  date: string;
  etat: string;
};

type IncidentContextType = {
  incidents: Incident[];
  updateEtat: (id: string, newEtat: string) => void;
};

const IncidentContext = createContext<IncidentContextType | null>(null);

const defaultIncidents: Incident[] = [
  { id: '1', libelle: 'Collision quai', date: '2025-04-20', etat: 'En attente' },
  { id: '2', libelle: 'Panne moteur', date: '2025-04-21', etat: 'Validé' },
  { id: '3', libelle: 'Remorquage tardif', date: '2025-04-22', etat: 'Rejeté' },
];

export const IncidentProvider = ({ children }: { children: React.ReactNode }) => {
  const [incidents, setIncidents] = useState<Incident[]>(defaultIncidents);

  const updateEtat = (id: string, newEtat: string) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id ? { ...incident, etat: newEtat } : incident
      )
    );
  };

  return (
    <IncidentContext.Provider value={{ incidents, updateEtat }}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidentContext = () => {
  const context = useContext(IncidentContext);
  if (!context) throw new Error('useIncidentContext must be used inside IncidentProvider');
  return context;
};
