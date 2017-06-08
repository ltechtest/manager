import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './header'
import './fonts.sass'

class App extends Component {
  render() {
    let { incrementActive, active } = this.props

    console.log(active)

    return (
      <div className='container'>
        <Header />
        <div className="app-content">
          test
        </div>
      </div>
    )
  }
}

export default connect()(App)
