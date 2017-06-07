const electron = require('electron')
const path = require('path')
const { app, Tray, Menu, BrowserWindow } = electron

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
    show: false
  })

  mainWindow.loadURL(`file://${__dirname}/main.html`)
  // mainWindow.webContents.openDevTools()

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
