import React from 'react';
import styled from 'styled-components';

const ScheduleContainer = styled.div`
  height: 100%;
`;

const ScheduleTitle = styled.h3`
  font-size: 0.8rem;
  color: #8b7355;
  margin-bottom: 0.75rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: visible;
  border-bottom: 1px solid #e8dcc0;
  padding-bottom: 0.5rem;
`;

const TimeSlot = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  height: 18px;
`;

const TimeLabel = styled.span`
  font-size: 0.7rem;
  color: #8b7355;
  min-width: 40px;
  font-weight: 500;
`;

const TimeBar = styled.div`
  flex: 1;
  height: 1px;
  background: #e8dcc0;
  margin-left: 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -2px;
    width: 5px;
    height: 5px;
    background: #d4c5a9;
    border-radius: 50%;
  }
`;

const TimeSchedule: React.FC = () => {
  const timeSlots = [
    '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30',
    '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
    '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30'
  ];

  return (
    <ScheduleContainer>
      <ScheduleTitle>Daily Planning</ScheduleTitle>
      {timeSlots.map((time, index) => (
        <TimeSlot key={index}>
          <TimeLabel>{time}</TimeLabel>
          <TimeBar />
        </TimeSlot>
      ))}
    </ScheduleContainer>
  );
};

export default TimeSchedule;