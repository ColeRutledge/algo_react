import React from 'react'

import { AlgoInfoCont } from '../styles'

const AlgoInfo = ({ info: { uses, time, space }}) => {

  const headerStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
  }


  return (
      <AlgoInfoCont>
        <div>
          <h1 style={headerStyle}>Uses</h1>
          <p>{uses}</p>
        </div>
        <div></div>
        <div>
          <h1 style={headerStyle}>Time Complexity</h1>
          <p>{time}</p>
        </div>
        <div></div>
        <div>
          <h1 style={headerStyle}>Space Complexity</h1>
          <p>{space}</p>
        </div>
      </AlgoInfoCont>
  )
}

export default AlgoInfo
