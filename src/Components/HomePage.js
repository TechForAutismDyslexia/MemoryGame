import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage({ setSelectedSetId }) {
  const handleSetSelection = (setId) => {
    setSelectedSetId(setId);
  };

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center justify-content-center' style={{ marginTop: '3rem' }}>
              <p style={{ fontSize: '4rem' }}>Memory Game</p>
            </div>
          </div>
        </div>
        <div className='row d-flex align-items-center justify-content-center' style={{ minHeight: '70vh' }}>
          <div className='col-md-6'>
            <div className='card mb-3 ' style={{ borderRadius: '55px' }}>
              <div className='card-body d-flex flex-column align-items-center'>
                <img src={"/Images/img1.jpg"} alt="Memory Game" className='img-fluid mb-3' />
                <p style={{ fontSize: '30px' }} className='card-text'>Set A</p>
                <Link to="/game" onClick={() => handleSetSelection(1)} className='btn btn-lg btn-primary'>Start Game</Link>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card mb-3' style={{ borderRadius: '55px' }}>
              <div className='card-body d-flex flex-column align-items-center'>
                <img src={"/Images/img1.jpg"} alt="Memory Game" className='img-fluid mb-3' />
                <p style={{ fontSize: '30px' }} className='card-text'>Set B</p>
                <Link to="/game" onClick={() => handleSetSelection(6)} className='btn btn-lg btn-primary'>Start Game</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
