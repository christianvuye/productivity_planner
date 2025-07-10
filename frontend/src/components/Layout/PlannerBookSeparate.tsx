import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LeftPage from './LeftPage';
import RightPage from './RightPage';

const pageFlipRight = keyframes`
  0% {
    transform: rotateY(0deg);
    transform-origin: right center;
  }
  50% {
    transform: rotateY(-90deg);
    transform-origin: right center;
  }
  100% {
    transform: rotateY(-180deg);
    transform-origin: right center;
  }
`;

const pageFlipLeft = keyframes`
  0% {
    transform: rotateY(-180deg);
    transform-origin: left center;
  }
  50% {
    transform: rotateY(-90deg);
    transform-origin: left center;
  }
  100% {
    transform: rotateY(0deg);
    transform-origin: left center;
  }
`;

const BookContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f2e8 0%, #ebe4d3 100%);
  font-family: 'Crimson Text', 'Georgia', serif;
  perspective: 1200px;
  overflow: hidden;
`;

const PageWrapper = styled.div<{ isAnimating: boolean; animationType: 'flipRight' | 'flipLeft' | null }>`
  width: 100vw;
  height: 100vh;
  position: relative;
  transform-style: preserve-3d;
  
  ${props => props.isAnimating && props.animationType === 'flipRight' && `
    animation: ${pageFlipRight} 0.8s ease-in-out;
  `}
  
  ${props => props.isAnimating && props.animationType === 'flipLeft' && `
    animation: ${pageFlipLeft} 0.8s ease-in-out;
  `}
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  background: 
    /* Subtle paper texture */
    radial-gradient(circle at 3px 3px, rgba(218, 208, 194, 0.06) 1px, transparent 1px),
    /* Horizontal ruling lines - more subtle and wider spaced */
    repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 28px,
      rgba(212, 197, 169, 0.12) 29px,
      transparent 30px
    ),
    /* Paper base color */
    #fefcf7;
  background-size: 20px 20px, 100% 30px, 100% 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  backface-visibility: hidden;
  
  /* Realistic page margins and subtle binding shadow */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Binding margin line */
      linear-gradient(to right, 
        transparent 80px, 
        rgba(212, 197, 169, 0.2) 81px, 
        rgba(212, 197, 169, 0.2) 82px,
        transparent 83px
      ),
      /* Subtle binding shadow */
      linear-gradient(to right,
        rgba(139, 115, 85, 0.03) 0px,
        transparent 40px
      );
    pointer-events: none;
    z-index: 1;
  }
  
  /* Page number */
  &::after {
    content: '149';
    position: fixed;
    bottom: 30px;
    right: 50px;
    font-size: 0.9rem;
    color: #a69582;
    font-family: 'Georgia', serif;
    z-index: 10;
  }
`;

const NavigationZone = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  ${props => props.position}: 0;
  z-index: 30;
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 115, 85, 0.05);
    
    &::after {
      opacity: 1;
      transform: ${props => props.position === 'left' ? 'translateX(-5px)' : 'translateX(5px)'};
    }
  }
  
  &::after {
    content: '${props => props.position === 'left' ? '←' : '→'}';
    font-size: 1.5rem;
    color: rgba(139, 115, 85, 0.6);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }
`;

const KeyboardHint = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  color: rgba(139, 115, 85, 0.4);
  text-align: center;
  z-index: 25;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const PlannerBookSeparate: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'flipRight' | 'flipLeft' | null>(null);

  const goToNextPage = () => {
    if (isAnimating || currentPage === 'right') return;
    
    setIsAnimating(true);
    setAnimationType('flipRight');
    
    setTimeout(() => {
      setCurrentPage('right');
      setIsAnimating(false);
      setAnimationType(null);
    }, 400);
  };

  const goToPrevPage = () => {
    if (isAnimating || currentPage === 'left') return;
    
    setIsAnimating(true);
    setAnimationType('flipLeft');
    
    setTimeout(() => {
      setCurrentPage('left');
      setIsAnimating(false);
      setAnimationType(null);
    }, 400);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isAnimating]);

  return (
    <BookContainer>
      <PageWrapper isAnimating={isAnimating} animationType={animationType}>
        <Page>
          {currentPage === 'left' ? <LeftPage /> : <RightPage />}
          
          {/* Invisible navigation zones */}
          {currentPage === 'left' && (
            <NavigationZone position="right" onClick={goToNextPage} />
          )}
          {currentPage === 'right' && (
            <NavigationZone position="left" onClick={goToPrevPage} />
          )}
          
          {/* Subtle keyboard hint */}
          <KeyboardHint>
            {currentPage === 'left' 
              ? 'Press → or Space to turn page' 
              : 'Press ← to go back'
            }
          </KeyboardHint>
        </Page>
      </PageWrapper>
    </BookContainer>
  );
};

export default PlannerBookSeparate;