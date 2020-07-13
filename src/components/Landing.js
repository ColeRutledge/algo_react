import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'


const Landing = () => {
  const [ redirect, setRedirect ] = useState(false)

  const sleep = async ms => await new Promise(resolve => setTimeout(resolve, ms))

  useEffect(() => {
    const redirect = async () => {
      await sleep(2000)
      setRedirect(true)
    }

    redirect()
  }, [redirect])

  const styles = {
    fontSize: '50px',
    fontWeight: 'bold',
  }


  return (
    <div style={{ color: '#02203c', display: 'flex', justifyContent: 'center', position: 'relative', top: '125px' }}>
      <motion.div
        style={styles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className='welcome'
      >Welcome!
      </motion.div>
      {redirect && <Redirect to='/bubble' />}
    </div>
  )
}

export default Landing
