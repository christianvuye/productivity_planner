import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: #8b7355;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

const NotesArea = styled.textarea`
  flex: 1;
  border: 1px solid #e8dcc0;
  border-radius: 8px;
  padding: 1rem;
  background: rgba(254, 252, 247, 0.8);
  font-size: 0.95rem;
  color: #5d4e37;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #d4c5a9;
    box-shadow: 0 0 0 2px rgba(212, 197, 169, 0.2);
  }
  
  &::placeholder {
    color: #c9b896;
    font-style: italic;
  }
`;

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState('');

  return (
    <Section>
      <Title>Notes</Title>
      <NotesArea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Capture your thoughts, ideas, and observations..."
      />
    </Section>
  );
};

export default NotesSection;