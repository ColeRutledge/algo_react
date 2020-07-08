import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { SelectionContainer } from '../styles'

const SelectionSorter = () => {
  const { data, createData } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const selectionSort = async () => {
    const copy = data.slice()

    for (let i = 0; i < copy.length; i++) {
      let smallest = i
      for (let j = i + 1; j < copy.length; j++) {
        // await sleep(5)
        if (copy[smallest] > copy[j]) {
          smallest = j
        }
      }
      if (smallest !== i) {
        const swapped = await swap(i, smallest, copy)
        setSortedData([...swapped])
      }
    }
  }

  const swap = async (firstIndx, secondIndx, array) => {
    const bars = document.getElementsByClassName('bar')
    bars[firstIndx].style.backgroundColor = '#DC3545'
    bars[secondIndx].style.backgroundColor = '#DC3545'
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    await sleep(20)
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
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
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={selectionSort}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
      </div>
      <SelectionContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SelectionContainer>
    </>
  )
}

export default SelectionSorter
