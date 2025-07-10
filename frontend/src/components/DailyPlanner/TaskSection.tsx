import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #6d5a3f;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: 'Playfair Display', serif;
  
  &.star::before {
    content: '★ ';
    color: #d4af37;
    font-size: 1.2rem;
  }
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const TaskNumber = styled.span`
  font-weight: bold;
  color: #6d5a3f;
  font-size: 1.2rem;
  min-width: 1.5rem;
  font-family: 'Playfair Display', serif;
`;

const TaskInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 2px solid #d4c5a9;
  background: transparent;
  padding: 0.75rem 0;
  font-size: 1.2rem;
  color: #4a3d2a;
  font-family: 'Crimson Text', serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-bottom: 3px solid #8b7355;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(139, 115, 85, 0.1);
  }
  
  &::placeholder {
    color: #b8a584;
    font-style: italic;
    font-size: 1.1rem;
  }
`;

const PriorityControls = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const PriorityCircle = styled.button<{ filled?: boolean; type?: 'urgency' | 'energy' }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.type === 'energy' ? '#8b7355' : '#d4af37'};
  background: ${props => props.filled 
    ? (props.type === 'energy' ? '#8b7355' : '#d4af37')
    : 'transparent'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 4px rgba(139, 115, 85, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ControlLabel = styled.span`
  font-size: 0.9rem;
  color: #8b7355;
  margin: 0 0.5rem;
  font-weight: 500;
  font-family: 'Crimson Text', serif;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #8b7355;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #8b7355;
  font-family: 'Crimson Text', serif;
  cursor: pointer;
  user-select: none;
`;

interface TaskItemProps {
  number?: string;
  placeholder: string;
  showPriority?: boolean;
}

const TaskItemComponent: React.FC<TaskItemProps> = ({ number, placeholder, showPriority = false }) => {
  const [task, setTask] = useState('');
  const [urgency, setUrgency] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [actual, setActual] = useState(false);

  return (
    <TaskItem>
      {number && <TaskNumber>{number}.</TaskNumber>}
      <TaskInput
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={placeholder}
      />
      
      {showPriority && (
        <PriorityControls>
          <ControlLabel>Urgency</ControlLabel>
          {[1, 2, 3, 4, 5].map(level => (
            <PriorityCircle
              key={level}
              type="urgency"
              filled={level <= urgency}
              onClick={() => setUrgency(level)}
            />
          ))}
          
          <ControlLabel>Energy</ControlLabel>
          {[1, 2, 3, 4, 5].map(level => (
            <PriorityCircle
              key={level}
              type="energy"
              filled={level <= energy}
              onClick={() => setEnergy(level)}
            />
          ))}
        </PriorityControls>
      )}
      
      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          id={`completed-${number}`}
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <CheckboxLabel htmlFor={`completed-${number}`}>Done</CheckboxLabel>
        
        <Checkbox
          type="checkbox"
          id={`actual-${number}`}
          checked={actual}
          onChange={(e) => setActual(e.target.checked)}
        />
        <CheckboxLabel htmlFor={`actual-${number}`}>Actual</CheckboxLabel>
      </CheckboxContainer>
    </TaskItem>
  );
};

const TaskSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle className="star">Most Important Task</SectionTitle>
      <TaskItemComponent 
        number="1" 
        placeholder="What's the one thing that will make today great?"
        showPriority={true}
      />
      
      <SectionTitle>Secondary Tasks of Importance</SectionTitle>
      <TaskItemComponent 
        number="2" 
        placeholder="Important task that supports your main goal"
      />
      <TaskItemComponent 
        number="3" 
        placeholder="Another important task"
      />
      
      <SectionTitle>Additional Tasks</SectionTitle>
      <TaskItemComponent 
        number="4" 
        placeholder="Additional task if time permits"
      />
      <TaskItemComponent 
        number="5" 
        placeholder="Another additional task"
      />
    </Section>
  );
};

export default TaskSection;