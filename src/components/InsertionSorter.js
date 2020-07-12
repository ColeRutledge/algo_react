import React, { useState, useContext, useEffect, useRef } from 'react'

import DataContext from '../contexts/DataContext'
import ControlWidget from './ControlWidget'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'

const InsertionSorter = () => {
  const { data, metrics, setMetrics, isRunning, setIsRunning } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const refContainer = useRef(isRunning)

  const insertion = {...metrics.insertion}

  useEffect(() => setSortedData(data), [data])
  useEffect(() => {
    refContainer.current = isRunning
  }, [isRunning])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const insertionSort = async () => {
    setIsRunning(true)
    const copy = data.slice()
    insertion.access = 0
    insertion.swaps = 0
    const bars = document.getElementsByClassName('bar')

    for (let i = 1; i < copy.length; i++) {
      insertion.access++
      let key = copy[i]
      let j = i - 1
      while (j >= 0 && copy[j] > key) {
        insertion.access++
        insertion.swaps++

        bars[j + 1].style.backgroundColor = '#DC3545'
        bars[j].style.backgroundColor = '#DC3545'
        copy[j + 1] = copy[j]
        await sleep(5)
        bars[j + 1].style.backgroundColor = '#02203c'
        bars[j].style.backgroundColor = '#02203c'
        j = j - 1

        if (!refContainer.current) return
        setMetrics({ ...metrics, insertion })
        setSortedData([...copy])
      }
      insertion.access++
      copy[j + 1] = key
      setSortedData([...copy])
    }
  }

  return (
    <>
      <ControlWidget algo={insertionSort} />
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </>
  )
}

export default InsertionSorter


const info = {
  uses: 'Insertion Sort has one advantage that makes it absolutely supreme in one special case. Insertion Sort is what\'s known as an "online" algorithm. Online algorithms are great when you\'re dealing with streaming data, because they can sort the data live as it is received.',
  time: 'n is the length of the input array. The outer loop i contributes O(n) in isolation, this is plain to see. The inner loop j is more complicated. We know j will iterate until it finds an appropriate place to insert the currElement into the sorted region. The two loops are nested so our total time complexity is O(n * n / 2) = O(n2).',
  space: 'The amount of memory consumed by the algorithm does not increase relative to the size of the input array. We use the same amount of memory and create the same amount of variables regardless of the size of our input. A quick indicator of this is the fact that we don\'t create any arrays.',
}
