import React from 'react'

export default function EndPage({selectedSetId, tries}) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <p>{selectedSetId}</p>
      <p>{tries}</p>
    </div>
  )
}
