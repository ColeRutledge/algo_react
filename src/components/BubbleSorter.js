import React, { useContext, useState, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { BubbleContainer } from '../styles'


const BubbleSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])

  useEffect(() => setSortedData(data), [data])

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const copy = data.slice()

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length - i; j++) {
        if (copy[j] > copy[j + 1]) {
          const swapped = await swap(j, j + 1, copy)
          setSortedData([...swapped])
          // await sleep(20)
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


  if (!sortedData.length) return null

  return (
    <>
      <button className='btn btn-danger' onClick={bubbleSort}>Sort!</button>
      <BubbleContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </BubbleContainer>
    </>
  )
}

export default BubbleSorter

// {sortedData.map((value, index) => <motion.div key={index} value={value} positionTransition className='bar' style={{borderRadius: '5px', margin: '2px', width: '100%', height: `${value}px`, backgroundColor: '#02203c'}} ></motion.div>)}

  // useEffect(() => {
  //   const timer = setTimeout(printTimer, 500)
  //   return () => clearTimeout(timer)
  // }, [sortedData])

  // const printTimer = () => {
  //   console.log('swap!!')
  // }


// const bars = document.getElementsByClassName('bar')
// setSortedData(copy)

// const jInterval = 50
// const iInterval = jInterval * 50

// for (let i = 0; i < copy.length - 1; i++) {
//   setTimeout(() => {
//     bars[i].style.backgroundColor = 'grey'
//     for (let j = i + 1; j < copy.length; j++) {
//       setTimeout(() => {
//         bars[j].style.backgroundColor = '#C6FEDF'
//         if (copy[j] > copy[j + 1]) {
//             swap(j, j + 1, copy)
//           }

//         bars[j].style.backgroundColor = '#5CCFE6'
//         }, (j + 1) * jInterval)
//       }
//   }, (i + 1) * iInterval)
// }


// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
