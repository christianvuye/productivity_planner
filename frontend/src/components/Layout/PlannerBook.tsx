import React from 'react';
import styled from 'styled-components';
import DailyPlannerPage from '../DailyPlanner/DailyPlannerPage';

const BookContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f2e8 0%, #ebe4d3 100%);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Georgia', 'Times New Roman', serif;
`;

const Book = styled.div`
  width: 90vw;
  max-width: 1200px;
  height: 85vh;
  background: #fefcf7;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  border: 2px solid #d4c5a9;
`;

const BindingEdge = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to right, #c9b896, #d4c5a9);
  border-right: 2px solid #b8a584;
  
  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 30px;
    bottom: 30px;
    width: 6px;
    background: repeating-linear-gradient(
      to bottom,
      #9d8f7a 0px,
      #9d8f7a 8px,
      transparent 8px,
      transparent 20px
    );
    border-radius: 3px;
  }
`;

const PageContainer = styled.div`
  margin-left: 40px;
  height: 100%;
  padding: 2rem;
  overflow-y: auto;
  background: 
    radial-gradient(circle at 20px 20px, rgba(218, 208, 194, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 60px 60px, rgba(218, 208, 194, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const PlannerBook: React.FC = () => {
  return (
    <BookContainer>
      <Book>
        <BindingEdge />
        <PageContainer>
          <DailyPlannerPage />
        </PageContainer>
      </Book>
    </BookContainer>
  );
};

export default PlannerBook;