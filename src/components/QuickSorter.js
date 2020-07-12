import React, { useState, useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import DataContext from '../contexts/DataContext'
import ControlWidget from './ControlWidget'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'

const QuickSorter = () => {
  const { data, metrics, setMetrics, isRunning, setIsRunning } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const refContainer = useRef(isRunning)
  const history = useHistory()

  const quick = {...metrics.quick}
  const bars = document.getElementsByClassName('bar')

  useEffect(() => setSortedData(data), [data])
  useEffect(() => {
    refContainer.current = isRunning
  }, [isRunning])

  useEffect(() => {
    return history.listen(() => {
      if (isRunning) {
        setMetrics({ ...metrics, quick: { access: 0, swaps: 0 } })
      }
      refContainer.current = false
      setIsRunning(false)
    })
  }, [history, setIsRunning, isRunning, metrics, setMetrics])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const quickSortHelper = async () => {
    setIsRunning(true)
    await sleep(20)
    const copy = data.slice()
    quick.access = 0
    quick.swaps = 0
    await quickSort(copy, 0, copy.length - 1)
    refContainer.current = false
    setIsRunning(false)
  }

  const quickSort = async (array, start, end) => {
    if (start >= end) return
    if (!refContainer.current) return
    let index = await partition(array, start, end)
    await quickSort(array, start, index - 1)
    await quickSort(array, index + 1, end)
    // Promise.all([quickSort(array, start, index - 1), quickSort(array, index + 1, end)])
  }

  const partition = async (array, start, end) => {
    let pivotValue = array[end]
    quick.access++
    setMetrics({ ...metrics, quick })
    let pivotIndex = start
    for (let i = start; i < end; i++) {
      quick.access++
      if (array[i] < pivotValue) {
        const swapped = await swap(i, pivotIndex, array)
        if (!refContainer.current) return
        quick.swaps++
        setSortedData([...swapped])
        pivotIndex++
      }
    }

    const swapped = await swap(pivotIndex, end, array)
    quick.swaps++
    if (!refContainer.current) return
    setMetrics({ ...metrics, quick })
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
      <ControlWidget algo={quickSortHelper} />
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </>
  )
}

export default QuickSorter


const info = {
  uses: 'When you are in a pinch and need to throw down an efficient sort (on average). The recursive code is light and simple to implement; much smaller than mergeSort. When constant space is important to you, use the in-place version. This will of course trade off some simplicity of implementation.',
  time: 'Avg Case: O(n log(n)). Worst Case: O(n2). n is the length of the input array. The partition step alone is O(n). The partition step occurs in every recursive call, so our total complexities are: Best Case: O(n * log(n)) Worst Case: O(n2)',
  space: 'Our implementation of quickSort uses O(n) space because of the partition arrays we create. There is an in-place version of quickSort that uses O(log(n)) space. O(log(n)) space is not huge benefit over O(n). You\'ll also find our version of quickSort as easier to remember, easier to implement. Just know that a O(logn) space quickSort exists.',
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
