import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

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
    const copy = data.slice()
    bubble.access = 0
    bubble.swaps = 0

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length - i; j++) {
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
    <>
      <ControlWidget algo={bubbleSort} />
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </>
  )
}

export default BubbleSorter


const info = {
  uses: 'When sorting really small arrays where run time will be negligible no matter what algorithm you choose. When sorting arrays that you expect to already be nearly sorted. At parties!',
  time: 'n is the length of the input array. The inner for loop along contributes O(n) in isolation. The outer while loop contributes O(n) in isolation because a single iteration of the while loop will bring one element to its final resting position. In other words, it keeps running the while loop until the array is fully sorted. To fully sort the array we will need to bring all n elements into their final resting positions. Those two loops are nested so the total time complexity is O(n * n) = O(n2).',
  space: 'Bubble Sort is a constant space, O(1), algorithm. The amount of memory consumed by the algorithm does not increase relative to the size of the input array. It uses the same amount of memory and create the same amount of variables regardless of the size of the input, making this algorithm quite space efficient. The space efficiency mostly comes from the fact that it mutates the input array in-place. This is known as a destructive sort because it "destroys" the positions of the values in the array.',
}
