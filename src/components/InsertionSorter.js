import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { InsertionContainer } from '../styles'

const InsertionSorter = () => {
  const { data, createData } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const insertionSort = async () => {
    const copy = data.slice()
    const bars = document.getElementsByClassName('bar')

    for (let i = 1; i < copy.length; i++) {
      let key = copy[i]
      let j = i - 1
      while (j >= 0 && copy[j] > key) {
        bars[j + 1].style.backgroundColor = '#DC3545'
        bars[j].style.backgroundColor = '#DC3545'
        copy[j + 1] = copy[j]
        await sleep(5)
        bars[j + 1].style.backgroundColor = '#02203c'
        bars[j].style.backgroundColor = '#02203c'
        j = j - 1
        setSortedData([...copy])
      }
      copy[j + 1] = key
    }
  }

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#8A91991A',
    borderBottom: '1px solid lightgrey',
    boxShadow: '0 0 3px 0 rgba(21,27,38,.15)',
  }

  return (
    <>
      <div style={styles}>
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={insertionSort}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
      </div>
      <InsertionContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </InsertionContainer>
    </>
  )
}

export default InsertionSorter
