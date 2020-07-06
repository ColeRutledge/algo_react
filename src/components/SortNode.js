import React from 'react'

const SortNode = ({ value }) => {

  const divStyles = {
    backgroundColor: '#5CCFE6',
    height: `${value}px`,
    width: '100%',
    margin: '2px',
  }

  return (
    <>
      <div className='bar' style={divStyles}></div>
    </>
  )
}

export default SortNode

