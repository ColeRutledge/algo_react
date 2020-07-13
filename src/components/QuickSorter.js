import React, { useState, useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    await sleep(5)
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
    if (!refContainer.current) return
    let pivotValue = array[end]
    quick.access++
    setMetrics({ ...metrics, quick })
    let pivotIndex = start
    for (let i = start; i < end; i++) {
      if (!refContainer.current) return
      quick.access++
      if (array[i] < pivotValue) {
        const swapped = await swap(i, pivotIndex, array)
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}><ControlWidget algo={quickSortHelper} /></motion.div>
      <SortContainer initial={{ x: '40vw' }} animate={{ x: 0 }} transition={{ duration: .25, type: 'spring', stiffness: 40, }}>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </motion.div>
  )
}

export default QuickSorter


const info = {
  timeBigO: '$Avg: \\mathcal{O}(n\\cdot\\log{}n) \\hspace{1cm} Worst: \\mathcal O(n^2)$',
  spaceBigO: '$\\mathcal O(\\log{}n)$',
  time: 'Although we typically take the worst case into account when evaluating the time complexity of an algorithm, the worst case for quick sort (bad RNG on pivots) is so rare that it is common to consider it a loglinear algorithm. If we get lucky and choose the median as the pivot point on each recursive call, we would reach $\\mathcal{O}(n\\cdot\\log{}n)$. If we choose the min or max as pivots each time, we would hit the worst case polynomial complexity of $\\mathcal O(n^2)$.',
  space: 'This implementation of Quick Sort uses an in place sort which causes the space complexity to be $\\mathcal O(1)$ because we\'re sorting the values in place and mutating the original array. There is another version that creates additional partition arrays based on \'$n$\' inputs which would make it $\\mathcal O(n)$',
}
