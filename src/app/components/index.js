import React, { Component } from 'react'
import './style.sass'
import { Link } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>testing</h1>
        <Link to='/test'>test link</Link>
      </div>
    )
  }
}
