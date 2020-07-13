import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Landing from './Landing'
import BubbleSorter from './BubbleSorter'
import SelectionSorter from './SelectionSorter'
import InsertionSorter from './InsertionSorter'
import QuickSorter from './QuickSorter'
import MergeSorter from './MergeSorter'
import Footer from './Footer'
import MetricBar from './MetricBar'

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <MetricBar />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/bubble' render={() => <BubbleSorter />} />
        <Route path='/selection' render={() => <SelectionSorter />} />
        <Route path='/insertion' render={() => <InsertionSorter />} />
        <Route path='/quick' render={() => <QuickSorter />} />
        <Route path='/merge' render={() => <MergeSorter />} />
      </Switch>
      <Footer />
      <div className='spacer' />
    </BrowserRouter>
  )
}


export default Routes
