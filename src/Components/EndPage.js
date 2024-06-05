import React, { useContext, useEffect } from 'react';
import { GameContext } from './GameContext.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EndPage() {
  const { selectedSetId, tries, timer } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSetId === null) {
      navigate('/');
    }
  }, [selectedSetId, navigate]);

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center justify-content-center' style={{ marginTop: '3rem' }}>
              <p style={{ fontSize: '4rem' }}>Game Over</p>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <p style={{ fontSize: '2rem' }}>Selected Set: {selectedSetId}</p>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <p style={{ fontSize: '2rem' }}>Total Tries: {tries}</p>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <p style={{ fontSize: '2rem' }}>Total Time: {timer.toFixed(2)} seconds</p>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <Link type="button" className='btn btn-primary' to="/">Return to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
