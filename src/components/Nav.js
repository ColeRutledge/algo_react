import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NavTitle, NavContainer, NavButtonCont } from '../styles'

import DataContext from '../contexts/DataContext'

const Nav = () => {
  const { createData } = useContext(DataContext)

  return (
    <NavContainer>
      <NavTitle>Algo-React</NavTitle>
      <NavButtonCont>
        <Link to='/'>
          <button type='button'>Home</button>
        </Link>
        <Link to='/bubble'>
          <button type='button'>Bubble Sort</button>
        </Link>
        <button onClick={createData}>New Array</button>
      </NavButtonCont>
    </NavContainer>
  )
}

export default Nav
