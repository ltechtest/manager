const path = require('path')
const electron = require('electron')

const {
  app, Tray, Menu, BrowserWindow, ipcMain, globalShortcut
} = electron

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    title: 'test',
    height: 800,
    width: 1400,
    minHeight: 200,
    minWidth: 300,
    titleBarStyle: 'hidden',
    darkTheme: true,
    vibrancy: 'light',
    tabbingIdentifier: 'tab',
    scrollBounce: true,
    show: false,
    webPreferences: {
      experimentalFeatures: true
    }
  })

  app.commandLine.appendSwitch('force-gpu-rasterization')
  mainWindow.loadURL(`file://${__dirname}/main.html`)
  mainWindow.webContents.openDevTools()

  ipcMain.on('register-shortcut', (event, cb, cb2) => {
    console.log(event, cb, cb2)
    if (globalShortcut.isRegistered('CommandOrControl+T')) {
      return event.sender.send('register-shortcut-failed', 'registered')
    }

    let registration = globalShortcut.register('CommandOrControl+T', () => {
      console.log(cb)
      console.log('C+T', cb())
    })

    if (!registration) {
      return event.sender.send('register-shortcut-failed', registration)
    }
  })

  mainWindow.on('ready-to-show', _ => {
    mainWindow.show()
    mainWindow.focus()
  })

  const template = [
    {
      label: app.getName(),
      submenu: [{
        label: `About -> ${app.getName()}`,
        click: _ => { console.log('clicked') },
        role: 'about'
      }, {
        type: 'separator'
      }, {
        label: 'quit',
        click: _ => app.quit(),
        accelerator: 'cmd+q'
      }]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)

  let tray = new Tray(path.join('src', 'icon.png'))
  tray.setTitle('')
  tray.on('click',  function () {
    console.log(arguments)
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    tray.setTitle('+1')
  })
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
