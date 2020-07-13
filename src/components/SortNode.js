import React, { useContext } from 'react'

import DataContext from '../contexts/DataContext'
import { Node } from '../styles'

const SortNode = ({ value }) => {
  const { dataSize, animationsOn } = useContext(DataContext)

  const tween = {
    type: "tween",
    damping: 500,
    stiffness: 500,
    duration: 0.1,
  }

  return (
    <>
      {animationsOn
      ? <Node layoutTransition={tween} className='bar' style={{ height: `${(value + 1) * (600 / dataSize)}px` }}></Node>
      : <Node className='bar' style={{ height: `${(value + 1) * (600 / dataSize)}px` }}></Node>
      }
    </>
  )
}

export default SortNode
