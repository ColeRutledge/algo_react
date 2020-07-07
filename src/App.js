import React, { useState } from 'react';

import DataContext from './contexts/DataContext'
import Routes from './components/Routes'

const App = () => {
  const [ data, setData ] = useState([])

  const createData = () => {
    const data = []
    for (let i = 0; i < 100; i++) {
      let randNum = getRandomNum(10, 600)
      data.push(randNum)
    }
    setData(data)
  }

  const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min) + min)

  const context = {
    data,
    setData,
    createData,
    getRandomNum,
  }

  return (
    <DataContext.Provider value={context}>
      <Routes />
    </DataContext.Provider>
  )
}

export default App;
