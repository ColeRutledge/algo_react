import React, { useState, useContext, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { MergeContainer } from '../styles'

const MergeSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  useEffect(() => setSortedData(data), [data])

  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const mergeSort = () => {

  }

  if (!sortedData.length) return null

  return (
    <>
      <button className='btn btn-danger' onClick={mergeSort}>Sort!</button>
      <MergeContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </MergeContainer>
    </>
  )
}

export default MergeSorter
