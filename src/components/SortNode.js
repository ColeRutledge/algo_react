import React, { useContext } from 'react'
// import { motion } from 'framer-motion'

import DataContext from '../contexts/DataContext'
import { Node } from '../styles'

const SortNode = ({ value }) => {
  const { dataSize } = useContext(DataContext)

  // const tween = {
  //   type: "tween",
  //   damping: 500,
  //   stiffness: 500,
  //   duration: 0.1,
  // }

  return (
    <>
      {/* <motion.div layoutTransition={tween} className='bar' style={divStyles}></motion.div> */}
      <Node className='bar' style={{ height: `${(value + 1) * (600 / dataSize)}px` }}></Node>
    </>
  )
}

export default SortNode
