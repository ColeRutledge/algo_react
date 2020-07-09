import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import MetricWidget from './MetricWidget'
import { SelectionContainer, MetricBar } from '../styles'

const SelectionSorter = () => {
  const { data, createData } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const [ arrAccess, setArrAccess ] = useState(0)
  const [ swaps, setSwaps ] = useState(0)

  let accessCount = 0, swapCount = 0

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const selectionSort = async () => {
    const copy = data.slice()

    for (let i = 0; i < copy.length; i++) {
      let smallest = i
      accessCount++
      setArrAccess(accessCount)
      for (let j = i + 1; j < copy.length; j++) {
        accessCount++
        // setArrAccess(accessCount)
        if (copy[smallest] > copy[j]) {
          smallest = j
        }
      }
      if (smallest !== i) {
        const swapped = await swap(i, smallest, copy)
        swapCount++
        setSwaps(swapCount)
        // setArrAccess(accessCount)
        setSortedData([...swapped])
      }
    }
    // setArrAccess(accessCount)
  }

  const swap = async (firstIndx, secondIndx, array) => {
    const bars = document.getElementsByClassName('bar')
    bars[firstIndx].style.backgroundColor = '#DC3545'
    bars[secondIndx].style.backgroundColor = '#DC3545'
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    await sleep(30)
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
  }

  return (
    <>
      <MetricBar>
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={selectionSort}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
        <MetricWidget arrAccess={arrAccess} swaps={swaps} />
      </MetricBar>
      <SelectionContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SelectionContainer>
    </>
  )
}

export default SelectionSorter
