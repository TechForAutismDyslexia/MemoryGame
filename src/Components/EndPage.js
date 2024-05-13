import React from 'react';
import { Link } from 'react-router-dom';

export default function EndPage({ selectedSetId, tries,timer }) {
  return (
    <div className='end-page'>
      <p className='result'>Selected Set ID: {selectedSetId}</p>
      <p className='result'>Tries: {tries}</p>
      <p className='result'>Time Taken: {timer}</p>
      <Link type="button" className='btn btn-primary' to="/">Return to Home</Link>
    </div>
  );
}
