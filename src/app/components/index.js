import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './header'
import AppContent from './app-content'
import './fonts.sass'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <AppContent />
      </div>
    )
  }
}

export default connect(store => store)(App)
