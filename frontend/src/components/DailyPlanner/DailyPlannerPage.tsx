import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import DateHeader from './DateHeader';
import GratitudeSection from './GratitudeSection';
import IntentionSection from './IntentionSection';
import TaskSection from './TaskSection';
import TimeSchedule from './TimeSchedule';
import NotesSection from './NotesSection';
import ReflectionSection from './ReflectionSection';
import TrackerSection from './TrackerSection';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 240px 1fr;
  grid-template-rows: auto auto auto 1fr auto;
  gap: 1.5rem;
  height: 100%;
  min-height: 700px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MiddleColumn = styled.div`
  border-left: 2px solid #e8dcc0;
  border-right: 2px solid #e8dcc0;
  padding: 0 1rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DailyPlannerPage: React.FC = () => {
  const today = new Date();

  return (
    <PageGrid>
      {/* Header spans all columns */}
      <div style={{ gridColumn: '1 / -1' }}>
        <DateHeader date={today} />
      </div>

      {/* Left Column */}
      <LeftColumn>
        <GratitudeSection />
        <IntentionSection />
        <TaskSection />
        <ReflectionSection />
      </LeftColumn>

      {/* Middle Column - Time Schedule */}
      <MiddleColumn>
        <TimeSchedule />
      </MiddleColumn>

      {/* Right Column */}
      <RightColumn>
        <NotesSection />
        <TrackerSection />
      </RightColumn>
    </PageGrid>
  );
};

export default DailyPlannerPage;