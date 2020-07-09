import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import MetricWidget from './MetricWidget'
import { QuickContainer, MetricBar } from '../styles'

const QuickSorter = () => {
  const { data, createData } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const [ arrAccess, setArrAccess ] = useState(0)
  const [ swaps, setSwaps ] = useState(0)

  let accessCount = 0, swapCount = 0
  const bars = document.getElementsByClassName('bar')

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const quickSortHelper = async () => {
    const copy = data.slice()
    await quickSort(copy, 0, copy.length - 1)
  }

  const quickSort = async (array, start, end) => {
    if (start >= end) return
    let index = await partition(array, start, end)
    await quickSort(array, start, index - 1)
    await quickSort(array, index + 1, end)
    // Promise.all([quickSort(array, start, index - 1), quickSort(array, index + 1, end)])
  }

  const partition = async (array, start, end) => {
    let pivotValue = array[end]
    accessCount++
    setArrAccess(accessCount)
    let pivotIndex = start
    for (let i = start; i < end; i++) {
      accessCount++
      setArrAccess(accessCount)
      if (array[i] < pivotValue) {
        const swapped = await swap(i, pivotIndex, array)
        swapCount++
        setSwaps(swapCount)
        setSortedData([...swapped])
        pivotIndex++
      }
    }

    const swapped = await swap(pivotIndex, end, array)
    swapCount++
    setSwaps(swapCount)

    setSortedData([...swapped])
    return pivotIndex
  }

  const swap = async (firstIndx, secondIndx, array) => {
    bars[firstIndx].style.backgroundColor = '#DC3545'
    bars[secondIndx].style.backgroundColor = '#DC3545'
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    await sleep(15)
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
  }

  return (
    <>
      <MetricBar>
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={quickSortHelper}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
        <MetricWidget arrAccess={arrAccess} swaps={swaps} />
      </MetricBar>
      <QuickContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </QuickContainer>
    </>
  )
}

export default QuickSorter


  // const quickSort = async (array) => {

  //   // setSortedData([sortedData, ...array])
  //   if (array.length <= 1) return array

  //   let pivot = array.shift()
  //   bars[sortedData.indexOf(pivot)].style.backgroundColor = '#DC3545'

  //   let left = array.filter(el => el < pivot)
  //   let right = array.filter(el => el >= pivot)

  //   await sleep(100)

  //   let leftSorted = await quickSort(left)
  //   let rightSorted = await quickSort(right)

  //   bars[sortedData.indexOf(pivot)].style.backgroundColor = '#02203c'

  //   // let [leftSorted, rightSorted ] = await Promise.all([quickSort(left), quickSort(right)])

  //   // setSortedData([...array])
  //   setSortedData([ ...leftSorted, pivot, ...rightSorted ])
  //   return [ ...leftSorted, pivot, ...rightSorted ]

  // }
