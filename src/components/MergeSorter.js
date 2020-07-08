import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { MergeContainer } from '../styles'

const MergeSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const bars = document.getElementsByClassName('bar')
  let animations

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const mergeHelper = async () => {
    const copy = data.slice()
    animations = copy
    await mergeSort(copy)
  }

  const mergeSort = async (array) => {
    if (array.length <= 1) return array

    let midIdx = Math.floor(array.length / 2)
    let left = array.slice(0, midIdx)
    let right = array.slice(midIdx)

    let sortLeft = await mergeSort(left)
    let sortRight = await mergeSort(right)
    // Promise.all([mergeSort(left), mergeSort(right)])

    return await merge(sortLeft, sortRight)
  }

  const merge = async (array1, array2) => {
    let merged = []
    const copy = sortedData.slice()
    let start = animations.indexOf(array1[0])

    while (array1.length || array2.length) {
      let ele1 = array1.length ? array1[0] : Infinity
      let ele2 = array2.length ? array2[0] : Infinity

      let next, firstIndx, secondIndx
      if (ele1 !== Infinity) firstIndx = copy.indexOf(ele1)
      if (ele2 !== Infinity) secondIndx = copy.indexOf(ele2)

      if (ele1 < ele2) {
        bars[firstIndx].style.backgroundColor = '#DC3545'
        if (ele2 !== Infinity) bars[secondIndx].style.backgroundColor = '#DC3545'
        await sleep(5)
        next = array1.shift()
        bars[firstIndx].style.backgroundColor = '#02203c'
        if (ele2 !== Infinity) bars[secondIndx].style.backgroundColor = '#02203c'
      } else {
        if (ele1 !== Infinity) bars[firstIndx].style.backgroundColor = '#DC3545'
        bars[secondIndx].style.backgroundColor = '#DC3545'
        await sleep(5)
        next = array2.shift()
        if (ele1 !== Infinity) bars[firstIndx].style.backgroundColor = '#02203c'
        bars[secondIndx].style.backgroundColor = '#02203c'
      }

      merged.push(next)
    }

    for (let i = 0; i < merged.length; i++) {
      bars[start].style.backgroundColor = '#DC3545'
      animations[start++] = merged[i]
      await sleep(15)
      bars[start - 1].style.backgroundColor = '#02203c'
      setSortedData([...animations])
    }

    return merged
  }

  if (!sortedData.length) return null

  return (
    <>
      <button className='btn btn-danger' onClick={mergeHelper}>Sort!</button>
      <MergeContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </MergeContainer>
    </>
  )
}

export default MergeSorter


// if (ele1 < ele2) {
//   bars[firstIndx].style.backgroundColor = '#DC3545'
//   if (ele2 !== Infinity) {
//     bars[secondIndx].style.backgroundColor = '#DC3545'
//     const swapped = swap(firstIndx, secondIndx, copy)
//     setSortedData([...swapped])
//   }
//   await sleep(25)
//   next = array1.shift()
//   bars[firstIndx].style.backgroundColor = '#02203c'
//   if (ele2 !== Infinity) bars[secondIndx].style.backgroundColor = '#02203c'

// } else {
//   if (ele1 !== Infinity) {
//     bars[firstIndx].style.backgroundColor = '#DC3545'
//     const swapped = swap(firstIndx, secondIndx, copy)
//     setSortedData([...swapped])
//   }
//   bars[secondIndx].style.backgroundColor = '#DC3545'
//   await sleep(25)
//   next = array2.shift()
//   if (ele1 !== Infinity) bars[firstIndx].style.backgroundColor = '#02203c'
//   bars[secondIndx].style.backgroundColor = '#02203c'
// }
