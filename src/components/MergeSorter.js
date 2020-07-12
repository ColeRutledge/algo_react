import React, { useState, useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import DataContext from '../contexts/DataContext'
import ControlWidget from './ControlWidget'
import AlgoInfo from './AlgoInfo'
import SortNode from './SortNode'
import { SortContainer } from '../styles'

const MergeSorter = () => {
  const { data, metrics, setMetrics, isRunning, setIsRunning } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const refContainer = useRef(isRunning)
  const history = useHistory()

  let copy, animations
  const mergeStats = {...metrics.merge}
  const bars = document.getElementsByClassName('bar')

  useEffect(() => setSortedData(data), [data])
  useEffect(() => {
    refContainer.current = isRunning
  }, [isRunning])

  useEffect(() => {
    return history.listen(() => {
      if (isRunning) setMetrics({ ...metrics, merge: { access: 0, swaps: 0 } })
      refContainer.current = false
      setIsRunning(false)
    })
  }, [history, setIsRunning, isRunning, metrics, setMetrics])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const mergeHelper = async () => {
    setIsRunning(true)
    await sleep(5)
    copy = data.slice()
    animations = data.slice()
    mergeStats.access = 0
    mergeStats.swaps = 0
    await mergeSort(copy)
    refContainer.current = false
    setIsRunning(false)
  }

  const mergeSort = async (array) => {
    if (!refContainer.current) return
    if (array.length <= 1) return array

    let midIdx = Math.floor(array.length / 2)

    let left = array.slice(0, midIdx)
    for (let i = 0; i < left.length; i++) {
      mergeStats.access++
    }

    let right = array.slice(midIdx)
    for (let i = 0; i < right.length; i++) {
      mergeStats.access++
    }

    let sortLeft = await mergeSort(left)
    if (!refContainer.current) return
    let sortRight = await mergeSort(right)
    if (!refContainer.current) return

    return await merge(sortLeft, sortRight)
  }

  const merge = async (array1, array2) => {
    let merged = []
    let start = animations.indexOf(array1[0])

    while (array1.length || array2.length) {
      let ele1 = array1.length ? array1[0] : Infinity
      let ele2 = array2.length ? array2[0] : Infinity
      if (!refContainer.current) return

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
        if (!refContainer.current) return
        firstBar.style.backgroundColor = '#DC3545'
        if (ele2 !== Infinity) secondBar.style.backgroundColor = '#DC3545'
        await sleep(5)
        next = array1.shift()
        firstBar.style.backgroundColor = '#02203c'
        if (ele2 !== Infinity) secondBar.style.backgroundColor = '#02203c'
      } else {
        if (!refContainer.current) return
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
      if (!refContainer.current) return
      let originIdx = animations.indexOf(merged[i])
      let newIdx = start
      if (originIdx !== newIdx) {
        mergeStats.swaps++
        setMetrics({ ...metrics, merge: mergeStats })
      }

      bars[start].style.backgroundColor = '#DC3545'
      animations[start++] = merged[i]
      await sleep(20)
      if (!refContainer.current) return
      bars[start - 1].style.backgroundColor = '#02203c'
      setSortedData([...animations])
    }

    // if (!refContainer.current) return []
    setMetrics({ ...metrics, merge: mergeStats })
    return merged
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ControlWidget algo={mergeHelper} />
      <SortContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </SortContainer>
      <AlgoInfo info={info} />
    </motion.div>
  )
}

export default MergeSorter


const info = {
  uses: 'Unless we, the engineers, have access in advance to some unique, exploitable insight about our dataset, it turns out that O(n log n) time is the best we can do when sorting unknown datasets. If you have unlimited memory available, use it, it\'s fast! If you have a decent amount of memory available and a medium sized dataset, run some tests first, but use it!',
  time: 'n is the length of the input array. We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. Since we split in half each time, the number of recursive calls is O(log(n)). Besides the recursive calls, we must consider the while loop within the merge function, which contributes O(n) in isolation. We call merge in every recursive mergeSort call, so the total complexity is O(n * log(n)).',
  space: 'Merge Sort is the first non-O(1) space sorting algorithm we\'ve seen thus far. The larger the size of our input array, the greater the number of subarrays we must create in memory. These are not free! They each take up finite space, and we will need a new subarray for each element in the original input. Therefore, Merge Sort has a linear space complexity, O(n).',
}
