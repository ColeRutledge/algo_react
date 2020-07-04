import React, { useContext, useState } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { BubbleContainer } from '../styles'


const BubbleSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortData, setSortData ] = useState([])


  const bubbleSort = () => {
    setSortData(data)

    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i] > data[j]) {
          swap(i, j, data)
        }
      }
    }
    setSortData(data)
  }

  const swap = (firstIndx, secondIndx, array) => {
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
  }

  // if (sortData.length === 0) return null

  return (
    <>
      <button onClick={bubbleSort}>Sort!</button>
      <BubbleContainer>
        {data.map((value, index) => <SortNode key={index} value={value} />)}
      </BubbleContainer>
    </>
  )
}



export default BubbleSorter
