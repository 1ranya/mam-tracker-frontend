// frontend/src/components/Tracker.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TrackerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TrackingSection = styled.div`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  width: 70px;
  height: 25px;
  text-align: center;
  border: 1px solid #cecece;
  border-radius: 10px;
`;

const SaveButton = styled.button`
  background-color: #90EE90;
  color: white;
  padding: 9px 84px 10px 84px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 800;

  &:hover {
    background-color: #3CB371; /* Vert plus foncé */
  }
`;

interface Props {
  onSave: (bottles: number, diapers: number, breastPumping: number) => void;
  resetValues: boolean;
}

const Tracker: React.FC<Props> = ({ onSave, resetValues }) => {
  const [bottles, setBottles] = useState(0);
  const [diapers, setDiapers] = useState(0);
  const [breastPumping, setBreastPumping] = useState(0);

  useEffect(() => {
    if (resetValues) {
      setBottles(0);
      setDiapers(0);
      setBreastPumping(0);
    }
  }, [resetValues]);

  const handleSave = () => {
    onSave(bottles, diapers, breastPumping);
  };

  return (
    <TrackerContainer>
      <TrackingSection>
        <h2>Start Your Tracking</h2>
        <InputGroup>
          <Label htmlFor="bottles">Bottles:</Label>
          <Input
            type="number"
            id="bottles"
            value={bottles}
            onChange={(e) => setBottles(Number(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="diapers">Diapers:</Label>
          <Input
            type="number"
            id="diapers"
            value={diapers}
            onChange={(e) => setDiapers(Number(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="breastPumping">Breast Pumping:</Label>
          <Input
            type="number"
            id="breastPumping"
            value={breastPumping}
            onChange={(e) => setBreastPumping(Number(e.target.value))}
          />
        </InputGroup>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </TrackingSection>
    </TrackerContainer>
  );
};

export default Tracker;
