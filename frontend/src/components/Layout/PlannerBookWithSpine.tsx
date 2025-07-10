import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LeftPage from './LeftPage';
import RightPage from './RightPage';

const BookContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f2e8 0%, #ebe4d3 100%);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Crimson Text', 'Georgia', serif;
`;

const BookSpread = styled.div`
  display: flex;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

const Spine = styled.div`
  width: 20px;
  background: linear-gradient(to bottom, #b8a584 0%, #a69582 50%, #8b7355 100%);
  border-left: 2px solid #9d8f7a;
  border-right: 2px solid #9d8f7a;
  position: relative;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 20px,
      rgba(141, 115, 85, 0.3) 20px,
      rgba(141, 115, 85, 0.3) 22px
    );
  }
`;

const PageContainer = styled.div`
  width: 45vw;
  height: 90vh;
  max-width: 500px;
  max-height: 1000px;
  min-width: 350px;
  min-height: 750px;
  background: #fefcf7;
  position: relative;
  overflow: hidden;
`;

const NavigationContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
`;

const NavButton = styled.button`
  background: rgba(139, 115, 85, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 115, 85, 1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PlannerBookWithSpine: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'left' | 'right'>('left');

  const goToNextPage = () => {
    setCurrentPage('right');
  };

  const goToPrevPage = () => {
    setCurrentPage('left');
  };

  return (
    <BookContainer>
      <BookSpread>
        {/* Left Page */}
        <PageContainer>
          <LeftPage />
          {currentPage === 'left' && (
            <NavigationContainer>
              <NavButton onClick={goToNextPage}>→</NavButton>
            </NavigationContainer>
          )}
        </PageContainer>

        {/* Spine */}
        <Spine />

        {/* Right Page */}
        <PageContainer>
          <RightPage />
          {currentPage === 'right' && (
            <NavigationContainer>
              <NavButton onClick={goToPrevPage}>←</NavButton>
            </NavigationContainer>
          )}
        </PageContainer>
      </BookSpread>
    </BookContainer>
  );
};

export default PlannerBookWithSpine;