import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Header = styled.div`
  text-align: center;
  padding: 1rem 0;
  border-bottom: 3px solid #d4c5a9;
  margin-bottom: 1rem;
`;

const DayName = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  color: #8b7355;
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Georgia', serif;
`;

const DateString = styled.div`
  font-size: 1.2rem;
  color: #a69582;
  margin-top: 0.5rem;
  letter-spacing: 1px;
`;

const ActionCue = styled.div`
  font-size: 0.9rem;
  color: #b8a584;
  margin-top: 0.25rem;
  font-style: italic;
  text-align: right;
`;

interface DateHeaderProps {
  date: Date;
}

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
  return (
    <Header>
      <DayName>{format(date, 'EEEE')}</DayName>
      <DateString>
        {format(date, 'MMMM d, yyyy')}
      </DateString>
      <ActionCue>
        Action cures fear. Indecision, procrastination fuels fear.
      </ActionCue>
    </Header>
  );
};

export default DateHeader;