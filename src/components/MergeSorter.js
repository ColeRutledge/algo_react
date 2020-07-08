import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { MergeContainer } from '../styles'

const MergeSorter = () => {
  const { data, createData } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])
  const bars = document.getElementsByClassName('bar')
  let animations, copy

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const mergeHelper = async () => {
    copy = data.slice()
    animations = data.slice()
    await mergeSort(copy)
  }

  const mergeSort = async (array) => {
    if (array.length <= 1) return array

    let midIdx = Math.floor(array.length / 2)
    let left = array.slice(0, midIdx)
    let right = array.slice(midIdx)

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
      if (ele1 !== Infinity) firstBar = bars[copy.indexOf(ele1)]
      if (ele2 !== Infinity) secondBar = bars[copy.indexOf(ele2)]

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
      bars[start].style.backgroundColor = '#DC3545'
      animations[start++] = merged[i]
      await sleep(20)
      bars[start - 1].style.backgroundColor = '#02203c'
      setSortedData([...animations])
    }

    return merged
  }

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#8A91991A',
    borderBottom: '1px solid lightgrey',
    boxShadow: '0 0 3px 0 rgba(21,27,38,.15)',
  }

  return (
    <>
      <div style={styles}>
        {sortedData.length > 0 && <button className='btn btn-danger' onClick={mergeHelper}>Sort!</button>}
        <button className='btn btn-danger' onClick={createData}>New Array</button>
      </div>
      <MergeContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </MergeContainer>
    </>
  )
}

export default MergeSorter
