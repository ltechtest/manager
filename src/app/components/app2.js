import React, { Component } from 'react'
// import './style.sass'
import { Link } from 'react-router-dom'

// import rest from 'npm-rest'

import { IndexRoute, Route } from 'react-router'

function Task({ t }) {
  return (
    <li>{t}</li>
  )
}


export default class App2 extends Component {
  constructor() {
    super()

    this.state = {
      tasks: [1, 2, 3]
    }
  }

  render() {
    return (
      <div className='container'>
        <ul>
          {this.state.tasks.map(task => <Task key={task} t={task} />)}
        </ul>
        <Link to='/'>Back</Link>
      </div>
    )
  }
}
