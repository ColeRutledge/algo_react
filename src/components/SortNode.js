import React from 'react'
import { motion } from 'framer-motion'

const SortNode = ({ value }) => {

  const divStyles = {
    backgroundColor: '#02203c',
    height: `${(value + 1) * 6}px`,
    width: '100%',
    margin: '1px',
    borderRadius: '5px',
  }

  const tween = {
    type: "tween",
    damping: 500,
    stiffness: 500,
    duration: 0.1,
  }

  return (
    <>
      <motion.div layoutTransition={tween} className='bar' style={divStyles}></motion.div>
      {/* <div className='bar' style={divStyles}></div> */}
    </>
  )
}

export default SortNode
