import React, { useContext, useState, useEffect } from 'react'

import DataContext from '../contexts/DataContext'
import SortNode from './SortNode'
import { BubbleContainer } from '../styles'


const BubbleSorter = () => {
  const { data } = useContext(DataContext)
  const [ sortedData, setSortedData ] = useState([])


  useEffect(() => setSortedData(data), [data])

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const bubbleSort = async () => {
    const copy = data.slice()

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length - i; j++) {
        if (copy[j] > copy[j + 1]) {
          // setSortedData(swap(j, j + 1, copy))
          const copyArray = await swap(j, j + 1, copy)
          setSortedData([...copyArray])
          console.log(sortedData)
          // await swap(j, j + 1, copy)
          // await swap(j, j + 1, copy)
        }
      }
    }


    bubbleAnimation(data, sortedData)

  }

  const swap = async (firstIndx, secondIndx, array) => {
    await sleep(25)
    let temp = array[firstIndx]
    array[firstIndx] = array[secondIndx]
    array[secondIndx] = temp
    return array
  }

  const bubbleAnimation = (data, sortedData) => {
    // console.log(data)
    // console.log(sortedData)
    return
  }


  if (!sortedData.length) return null

  return (
    <>
      <button onClick={bubbleSort}>Sort!</button>
      <BubbleContainer>
        {sortedData.map((value, index) => <SortNode key={index} value={value} />)}
      </BubbleContainer>
    </>
  )
}



export default BubbleSorter

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
