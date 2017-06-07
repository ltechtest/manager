import React, { Component } from 'react'

import './style.sass'

import { Link } from 'react-router-dom'

export class Tabs extends Component {
  render() {
    let { tabs, active, add, setActive } = this.props

    return (
      <section id="page-tabs">
        {tabs.map(item => (
          <div
            key={item}
            className={`tab ${active === item && 'active'}`}
            onClick={() => setActive(item)}
          >
            Soundcloud [{item}]
          </div>
        ))}
        <button className="add-new-tab" onClick={add}>+</button>
      </section>
    )
  }
}

export default class Header extends Component {
  constructor() {
    super()

    this.state = {
      active: 0,
      tabs: [0]
    }
  }

  setActive(active) {
    this.setState({ active })
  }

  add() {
    this.setState({
      tabs: [...this.state.tabs, this.state.tabs.length]
    })
  }

  render() {
    return (
      <header>
        <h1>Managerss {this.state.active}</h1>
        <Tabs
          add={this.add.bind(this)}
          setActive={this.setActive.bind(this)}
          {...this.state}
        />
      </header>
    )
  }
}
