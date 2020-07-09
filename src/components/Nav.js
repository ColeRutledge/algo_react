import React from 'react'
import { Link } from 'react-router-dom'
import { NavTitle, NavContainer, NavButtonCont } from '../styles'

const Nav = () => {

  return (
    <>
      <NavContainer>
      <NavTitle>Algo-React</NavTitle>
        <NavButtonCont>
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
        </NavButtonCont>
      </NavContainer>
    </>
  )
}

export default Nav
