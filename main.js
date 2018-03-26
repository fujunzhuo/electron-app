const electron = require('electron')
const path = require('path')
const url = require('url')
const {BrowserWindow,ipcMain,app,Menu,Tray} = electron
const register = require('./src/register')
let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
      width: 430,
      height: 527,
      // maxWidth:430,
      // maxHeight:492,
      nodeIntegrationInWorker:true,
      frame: false,
      center: true,
      hasShadow:false,
      thickFrame:false
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/login.html'),
    protocol: 'file:',
    slashes: true
  }))


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

const removeTray = ()=> {
    app.quit()
    if (appIcon) appIcon.destroy()
}

const trayMenu = [
    {
        label: '显示',
        click: () => {
            if(mainWindow.isMinimized()){
                mainWindow.restore()
            }
        }
    },
    {
        label: '退出',
        click: () => removeTray()
    }
]


const putInTray = ()=> {
    const iconPath = path.join(__dirname, 'app/img/favicon.png')
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate(trayMenu)
    appIcon.setToolTip('教育口-让教与学更简单 让家校联系更紧密')
    appIcon.setContextMenu(contextMenu)
}


const init = ()=> {
    putInTray()
    createWindow()
}


app.on('ready', init)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    init()
  }
})

//app退出
ipcMain.on('close-window', (event, arg) => {
    mainWindow = null
    app.quit()
})

//app最小化
ipcMain.on('minimize-window', (event, arg) => {
    mainWindow.minimize();
})
