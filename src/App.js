import React, { useState, useEffect } from 'react';

import DataContext from './contexts/DataContext'
import Routes from './components/Routes'

const metricDefault = {
  bubble: { access: 0, swaps: 0 },
  selection: { access: 0, swaps: 0 },
  insertion: { access: 0, swaps: 0 },
  quick: { access: 0, swaps: 0 },
  merge: { access: 0, swaps: 0 },
}

const App = () => {
  const [ data, setData ] = useState([])
  const [ metrics, setMetrics ] = useState(metricDefault)
  const [ dataSize, setDataSize ] = useState(40)
  const [ isRunning, setIsRunning ] = useState(false)
  const [ animationsOn, setAnimationsOn ] = useState(true)

  const createData = (value) => {
    setIsRunning(false)
    let data = value > 0 ? [...Array(value).keys()] : [...Array(dataSize).keys()]
    data = data.sort(() => Math.random() - 0.5)
    setData([...data])
    setMetrics({...metricDefault})
  }

  const context = {
    data,
    setData,
    metrics,
    setMetrics,
    createData,
    dataSize,
    setDataSize,
    isRunning,
    setIsRunning,
    animationsOn,
    setAnimationsOn,
  }

  useEffect(createData, [])

  return (
    <DataContext.Provider value={context}>
      <Routes />
    </DataContext.Provider>
  )
}

export default App;
