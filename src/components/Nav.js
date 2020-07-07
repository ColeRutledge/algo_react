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
          <button className='btn btn-danger' type='button'>Home</button>
        </Link>
        <Link to='/bubble'>
          <button className='btn btn-danger' type='button'>Bubble Sort</button>
        </Link>
        <Link to='/selection'>
          <button className='btn btn-danger' type='button'>Selection Sort</button>
        </Link>
        <Link to='/insertion'>
          <button className='btn btn-danger' type='button'>Insertion Sort</button>
        </Link>
        <Link to='/quick'>
          <button className='btn btn-danger' type='button'>Quick Sort</button>
        </Link>
        <Link to='/merge'>
          <button className='btn btn-danger' type='button'>Merge Sort</button>
        </Link>
        <button className='btn btn-danger' onClick={createData}>New Array</button>
      </NavButtonCont>
    </NavContainer>
  )
}

export default Nav
