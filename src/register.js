const electron = require('electron')
const path = require('path')
const url = require('url')
const {BrowserWindow,ipcMain,app} = electron

let registerWindow = null;

const register = ()=> {

    let url = 'http://www.jiaoyukou.com/pub/register'

    registerWindow = new BrowserWindow({
        width: 1123,
        height: 740,
        nodeIntegrationInWorker:true,
        frame: true,
        center: true,
    })
    registerWindow.setMenuBarVisibility(false);
    registerWindow.loadURL(url)
    registerWindow.on('closed', function () {
        registerWindow = null
    })
}

//新用户注册
ipcMain.on('user-register', (event, arg) => {
    if(!registerWindow){
        register()
    }
    else {
        registerWindow.restore && registerWindow.restore()
    }
})

module.exports = register;