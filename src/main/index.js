import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { AssuredWorkload } from '@mui/icons-material'
const fs = require('fs')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function readSchemaFile() {
  const schemaFilePath = path.join(__dirname, '../credentials/schemas.json')
  if (!fs.existsSync(schemaFilePath)) {
    return []
  }
  const data = fs.readFileSync(schemaFilePath, 'utf8')
  return JSON.parse(data)
}

function readPasswordsFile() {
  const passwordsFilePath = path.join(__dirname, '../credentials/passwords.json')
  if (!fs.existsSync(passwordsFilePath)) {
    return []
  }
  const data = fs.readFileSync(passwordsFilePath, 'utf8')
  return JSON.parse(data)
}

function writePasswordsFile(passwords) {
  const passwordsFilePath = path.join(__dirname, '../credentials/passwords.json')
  const newPasswordJSON = JSON.stringify(passwords)
  fs.writeFileSync(passwordsFilePath, newPasswordJSON, 'utf-8')
}

function readFavouritesFile() {
  const favouritesFilePath = path.join(__dirname, '../credentials/favourites.json')
  if (!fs.existsSync(favouritesFilePath)) {
    return { error: 'Favourites File does not exist' }
  }
  const data = fs.readFileSync(favouritesFilePath, 'utf8')
  return JSON.parse(data)
}

function writeFavouritesFile(favourites) {
  const favouritesFilePath = path.join(__dirname, '../credentials/favourites.json')
  const favouritesJSON = JSON.stringify(favourites)
  fs.writeFileSync(favouritesFilePath, favouritesJSON, 'utf-8')
}

ipcMain.handle('get-schema-contents', async (event, schema) => {
  try {
    const schemas = readSchemaFile()
    return schemas[schema]
  } catch (error) {
    console.error('Error obtaining schema details: ', error)
    return { error: 'Failed to obtain schema details ' + error }
  }
})

ipcMain.handle('get-schemas', async () => {
  try {
    const schemas = readSchemaFile()
    return Object.keys(schemas)
  } catch (error) {
    console.error('Error reading schema file: ', error)
    return { error: 'Failed to read Schemas ' + error }
  }
})

ipcMain.handle('get-passwords', async () => {
  try {
    return readPasswordsFile()
  } catch (error) {
    console.error('Error reading passwords file:', error)
    return { error: 'Failed to load passwords ' + error }
  }
})

ipcMain.handle('save-password', async (event, newPassword) => {
  try {
    // Write the passwords to the file
    const passwords = readPasswordsFile()
    passwords.push(newPassword)
    writePasswordsFile(passwords)
    return { success: true, newPasswords: passwords }
  } catch (error) {
    console.error('Error saving passwords:', error)
    return { success: false, error: error }
  }
})

ipcMain.handle('delete-password', async (event, passwordToDelete) => {
  try {
    const passwords = readPasswordsFile()
    // passwords.delete(passwordToDelete);
    // let res = jData.filter(obj => obj.Name !== passwordToDelete.username);
    const updatedPasswords = passwords.filter(
      (entry) =>
        !(
          entry.service === passwordToDelete.service && entry.username === passwordToDelete.username
        )
    )
    writePasswordsFile(updatedPasswords)
    return { success: true, remainingEntries: updatedPasswords }
  } catch (error) {
    console.error('Error deleting password', error)
    return { success: false, error: error }
  }
})

ipcMain.handle('get-favourites', async () => {
  try {
    const favourites = readFavouritesFile()
    return favourites
  } catch (error) {
    console.error('Error obtaining favourites: ', error)
    return { success: false, error: error }
  }
})

ipcMain.handle('add-favourite', async (event, newFav) => {
  try {
    const favourites = readFavouritesFile()
    if (!favourites.includes(newFav)) {
      favourites.push(newFav)
    }
    // console.log('favourite added.\nfavourites: ', favourites)
    writeFavouritesFile(favourites)
    return favourites
  } catch (error) {
    console.log('Unable to write to favourites file: ', error)
    return { success: false, error: error }
  }
})

ipcMain.handle('delete-favourite', async (event, favToDelete) => {
  try {
    const favourites = readFavouritesFile()
    const updatedFavs = favourites.filter((item) => item !== favToDelete)
    // console.log('Favourites deleted.\nFavourites: ', updatedFavs)
    writeFavouritesFile(updatedFavs)
    return updatedFavs
  } catch (error) {
    console.error('Error deleting favourite', error)
    return { success: false, error: error }
  }
})
