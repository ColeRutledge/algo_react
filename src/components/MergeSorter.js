import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import MetricBar from './MetricBar'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'

const MergeSorter = () => {
  const { data, createData, metrics, setMetrics } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  let copy, animations
  const mergeStats = {...metrics.merge}
  const bars = document.getElementsByClassName('bar')

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const mergeHelper = async () => {
    copy = data.slice()
    animations = data.slice()
    mergeStats.access = 0
    mergeStats.swaps = 0
    await mergeSort(copy)
  }

  const mergeSort = async (array) => {

    if (array.length <= 1) return array

    let midIdx = Math.floor(array.length / 2)

    let left = array.slice(0, midIdx)
    for (let i = 0; i < left.length; i++) {
      mergeStats.access++
      // setMetrics({ ...metrics, merge: mergeStats })
    }

    let right = array.slice(midIdx)
    for (let i = 0; i < right.length; i++) {
      mergeStats.access++
      // setMetrics({ ...metrics, merge: mergeStats })
    }

    let sortLeft = await mergeSort(left)
    let sortRight = await mergeSort(right)

    return await merge(sortLeft, sortRight)
  }

  const merge = async (array1, array2) => {
    let merged = []
    let start = animations.indexOf(array1[0])

    while (array1.length || array2.length) {
      let ele1 = array1.length ? array1[0] : Infinity
      let ele2 = array2.length ? array2[0] : Infinity

      let next, firstBar, secondBar
      if (ele1 !== Infinity) {
        mergeStats.access++
        firstBar = bars[copy.indexOf(ele1)]
      }
      if (ele2 !== Infinity) {
        mergeStats.access++
        secondBar = bars[copy.indexOf(ele2)]
      }

      setMetrics({ ...metrics, merge: mergeStats })

      if (ele1 < ele2) {
        firstBar.style.backgroundColor = '#DC3545'
        if (ele2 !== Infinity) secondBar.style.backgroundColor = '#DC3545'
        await sleep(5)
        next = array1.shift()
        firstBar.style.backgroundColor = '#02203c'
        if (ele2 !== Infinity) secondBar.style.backgroundColor = '#02203c'
      } else {
        if (ele1 !== Infinity) firstBar.style.backgroundColor = '#DC3545'
        secondBar.style.backgroundColor = '#DC3545'
        await sleep(5)
        next = array2.shift()
        if (ele1 !== Infinity) firstBar.style.backgroundColor = '#02203c'
        secondBar.style.backgroundColor = '#02203c'
      }

      merged.push(next)
    }

    for (let i = 0; i < merged.length; i++) {
      let originIdx = animations.indexOf(merged[i])
      let newIdx = start
      if (originIdx !== newIdx) {
        mergeStats.swaps++
        setMetrics({ ...metrics, merge: mergeStats })
      }

      bars[start].style.backgroundColor = '#DC3545'
      animations[start++] = merged[i]
      await sleep(20)
      bars[start - 1].style.backgroundColor = '#02203c'
      setSortedData([...animations])
    }

    setMetrics({ ...metrics, merge: mergeStats })
    return merged
  }

  const info = {
    uses: 'Unless we, the engineers, have access in advance to some unique, exploitable insight about our dataset, it turns out that O(n log n) time is the best we can do when sorting unknown datasets. If you have unlimited memory available, use it, it\'s fast! If you have a decent amount of memory available and a medium sized dataset, run some tests first, but use it!',
    time: 'n is the length of the input array. We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. Since we split in half each time, the number of recursive calls is O(log(n)). Besides the recursive calls, we must consider the while loop within the merge function, which contributes O(n) in isolation. We call merge in every recursive mergeSort call, so the total complexity is O(n * log(n)).',
    space: 'Merge Sort is the first non-O(1) space sorting algorithm we\'ve seen thus far. The larger the size of our input array, the greater the number of subarrays we must create in memory. These are not free! They each take up finite space, and we will need a new subarray for each element in the original input. Therefore, Merge Sort has a linear space complexity, O(n).',
  }

  return (
    <>
      <MetricBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={mergeHelper}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
      </div>
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </>
  )
}

export default MergeSorter
