import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ipcRenderer, remote } from 'electron'

import { Link } from 'react-router-dom'

import './style.sass'

class Tabs extends Component {
  render() {
    let { tabs, tabFocus, openNewTab, setFocus } = this.props

    return (
      <section id="page-tabs">
        {tabs.map((item, index) => (
          <div
            key={index}
            className={`tab ${tabFocus === index && 'active'}`}
            onClick={() => setFocus(index)}
            title={item.title}
          >
            {item.title}
          </div>
        ))}
        <button className="add-new-tab" onClick={openNewTab}>+</button>
      </section>
    )
  }
}

class Header extends Component {
  componentDidMount() {
    ipcRenderer.send('register-shortcut', 'CommandOrControl+T', 'openNewTab')
    ipcRenderer.on('trigger-shortcut:openNewTab', this.props.openNewTab)
  }

  render() {
    return (
      <header>
        <h1>Manager {this.props.tabFocus}</h1>
        <Tabs
          {...this.props}
        />
      </header>
    )
  }
}

function mapStateToProps({ tabs }) {
  return {
    ...tabs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFocus(value) {
      dispatch({
        type: 'SET_FOCUS',
        value
      })
    },

    openNewTab() {
      dispatch({
        type: 'OPEN_NEW_TAB'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
