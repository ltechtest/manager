import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { ipcRenderer, remote } from 'electron'

import { Link } from 'react-router-dom'

import './style.sass'

class Settings extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="app-content">
        Settings page
      </div>
    )
  }
}

function mapStateToProps({ tabs }) {
  return {
    ...tabs
  }
}

function mapDispatchToTabsProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps)(Settings)
