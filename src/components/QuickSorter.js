import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { QuickContainer } from '../styles'

const QuickSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const bars = document.getElementsByClassName('bar')

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const quickSortHelper = async () => {
    const copy = data.slice()
    await quickSort(copy, 0, copy.length - 1)
    // await quickSort(copy)
    // const sorted = await quickSort(copy)
    // setSortedData([...sorted])
  }

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


  const quickSort = async (array, start, end) => {
    if (start >= end) return
    let index = await partition(array, start, end)
    Promise.all([quickSort(array, start, index - 1), await quickSort(array, index + 1, end)])
  }

  const partition = async (array, start, end) => {
    let pivotValue = array[end]
    let pivotIndex = start
    for (let i = start; i < end; i++) {
      // bars[i].style.backgroundColor = '#5C6773'
      // await sleep(25)
      if (array[i] < pivotValue) {
        const swapped = await swap(i, pivotIndex, array)
        setSortedData([...swapped])
        pivotIndex++
      }
    }

    // for (let i = start; i < end; i++) {
    //   bars[i].style.backgroundColor = '#02203c'
    // }
    const swapped = await swap(pivotIndex, end, array)
    setSortedData([...swapped])
    return pivotIndex
  }

  const swap = async (firstIndx, secondIndx, array) => {
    // const bars = document.getElementsByClassName('bar')
    bars[firstIndx].style.backgroundColor = '#DC3545'
    bars[secondIndx].style.backgroundColor = '#DC3545'
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    await sleep(25)
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
  }

  if (!sortedData.length) return null

  return (
    <>
      <button className='btn btn-danger' onClick={quickSortHelper}>Sort!</button>
      <QuickContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </QuickContainer>
    </>
  )
}

export default QuickSorter


// if (array.length <= 1) return array
// const bars = document.getElementsByClassName('bar')

// let pivot = array.shift()
// let left = array.filter(el => el < pivot)
// let right = array.filter(el => el >= pivot)

// let [leftSorted, rightSorted ] = await Promise.all([quickSort(left), quickSort(right)])

// return [...leftSorted, pivot, ...rightSorted]
