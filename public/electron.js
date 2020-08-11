const { app, BrowserWindow, ipcMain, } = require('electron');

app.on('ready', () => {
    // create main browser window
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 1024,
        height: 720,
        backgroundColor: '#2a3038', 
        show: false // don't show the main window
    });
    // create a new `splash`-Window 
    splash = new BrowserWindow({
        width: 300, 
        height: 400, 
        backgroundColor: '#2a3038', 
        frame: false, 
        alwaysOnTop: true
    });
    
    splash.loadFile('public/splash.html');
    mainWindow.loadURL('http://localhost:3000');

    // if main window is ready to show, then destroy the splash window and show up the main window
    mainWindow.webContents.on('did-stop-loading', () => {
        splash.destroy();
        mainWindow.show();
        mainWindow.webContents.send('ping', 'whoop');
    });

    ipcMain.on('call-mainjsfunction', () => {
        console.log("test");
        event.sender.send('reply-mainjsfunction', "pong")
      })

    

  });