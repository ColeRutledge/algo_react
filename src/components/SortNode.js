import React from 'react'
import { motion } from 'framer-motion'

const spring = {
  type: "spring",
  damping: 500,
  stiffness: 500,
  duration: 0.1,
}

const SortNode = ({ value }) => {

  const divStyles = {
    backgroundColor: '#02203c',
    height: `${value}px`,
    width: '100%',
    margin: '2px',
    borderRadius: '5px',
  }

  return (
    <>
      <motion.div layoutTransition={spring} className='bar' style={divStyles}></motion.div>
    </>
  )
}

export default SortNode


// const variants = {
//   active: {
//       backgroundColor: "#f00"
//   },
//   inactive: {
//     backgroundColor: "#fff",
//     transition: { duration: 2 }
//   }
// }

// <motion.div variants={variants} animate="active" />
