import React, { Component } from 'react'

import './fonts.sass'

import Header from './header'

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <Header />
      </div>
    )
  }
}
