import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Landing from './Landing'
import BubbleSorter from './BubbleSorter'
import SelectionSorter from './SelectionSorter'

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/bubble' render={() => <BubbleSorter />} />
        <Route path='/selection' render={() => <SelectionSorter />} />
      </Switch>
    </BrowserRouter>
  )
}


export default Routes
