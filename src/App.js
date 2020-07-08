import React, { useState } from 'react';

import DataContext from './contexts/DataContext'
import Routes from './components/Routes'

const App = () => {
  const [ data, setData ] = useState([])

  const createData = () => {
    const data = []
    while (data.length <= 100) {
      let randNum = getRandomNum(10, 600)
      if (data.indexOf(randNum) === -1) data.push(randNum)
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
