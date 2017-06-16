import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './header'
import AppContent from './app-content'
import './fonts.sass'

class App extends Component {
  render() {
    if (this.props.app.appState === 'LOADING') {
      return <noscript>Loading</noscript>
    }

    if (this.props.app.appState === 'ERROR') {
      return <noscript>{this.props.appError}</noscript>
    }

    return (
      <AppContent />
    )
  }
}

export default connect(store => store)(App)
