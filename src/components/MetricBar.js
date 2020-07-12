import React, { useContext } from 'react'

import DataContext from '../contexts/DataContext'
import { WidgetContainer, MetricBarContainer, MetricWidgetContainer } from '../styles'

const MetricBar = () => {
  const { metrics } = useContext(DataContext)

  return (
    <MetricBarContainer>
      <MetricWidgetContainer>
        <div style={{ display: 'flex' }}>
          <div> { metrics.bubble.access > 0 && <MetricWidget values={metrics.bubble} title={'Bubble Sort'}/>} </div>
          <div> { metrics.selection.access > 0 && <MetricWidget values={metrics.selection} title={'Selection Sort'}/>} </div>
          <div> { metrics.insertion.access > 0 && <MetricWidget values={metrics.insertion} title={'Insertion Sort'}/>} </div>
          <div> { metrics.quick.access > 0 && <MetricWidget values={metrics.quick} title={'Quick Sort'}/>} </div>
          <div> { metrics.merge.access > 0 && <MetricWidget values={metrics.merge} title={'Merge Sort'}/>} </div>
      </div>
    </MetricWidgetContainer>
  </MetricBarContainer>
  )
}

const MetricWidget = ({ title, values: { access, swaps }}) => {

  const styles = {
    display: 'grid',
    gridTemplateColumns: '4fr 1.6fr',
    textAlign: 'right',
    padding: '2px',
  }

  return (
    <>
    <WidgetContainer>
      <div style={{ textAlign: 'center', paddingBottom: '3px', color: '#DC3545' }}>{title}</div>
      <div style={styles}>
        <div>Array Accesses: </div>
        <div>{access}</div>
      </div>
      <div style={styles}>
        <div>Swaps: </div>
        <div>{swaps}</div>
      </div>
    </WidgetContainer>
    </>
  )
}

export default MetricBar
