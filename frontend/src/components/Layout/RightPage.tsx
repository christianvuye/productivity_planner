import React from 'react';
import styled from 'styled-components';
import TimeSchedule from '../DailyPlanner/TimeSchedule';
import NotesSection from '../DailyPlanner/NotesSection';

const PageContent = styled.div`
  /* Natural full-screen margins for right page */
  padding: 80px 120px 100px 100px;
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const ScheduleContainer = styled.div`
  flex: 1;
  min-height: 60%;
`;

const NotesContainer = styled.div`
  flex: 1;
  min-height: 35%;
`;

const RightPage: React.FC = () => {
  return (
    <PageContent>
      <ScheduleContainer>
        <TimeSchedule />
      </ScheduleContainer>
      
      <NotesContainer>
        <NotesSection />
      </NotesContainer>
    </PageContent>
  );
};

export default RightPage;