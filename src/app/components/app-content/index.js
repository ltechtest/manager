import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ipcRenderer, remote } from 'electron'

import { Link } from 'react-router-dom'

import './style.sass'

class NewTab extends Component {
  render() {
    let { currentTab, chooseInstanceForTheTab } = this.props

    if (!currentTab || currentTab.instanceId !== null) {
      return <noscript/>
    }

    return (
      <div>
        <a onClick={() => chooseInstanceForTheTab('sc')}>SC</a>
        <a onClick={() => chooseInstanceForTheTab('insta')}>insta</a>
      </div>
    )
  }
}

class TabView extends Component {
  render() {
    let { tabs, tabFocus, chooseInstanceForTheTab } = this.props.tabs
    let currentTab = tabs[tabFocus]

    if (!currentTab || currentTab.instanceId === null) {
      return <NewTab currentTab={currentTab} {...this.props}/>
    }

    return (
      <div>Showing the tab: {currentTab.title}</div>
    )
  }
}

const TabContent = connect(store => store, mapDispatchToTabsProps)(TabView)

class AppContent extends Component {
  render() {
    return (
      <div className="app-content">
        <TabContent />
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
    chooseInstanceForTheTab(value) {
      dispatch({
        type: 'CREATE_NEW_INSTANCE',
        value
      })
    }
  }
}

export default connect(mapStateToProps)(AppContent)
