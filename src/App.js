import React, { useState } from 'react';

import DataContext from './contexts/DataContext'
import Routes from './components/Routes'

const App = () => {
  const [ data, setData ] = useState([])

  const createData = () => {
    let data = [...Array(100).keys()]
    data = data.sort(() => Math.random() - 0.5)
    setData([...data])
  }

  // const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min) + min)

  const context = {
    data,
    setData,
    createData,
  }

  return (
    <DataContext.Provider value={context}>
      <Routes />
    </DataContext.Provider>
  )
}

export default App;
