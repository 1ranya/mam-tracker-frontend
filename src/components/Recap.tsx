// frontend/src/components/Recap.tsx
import React from 'react';
import styled from 'styled-components';
import { TrackingEntry } from '../types/tracking';

const RecapContainer = styled.div`
  padding: 20px;
`;

const RecapTitle = styled.h2`
  margin-bottom: 10px;
`;

const RecapList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecapItem = styled.li`
  display: flex;
  justify-self: center;
  gap: 1rem;
  margin-bottom: 5px;
`;

interface Props {
  recapEntries: TrackingEntry[];
}

const Recap: React.FC<Props> = ({ recapEntries }) => {
  return (
    <RecapContainer>
      <RecapTitle>Today's Recap</RecapTitle>
      <RecapList>
        {recapEntries.map((entry, index) => (
          <RecapItem key={index}>
            <b>{new Date(entry.timestamp).toLocaleTimeString()}</b>
            <span>Bottles: {entry.bottles}</span>
            <span>Diapers: {entry.diapers}</span>
            <span>Pumping: {entry.breastPumping}</span>
          </RecapItem>
        ))}
      </RecapList>
    </RecapContainer>
  );
};

export default Recap;
