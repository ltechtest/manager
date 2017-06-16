import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './header'
import AppContent from './app-content'
import './fonts.sass'

class App extends Component {
  render() {
    console.log(this.props)

    if (this.props.appState === 'LOADING') {
      return <noscript>Loading</noscript>
    }

    if (this.props.appState === 'ERROR') {
      return <noscript>{this.props.appError}</noscript>
    }

    return (
      <div className='container'>
        <Header />
        <AppContent />
      </div>
    )
  }
}

export default connect(store => store)(App)
