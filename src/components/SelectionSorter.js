import React, { useState, useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import DataContext from '../contexts/DataContext'
import ControlWidget from './ControlWidget'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'

const SelectionSorter = () => {
  const { data, metrics, setMetrics, isRunning, setIsRunning  } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const refContainer = useRef(isRunning)
  const history = useHistory()

  const selection = {...metrics.selection}

  useEffect(() => setSortedData(data), [data])
  useEffect(() => {
    refContainer.current = isRunning
  }, [isRunning])

  useEffect(() => {
    return history.listen(() => {
      if (isRunning) setMetrics({ ...metrics, selection: { access: 0, swaps: 0 } })
      refContainer.current = false
      setIsRunning(false)
    })
  }, [history, setIsRunning, isRunning, metrics, setMetrics])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const selectionSort = async () => {
    setIsRunning(true)
    const copy = data.slice()
    selection.access = 0
    selection.swaps = 0

    for (let i = 0; i < copy.length; i++) {
      let smallest = i
      selection.access++
      setMetrics({ ...metrics, selection })
      for (let j = i + 1; j < copy.length; j++) {
        selection.access++
        if (copy[smallest] > copy[j]) {
          smallest = j
        }
      }
      if (smallest !== i) {
        const swapped = await swap(i, smallest, copy)
        selection.swaps++
        if (!refContainer.current) return
        setMetrics({ ...metrics, selection })
        setSortedData([...swapped])
      }
    }
    refContainer.current = false
    setIsRunning(false)
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
      <ControlWidget algo={selectionSort} />
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </>
  )
}

export default SelectionSorter


const info = {
  uses: 'Selection Sort becomes advantageous when making a swap is the most expensive operation in your system. You will likely rarely encounter this scenario, but in a situation where you\'ve built (or have inherited) a system with suboptimal write speed ability, for instance, maybe you\'re sorting data in a specialized database tuned strictly for fast read speeds at the expense of slow write speeds, using Selection Sort would save you a ton of expensive operations that could potential crash your system under peak load.',
  time: 'n is the length of the input array. The outer loop i contributes O(n) in isolation, this is plain to see. The inner loop j is more complicated, it will make one less iteration for every iteration of i. The two loops are nested so our total time complexity is O(n * n / 2) = O(n2).',
  space: 'The amount of memory consumed by the algorithm does not increase relative to the size of the input array. We use the same amount of memory and create the same amount of variables regardless of the size of our input. A quick indicator of this is the fact that we don\'t create any arrays.',
}
