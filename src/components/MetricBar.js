import React, { useContext } from 'react'
import { motion } from 'framer-motion'

import DataContext from '../contexts/DataContext'
import { WidgetContainer, MetricBarContainer, MetricWidgetContainer } from '../styles'

const MetricBar = () => {
  const { metrics } = useContext(DataContext)

  return (
    <MetricBarContainer>
      <MetricWidgetContainer>
        <div style={{ display: 'flex' }}>
          {/* <div> { metrics.bubble.access > 0 && <MetricWidget values={metrics.bubble} title={'Bubble Sort'}/>} </div> */}
          <motion.div positionTransition={{ type: 'spring', damping: 15 }} > { metrics.bubble.access > 0 && <MetricWidget values={metrics.bubble} title={'Bubble Sort'}/>} </motion.div>
          <motion.div positionTransition={{ type: 'spring', damping: 15 }} > { metrics.selection.access > 0 && <MetricWidget values={metrics.selection} title={'Selection Sort'}/>} </motion.div>
          <motion.div positionTransition={{ type: 'spring', damping: 15 }} > { metrics.insertion.access > 0 && <MetricWidget values={metrics.insertion} title={'Insertion Sort'}/>} </motion.div>
          <motion.div positionTransition={{ type: 'spring', damping: 15 }} > { metrics.quick.access > 0 && <MetricWidget values={metrics.quick} title={'Quick Sort'}/>} </motion.div>
          <motion.div positionTransition={{ type: 'spring', damping: 15 }} > { metrics.merge.access > 0 && <MetricWidget values={metrics.merge} title={'Merge Sort'}/>} </motion.div>
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
