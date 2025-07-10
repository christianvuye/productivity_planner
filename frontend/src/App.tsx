import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlannerBookWithSpine from './components/Layout/PlannerBookWithSpine';
import PlannerBookSeparate from './components/Layout/PlannerBookSeparate';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [viewMode, setViewMode] = useState<'separate' | 'spine'>('separate');

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          {/* Version Selector */}
          <div style={{ 
            position: 'fixed', 
            top: '10px', 
            left: '10px', 
            zIndex: 1000,
            background: 'rgba(139, 115, 85, 0.9)',
            padding: '10px',
            borderRadius: '8px',
            color: 'white'
          }}>
            <button 
              onClick={() => setViewMode('separate')}
              style={{
                background: viewMode === 'separate' ? '#8b7355' : 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '5px 10px',
                marginRight: '5px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Separate Pages
            </button>
            <button 
              onClick={() => setViewMode('spine')}
              style={{
                background: viewMode === 'spine' ? '#8b7355' : 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              With Spine
            </button>
          </div>

          <Routes>
            <Route path="/" element={
              viewMode === 'separate' 
                ? <PlannerBookSeparate /> 
                : <PlannerBookWithSpine />
            } />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
