import React from 'react'

import { MetricContainer } from '../styles'

const MetricWidget = ({ arrAccess, swaps }) => {

  const styles = {
    display: 'grid',
    gridTemplateColumns: '4fr 1.6fr',
    textAlign: 'right',
    padding: '2px',
  }

  return (
    <>
    <MetricContainer>
      <div style={styles}>
        <div>Array Accesses: </div>
        <div>{arrAccess}</div>
      </div>
      <div style={styles}>
        <div>Swaps: </div>
        <div>{swaps}</div>
      </div>
    </MetricContainer>
    </>
  )
}

export default MetricWidget
