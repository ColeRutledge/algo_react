import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import DataContext from '../contexts/DataContext'
import ControlWidget from './ControlWidget'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'


const BubbleSorter = () => {
  const { data, metrics, setMetrics, isRunning, setIsRunning } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const refContainer = useRef(isRunning)
  const history = useHistory()

  const bubble = {...metrics.bubble}

  useEffect(() => setSortedData(data), [data])
  useEffect(() => {
    refContainer.current = isRunning
  }, [isRunning])

  useEffect(() => {
    return history.listen(() => {
      if (isRunning) setMetrics({ ...metrics, bubble: { access: 0, swaps: 0 } })
      refContainer.current = false
      setIsRunning(false)
    })
  }, [history, setIsRunning, isRunning, metrics, setMetrics])

  const sleep = async ms => await new Promise(resolve => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    setIsRunning(true)
    await sleep(5)
    const copy = data.slice()
    bubble.access = 0
    bubble.swaps = 0

    for (let i = 0; i < copy.length; i++) {
      if (!refContainer.current) return
      for (let j = 0; j < copy.length - i; j++) {
        if (!refContainer.current) return
        bubble.access++
        if (copy[j] > copy[j + 1]) {
          const swapped = await swap(j, j + 1, copy)
          if (!refContainer.current) return
          bubble.swaps++
          setSortedData([...swapped])
          setMetrics({ ...metrics, bubble })
        }
      }
    }
    refContainer.current = false
    setIsRunning(false)
  }

  const swap = async (firstIndx, secondIndx, array) => {
    const bars = document.getElementsByClassName('bar')
    bars[firstIndx].style.backgroundColor = '#DC3545'
    bars[secondIndx].style.backgroundColor = '#DC3545'
    await sleep(5)
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
  }

  return (
    <motion.div initial={{ opacity: .25 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}><ControlWidget algo={bubbleSort} /></motion.div>
      <SortContainer initial={{ x: '40vw' }} animate={{ x: 0 }} transition={{ duration: .25, type: 'spring', stiffness: 40, }}>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </motion.div>
  )
}

export default BubbleSorter


const info = {
  timeBigO: '$\\mathcal O(n^2)$',
  spaceBigO: '$\\mathcal O(1)$',
  time: 'Bubble Sort is on the lower end of the scale in terms of time complexity.  Both the outter and inner loops contribute $\\mathcal O(n)$ which puts it in the polynomial complexity class with a total time complexity of $\\mathcal{O}(n\\cdot\\ n) = \\mathcal O(n^2)$.',
  space: 'Bubble Sort\'s space complexity is as efficient as it can get at $\\mathcal O(1)$.  The amount of memory consumed does not increase relative to the size of the input array as we\'re \'swapping\' elements and mutating the original array.',
}

