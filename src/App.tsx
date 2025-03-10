// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tracker from './components/Tracker';
import Recap from './components/Recap';
import Statistics from './components/Statistics';
import GlobalStyle from './styles/globalStyles';
import { TrackingEntry } from './types/tracking';
import { getTracking, saveTracking } from './api/TrackingApi';

const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #f2d7d9; /* Rose clair */
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #8b008b; /* Magenta foncé */
`;

function App() {
  const [recapEntries, setRecapEntries] = useState<TrackingEntry[]>([]);
  const [resetValues, setResetValues] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getTracking()
      .then((data) => {
        // Filtrer les données pour ne garder que les entrées d'aujourd'hui
        const today = new Date();
        const todayTrackingData = data.filter((entry: TrackingEntry) => {
          const entryDate = new Date(entry.timestamp);
          return (
            entryDate.getFullYear() === today.getFullYear() &&
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getDate() === today.getDate()
          );
        });
        setRecapEntries(todayTrackingData);
      })
      .catch((error) => {
        console.error('Error fetching tracking data:', error);
      });
  };

  const handleSave = async (bottles: number, diapers: number, breastPumping: number) => {
    try {
      // Wait for the save to complete
      await saveTracking(bottles, diapers, breastPumping);
      // Then fetch updated data
      await fetchData();
      // Reset the form
      setResetValues(true);
      setTimeout(() => {
        setResetValues(false);
      }, 100);
    } catch (error) {
      console.error('Error saving tracking data:', error);
    }
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <Header>
        <Title>MAM' TRACKER</Title>
      </Header>
      <Tracker onSave={handleSave} resetValues={resetValues} />
      <Recap recapEntries={recapEntries} />
      <Statistics recapEntries={recapEntries} />
    </AppContainer>
  );
}

export default App;
