import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-top: 2rem;
`;

const TrackerGroup = styled.div`
  margin-bottom: 2rem;
`;

const TrackerTitle = styled.h4`
  font-size: 0.9rem;
  color: #8b7355;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

const HabitTracker = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const HabitCircle = styled.button<{ filled?: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #d4c5a9;
  background: ${props => props.filled ? '#8b7355' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;
  
  &:hover {
    transform: scale(1.1);
    border-color: #8b7355;
  }
`;

const MoodTracker = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const MoodEmoji = styled.button<{ selected?: boolean }>`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: ${props => props.selected ? 1 : 0.4};
  
  &:hover {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const RateDay = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RatingStar = styled.button<{ filled?: boolean }>`
  font-size: 1.2rem;
  color: ${props => props.filled ? '#d4af37' : '#e8dcc0'};
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #d4af37;
  }
`;

const TrackerSection: React.FC = () => {
  const [habitDone, setHabitDone] = useState(false);
  const [mood, setMood] = useState<number | null>(null);
  const [dayRating, setDayRating] = useState<number>(0);

  const moodEmojis = ['😢', '😕', '😐', '😊', '😄'];

  return (
    <Section>
      <TrackerGroup>
        <TrackerTitle>Habit Tracker</TrackerTitle>
        <HabitTracker>
          <HabitCircle 
            filled={habitDone}
            onClick={() => setHabitDone(!habitDone)}
          />
          <span style={{ color: '#8b7355', fontSize: '0.9rem' }}>
            Daily habit completed
          </span>
        </HabitTracker>
      </TrackerGroup>

      <TrackerGroup>
        <TrackerTitle>Mood Tracker</TrackerTitle>
        <MoodTracker>
          {moodEmojis.map((emoji, index) => (
            <MoodEmoji
              key={index}
              selected={mood === index + 1}
              onClick={() => setMood(index + 1)}
            >
              {emoji}
            </MoodEmoji>
          ))}
        </MoodTracker>
      </TrackerGroup>

      <TrackerGroup>
        <TrackerTitle>Rate Day</TrackerTitle>
        <RateDay>
          {[1, 2, 3, 4, 5].map((star) => (
            <RatingStar
              key={star}
              filled={star <= dayRating}
              onClick={() => setDayRating(star)}
            >
              ★
            </RatingStar>
          ))}
        </RateDay>
      </TrackerGroup>
    </Section>
  );
};

export default TrackerSection;