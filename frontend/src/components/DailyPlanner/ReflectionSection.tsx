import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-top: 0;
  padding-top: 0;
  border-top: none;
`;

const ReflectionItem = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.3rem;
  color: #6d5a3f;
  margin-bottom: 0.1rem;
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

const ReflectionSection: React.FC = () => {
  const [highlight, setHighlight] = useState('');
  const [learned, setLearned] = useState('');
  const [remember, setRemember] = useState('');

  return (
    <Section>
      <ReflectionItem>
        <Label htmlFor="highlight">Highlight of the Day</Label>
        <TextInput
          id="highlight"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          placeholder="What made today special?"
        />
      </ReflectionItem>

      <ReflectionItem>
        <Label htmlFor="learned">What did I learn today?</Label>
        <TextInput
          id="learned"
          value={learned}
          onChange={(e) => setLearned(e.target.value)}
          placeholder="New insights or knowledge gained"
        />
      </ReflectionItem>

      <ReflectionItem>
        <Label htmlFor="remember">What do I want to remember from today?</Label>
        <TextInput
          id="remember"
          value={remember}
          onChange={(e) => setRemember(e.target.value)}
          placeholder="Key moments or lessons to carry forward"
        />
      </ReflectionItem>
    </Section>
  );
};

export default ReflectionSection;