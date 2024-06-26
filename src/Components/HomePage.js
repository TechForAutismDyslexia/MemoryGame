import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from './GameContext.js';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { setSelectedSetId } = useContext(GameContext);
  const [imageSource, setImageSource] = useState(null);
  

  const handleSetSelection = (setId) => {
    setSelectedSetId(setId);
  };

  useEffect(() => {
    const fetchImage = async () => {
      const { default: img } = await import("../assets/Images/img1.jpg");
      setImageSource(img);
    };

    fetchImage();
  }, []);


  return (
    <div className='d-flex align-items-center justify-content-center home'>
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
                <Link to="/game" onClick={() => handleSetSelection(1)} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={imageSource} alt="Memory Game" className='img-fluid mb-3' />
                </Link>
                <Link to="/game" onClick={() => handleSetSelection(1)} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p style={{ fontSize: '30px' }} className='card-text'>Set A</p>
                </Link>
                <Link to="/game" onClick={() => handleSetSelection(1)} className='btn btn-lg btn-primary'>Start Game</Link>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card mb-3' style={{ borderRadius: '55px' }}>
              <div className='card-body d-flex flex-column align-items-center'>
                <Link to="/game" onClick={() => handleSetSelection(6)} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={imageSource} alt="Memory Game" className='img-fluid mb-3' />
                </Link>
                <Link to="/game" onClick={() => handleSetSelection(6)} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p style={{ fontSize: '30px' }} className='card-text'>Set B</p>
                </Link>
                <Link to="/game" onClick={() => handleSetSelection(6)} className='btn btn-lg btn-primary'>Start Game</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
