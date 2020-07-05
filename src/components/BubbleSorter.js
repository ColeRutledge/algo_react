import React, { useContext, useState, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { BubbleContainer } from '../styles'


const BubbleSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  useEffect(() => setSortedData(data), [data])

  const bubbleSort = () => {
    const copy = data.slice()

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length; j++) {
        if (copy[j] > copy[j + 1]) {
          swap(j, j + 1, copy)
        }
      }
    }

    setSortedData(copy)
    bubbleAnimation(data, sortedData)

  }

  const bubbleAnimation = (data, sortedData) => {
    // console.log(data)
    // console.log(sortedData)
    return
  }

  const swap = (firstIndx, secondIndx, array) => {
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
  }

  if (!sortedData.length) return null

  return (
    <>
      <button onClick={bubbleSort}>Sort!</button>
      <BubbleContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </BubbleContainer>
    </>
  )
}



export default BubbleSorter
