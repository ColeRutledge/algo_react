import React, { useContext } from 'react'
import { motion } from 'framer-motion'

import DataContext from '../contexts/DataContext'
import { Node } from '../styles'

const SortNode = ({ value }) => {
  const { dataSize } = useContext(DataContext)

  const tween = {
    type: "tween",
    damping: 500,
    stiffness: 500,
    duration: 0.1,
  }

  const divStyles = {
    backgroundColor: '#02203c',
    height: `${(value + 1) * (600 / dataSize)}px`,
    width: '100%',
    margin: '1px',
    borderRadius: '4px',
  }


//   &:hover { background-color: #032A4F !important;

  return (
    <>
      {/* <motion.div layoutTransition={tween} className='bar' style={divStyles}></motion.div> */}
      <motion.div layoutTransition={tween} className='bar' style={divStyles}></motion.div>
      {/* <Node className='bar' style={{ height: `${(value + 1) * (600 / dataSize)}px` }}></Node> */}
    </>
  )
}

export default SortNode
