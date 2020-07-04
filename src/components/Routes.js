import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Landing from './Landing'
import BubbleSorter from './BubbleSorter'

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/bubble' render={() => <BubbleSorter />} />
      </Switch>
    </BrowserRouter>
  )
}


export default Routes
