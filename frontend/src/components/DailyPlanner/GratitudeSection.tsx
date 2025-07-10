import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
`;

const Label = styled.label`
  display: block;
  font-size: 1.3rem;
  color: #6d5a3f;
  margin-bottom: 0.3rem;
  font-weight: 500;
  font-family: 'Crimson Text', serif;
  letter-spacing: 0.5px;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid #d4c5a9;
  background: transparent;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  color: #4a3d2a;
  font-family: 'Crimson Text', serif;
  line-height: 1.4;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-bottom: 3px solid #8b7355;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(139, 115, 85, 0.1);
  }
  
  &::placeholder {
    color: #b8a584;
    font-style: italic;
    font-size: 1.2rem;
  }
`;

const GratitudeSection: React.FC = () => {
  const [gratitude, setGratitude] = useState('');

  return (
    <Section>
      <Label htmlFor="gratitude">I am grateful for</Label>
      <TextInput
        id="gratitude"
        type="text"
        value={gratitude}
        onChange={(e) => setGratitude(e.target.value)}
        placeholder="What brings joy to your heart today?"
      />
    </Section>
  );
};

export default GratitudeSection;