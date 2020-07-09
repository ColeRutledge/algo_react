import styled from 'styled-components'

// Metric Widget Styles

export const MetricBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8A91991A;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 0 3px 0 rgba(21,27,38,.15);
`

export const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  width: 200px;
  height: 75px;
  padding: 0 10px 0 0;
  margin: 0 10px;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
`

// Nav Styles

export const NavTitle = styled.h1`
  margin: 10px;
  font-size: 1.5em;
  color: #BAE67E;
  font-weight: 700;
`
export const NavContainer = styled.div`
  display: grid;
  grid-template-columns: .75fr 3fr .75fr;
  align-items: center;
  justify-items: center;
  background-color: #02203c;
  height: 100px;
  margin: 0;
  border-bottom: 2px solid lightgrey;
  box-shadow: 0 0 3px 0 rgba(21,27,38,.15);
`

export const NavButtonCont = styled.div`
  display: flex;
  justify-content: center;
`

// Footer Styles

export const FooterContainer = styled.div`
  box-shadow: 3px 0 0 0 rgba(21,27,38,.15);
  border-top: 2px solid lightgrey;
  background-color: #02203c;
  height: 100px;
  position: fixed;
  width: 100%;
  bottom: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

// Bubble Sort Styles

export const BubbleContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`

// Selection Sort Styles

export const SelectionContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`

// Insertion Sort Styles

export const InsertionContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`
// Quick Sort Styles

export const QuickContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`
// Merge Sort Styles

export const MergeContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 600px;
  border-radius: 4px;
  overflow: hidden;
`
