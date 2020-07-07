import styled from 'styled-components'
import { motion } from 'framer-motion'

// Nav Styles

export const NavTitle = styled.h1`
  margin: 10px;
  font-size: 1.5em;
  text-align: center;
  color: #eef0eb;
  font-weight: 700;
`
export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #02203c;
  height: 150px;
  margin: 0;
  border-bottom: 2px solid lightgrey;
  box-shadow: 0 0 3px 0 rgba(21,27,38,.15);
`

export const NavButtonCont = styled.div`
  display: flex;
  justify-content: center;
`

// Bubble Sort Styles

export const BubbleContainer = styled(motion.div)`
  margin: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`

// Selection Sort Styles

export const SelectionContainer = styled(motion.div)`
  margin: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`
