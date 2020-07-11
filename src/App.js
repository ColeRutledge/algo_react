import React, { useState } from 'react';

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

  const createData = () => {
    let data = [...Array(50).keys()]
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
  }

  return (
    <DataContext.Provider value={context}>
      <Routes />
    </DataContext.Provider>
  )
}

export default App;
