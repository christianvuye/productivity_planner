import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import GratitudeSection from '../DailyPlanner/GratitudeSection';
import IntentionSection from '../DailyPlanner/IntentionSection';
import TaskSection from '../DailyPlanner/TaskSection';
import ReflectionSection from '../DailyPlanner/ReflectionSection';

const PageContent = styled.div`
  /* Natural full-screen margins like a real desk planner */
  padding: 80px 120px 120px 100px;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  z-index: 2;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(212, 197, 169, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 115, 85, 0.4);
    border-radius: 3px;
  }
`;

const DateHeaderLeft = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
`;

const DayName = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  color: #6d5a3f;
  margin: 0;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(139, 115, 85, 0.1);
`;

const DateString = styled.div`
  font-size: 1.8rem;
  color: #8b7355;
  margin-top: 1.2rem;
  letter-spacing: 2px;
  font-weight: 400;
`;

const ActionCue = styled.div`
  font-size: 1.4rem;
  color: #a69582;
  margin-top: 1.8rem;
  font-style: italic;
  line-height: 1.6;
  max-width: 600px;
  font-family: 'Crimson Text', serif;
`;

const HeaderTextArea = styled.textarea`
  width: 100%;
  border: none;
  background: transparent;
  padding: 1rem 0;
  font-size: 1.2rem;
  color: #4a3d2a;
  font-family: 'Crimson Text', serif;
  margin-top: 1rem;
  resize: none;
  min-height: 3rem;
  overflow: hidden;
  line-height: 1.6;
  transition: all 0.3s ease;
  
  /* Invisible borders and natural text flow */
  border-bottom: 2px solid transparent;
  
  /* Subtle ruled lines effect */
  background-image: repeating-linear-gradient(
    transparent,
    transparent 1.5rem,
    rgba(212, 197, 169, 0.15) 1.5rem,
    rgba(212, 197, 169, 0.15) calc(1.5rem + 1px),
    transparent calc(1.5rem + 1px)
  );
  background-size: 100% 1.6rem;
  background-position: 0 0.3rem;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #8b7355;
    box-shadow: 0 2px 4px rgba(139, 115, 85, 0.08);
  }
  
  &::placeholder {
    color: #b8a584;
    font-style: italic;
    font-size: 1.1rem;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const LeftPage: React.FC = () => {
  const today = new Date();
  const [headerNote, setHeaderNote] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeaderNote(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <PageContent>
      <DateHeaderLeft>
        <DayName>{format(today, 'EEEE')}</DayName>
        <DateString>{format(today, 'MMMM d, yyyy')}</DateString>
        <ActionCue>
          Action cures fear. Indecision, procrastination fuels fear.
        </ActionCue>
        <HeaderTextArea
          ref={textareaRef}
          value={headerNote}
          onChange={handleTextChange}
          placeholder="Add notes for today... Write as much as you need, text will flow naturally to new lines."
          rows={1}
        />
      </DateHeaderLeft>

      <ContentSection>
        <GratitudeSection />
        <IntentionSection />
        <TaskSection />
        <ReflectionSection />
      </ContentSection>
    </PageContent>
  );
};

export default LeftPage;