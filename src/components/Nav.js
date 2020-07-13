import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavTitle, NavContainer, NavButtonCont } from '../styles'

const Nav = () => {

  const styles = {
    margin: '20px',
    // fontWeight: '400',
    fontSize: '18px',
    paddingBottom: '4px',
    paddingRight: '0',
    paddingLeft: '0',
  }

  return (
    <>
      <NavContainer>
      <NavTitle>AlgoReact</NavTitle>
        <NavButtonCont>
          <NavLink activeClassName="navbar--active" style={styles} to='/bubble'>Bubble Sort</NavLink>
          <NavLink activeClassName="navbar--active" style={styles} to='/selection'>Selection Sort</NavLink>
          <NavLink activeClassName="navbar--active" style={styles} to='/insertion'>Insertion Sort</NavLink>
          <NavLink activeClassName="navbar--active" style={styles} to='/quick'>Quick Sort</NavLink>
          <NavLink activeClassName="navbar--active" style={styles} to='/merge'>Merge Sort</NavLink>
        </NavButtonCont>
      </NavContainer>
    </>
  )
}

export default Nav
