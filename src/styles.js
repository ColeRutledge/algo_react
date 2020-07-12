import styled from 'styled-components'
import { motion } from 'framer-motion'

// Metric Bar Styles

export const MetricWidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MetricBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 0 3px 0 rgba(21,27,38,.15);
  background-color: #8A91991A;
`


export const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #02203c;
  justify-content: center;
  width: 200px;
  height: 75px;
  padding: 0 10px 0 0;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
`

// Control Widget Styles

export const ControlSlider = styled.form`

`

// Nav Styles

export const NavTitle = styled.h1`
  margin: 10px;
  font-size: 36px;
  color: #f6f9fc;
  font-weight: 700;
`
export const NavContainer = styled.div`
  display: grid;
  grid-template-columns: .75fr 3fr .75fr;
  align-items: center;
  justify-items: center;
  background-color: #02203c;
  height: 120px;
  border-bottom: 2px solid lightgrey;
  box-shadow: 0 0 3px 0 rgba(21,27,38,.15);
`

export const NavButtonCont = styled.div`
  display: flex;
  justify-content: space-around;
  color: #BAE67E;
`

// Algo Info Styles

export const AlgoInfoCont = styled.div`
  display: grid;
  grid-template-columns: 2fr .5fr 2fr .5fr 2fr;
  justify-items: center;
  font-size: 16px;
  margin: 50px 100px;
  padding: 10px;
`

// Footer Styles

export const FooterContainer = styled.div`
  box-shadow: 3px 0 0 0 rgba(21,27,38,.15);
  border-top: 2px solid lightgrey;
  background-color: #02203c;
  height: 125px;
  position: fixed;
  width: 100%;
  bottom: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

// Sort Container Styles

export const SortContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`

// Sort Node Styles

export const Node = styled(motion.div)`
  background-color: #02203c;
  width: 100%;
  margin: 1px;
  border-radius: 4px;

  &:hover { background-color: #032A4F !important; }
`
