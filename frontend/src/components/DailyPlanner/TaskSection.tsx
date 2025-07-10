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
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
`;

const TaskInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
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

const PomodoroControls = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-left: 2.5rem;
  margin-top: 0.3rem;
`;

const PomodoroSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const PomodoroLabel = styled.span`
  font-size: 0.85rem;
  color: #8b7355;
  font-weight: 500;
  font-family: 'Crimson Text', serif;
  margin-right: 0.3rem;
`;

const PomodoroCircle = styled.button<{ filled?: boolean; type?: 'estimate' | 'actual' }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid ${props => props.type === 'actual' ? '#8b7355' : '#d4af37'};
  background: ${props => props.filled 
    ? (props.type === 'actual' ? '#8b7355' : '#d4af37')
    : 'transparent'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${props => props.filled ? 'white' : (props.type === 'actual' ? '#8b7355' : '#d4af37')};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(139, 115, 85, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

interface TaskItemProps {
  number?: string;
  placeholder: string;
  showPomodoro?: boolean;
}

const TaskItemComponent: React.FC<TaskItemProps> = ({ number, placeholder, showPomodoro = false }) => {
  const [task, setTask] = useState('');
  const [estimate, setEstimate] = useState(0);
  const [actual, setActual] = useState(0);

  const handleEstimateClick = (level: number) => {
    if (estimate === level) {
      // If clicking the same level, decrease by 1
      setEstimate(Math.max(0, level - 1));
    } else {
      // Set to the clicked level
      setEstimate(level);
    }
  };

  const handleActualClick = (level: number) => {
    if (actual === level) {
      // If clicking the same level, decrease by 1
      setActual(Math.max(0, level - 1));
    } else {
      // Set to the clicked level
      setActual(level);
    }
  };

  return (
    <TaskItem>
      <TaskInputRow>
        {number && <TaskNumber>{number}.</TaskNumber>}
        <TaskInput
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder={placeholder}
        />
      </TaskInputRow>
      
      {showPomodoro && (
        <PomodoroControls>
          <PomodoroSection>
            <PomodoroLabel>Est:</PomodoroLabel>
            {[1, 2, 3, 4, 5].map(level => (
              <PomodoroCircle
                key={level}
                type="estimate"
                filled={level <= estimate}
                onClick={() => handleEstimateClick(level)}
              >
                {level}
              </PomodoroCircle>
            ))}
          </PomodoroSection>
          
          <PomodoroSection>
            <PomodoroLabel>Actual:</PomodoroLabel>
            {[1, 2, 3, 4, 5].map(level => (
              <PomodoroCircle
                key={level}
                type="actual"
                filled={level <= actual}
                onClick={() => handleActualClick(level)}
              >
                {level}
              </PomodoroCircle>
            ))}
          </PomodoroSection>
        </PomodoroControls>
      )}
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
        showPomodoro={true}
      />
      
      <SectionTitle>Secondary Tasks of Importance</SectionTitle>
      <TaskItemComponent 
        number="2" 
        placeholder="Important task that supports your main goal"
        showPomodoro={true}
      />
      <TaskItemComponent 
        number="3" 
        placeholder="Another important task"
        showPomodoro={true}
      />
      
      <SectionTitle>Additional Tasks</SectionTitle>
      <TaskItemComponent 
        number="4" 
        placeholder="Additional task if time permits"
        showPomodoro={true}
      />
      <TaskItemComponent 
        number="5" 
        placeholder="Another additional task"
        showPomodoro={true}
      />
    </Section>
  );
};

export default TaskSection;