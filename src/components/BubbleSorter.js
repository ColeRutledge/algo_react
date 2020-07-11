import React, { useContext, useState, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import MetricBar from './MetricBar'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'


const BubbleSorter = () => {
  const { data, createData, metrics, setMetrics } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  const bubble = {...metrics.bubble}

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const copy = data.slice()
    bubble.access = 0
    bubble.swaps = 0

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length - i; j++) {
        bubble.access++
        setMetrics({ ...metrics, bubble })
        if (copy[j] > copy[j + 1]) {
          const swapped = await swap(j, j + 1, copy)
          bubble.swaps++
          setMetrics({ ...metrics, bubble })
          setSortedData([...swapped])
        }
      }
    }
  }

  const swap = async (firstIndx, secondIndx, array) => {
    const bars = document.getElementsByClassName('bar')
    bars[firstIndx].style.backgroundColor = '#DC3545'
    bars[secondIndx].style.backgroundColor = '#DC3545'
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    await sleep(5)
    bars[firstIndx].style.backgroundColor = '#02203c'
    bars[secondIndx].style.backgroundColor = '#02203c'
    return array
  }

  const info = {
    uses: 'When sorting really small arrays where run time will be negligible no matter what algorithm you choose. When sorting arrays that you expect to already be nearly sorted. At parties!',
    time: 'n is the length of the input array. The inner for loop along contributes O(n) in isolation. The outer while loop contributes O(n) in isolation because a single iteration of the while loop will bring one element to its final resting position. In other words, it keeps running the while loop until the array is fully sorted. To fully sort the array we will need to bring all n elements into their final resting positions. Those two loops are nested so the total time complexity is O(n * n) = O(n2).',
    space: 'Bubble Sort is a constant space, O(1), algorithm. The amount of memory consumed by the algorithm does not increase relative to the size of the input array. It uses the same amount of memory and create the same amount of variables regardless of the size of the input, making this algorithm quite space efficient. The space efficiency mostly comes from the fact that it mutates the input array in-place. This is known as a destructive sort because it "destroys" the positions of the values in the array.',
  }

  return (
    <>
      <MetricBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={bubbleSort}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
      </div>
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </>
  )
}

export default BubbleSorter
