import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { ipcRenderer, remote } from 'electron'

import { Link } from 'react-router-dom'

import './style.sass'

function OpenNewTab({ tabs, openNewTab }) {
  let lastTab = tabs[tabs.length - 1]

  if (!!lastTab && lastTab.instanceId === null) {
    return <noscript></noscript>
  }

  return <button className="add-new-tab" onClick={openNewTab}>+</button>
}

function getConfirmResults() {
  return remote.dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
        type: 'question',
        buttons: ['Cancel', 'No', 'Yes'],
        defaultId: 0,
        cancelId: 0,
        detail: 'Some processes are not finished. Some data could be lost.',
        title: 'Confirm',
        message: 'Do you want to save changes?'
    }
  );
}

function askBeforeClose(event, props, closeFunction) {
  let { item, saveInstanceChanges } = props

  event.stopPropagation()

  if (item.hasUnsavedChanges === true) {
    let confirmCode = getConfirmResults()

    if (confirmCode === 1) {
      closeFunction()
    }

    if (confirmCode === 2) {
      saveInstanceChanges(item)
      closeFunction()
    }

  } else closeFunction()
}

function CloseTab(props) {
  let { index, tabs, tabFocus, closeTab } = props

  if (tabFocus === 0 && tabs.length === 1) {
    return <noscript></noscript>
  }

  return (
    <div
      className={`close-tab-wrapper ${tabFocus === index && 'active'}`}
      title="Close tab"
      onClick={e => askBeforeClose(e, props, _ => closeTab(index))}
    >
      <div className="close-icon">×</div>
    </div>
  )
}

function Tabs(props) {
  let { tabs, tabFocus, setFocus, closeTab } = props

  return (
    <section id="page-tabs">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={`tab ${tabFocus === index && 'active'}`}
          onClick={() => setFocus(index)}
          title={item.title}
        >
          <CloseTab item={item} index={index} {...props}/>
          {item.title}
        </div>
      ))}
      <OpenNewTab {...props}/>
    </section>
  )
}

class Header extends Component {
  componentDidMount() {
    ipcRenderer.send('register-shortcut', 'CommandOrControl+T', 'openNewTab')
    ipcRenderer.on('trigger-shortcut:openNewTab', this.props.openNewTab)

    ipcRenderer.send('register-shortcut', 'CommandOrControl+W', 'closeCurrentTab')
    ipcRenderer.on('trigger-shortcut:closeCurrentTab', this.props.closeCurrentTab)
  }

  render() {
    if (this.props.app.appState === 'LOADING') {
      return <noscript>Loading</noscript>
    }

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

function mapStateToProps({ tabs, app }) {
  return {
    ...tabs,
    app
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

    saveInstanceChanges(item) {
      dispatch({
        type: 'SAVE_CHANGES'
      })
    },

    openNewTab() {
      dispatch({
        type: 'OPEN_NEW_TAB'
      })
      dispatch(push('/'))
    },

    closeCurrentTab() {
      dispatch({
        type: 'CLOSE_CURRENT_TAB'
      })
    },

    closeTab(value) {
      dispatch({
        type: 'CLOSE_TAB',
        value
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
