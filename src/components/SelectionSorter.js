import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { SelectionContainer } from '../styles'

const SelectionSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const selectionSort = async () => {
    const copy = data.slice()

    for (let i = 0; i < copy.length; i++) {
      let smallest = i
      for (let j = i + 1; j < copy.length; j++) {
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
    await sleep(5)
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
  }

  return (
    <>
      <button className='btn btn-danger' onClick={selectionSort}>Sort!</button>
      <SelectionContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SelectionContainer>
    </>
  )
}

export default SelectionSorter
