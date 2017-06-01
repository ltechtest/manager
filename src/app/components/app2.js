import React, { Component } from 'react'
import './style.sass'
import { Link } from 'react-router-dom'

import { IndexRoute, Route } from 'react-router'

function Test() {
  return (
    <Link to='/'><h2>I AM HERE <input/></h2></Link>
  )
}


export default class App2 extends Component {
  render() {
    return (
      <div className='container'>
        <h1>testing2222</h1>
        <Link to='/test/test2'>test link2</Link>
        <Route path="/test/test2" component={Test}/>
      </div>
    )
  }
}
