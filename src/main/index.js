import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { object } from 'prop-types'
import PasswordEdit from '../renderer/src/passwords-page/PasswordEdit'
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

ipcMain.handle('get-passwords', async (event, folder) => {
  try {
    const passwords = readPasswordsFile()
    console.log('folder: ', folder)
    console.log('passwords: ', passwords)
    if (folder == 'All') {
      return Object.values(passwords).flat()
    } else if (passwords[folder]) {
      console.log('Passwords in ', folder, 'are : ', passwords[folder])
      return passwords[folder]
    }
  } catch (error) {
    console.error('Error reading passwords file:', error)
    return { error: 'Failed to load passwords' }
  }
})

ipcMain.handle('get-folders', async () => {
  try {
    const passwords = readPasswordsFile()
    const folders = Object.keys(passwords)
    console.log('Folders: ', folders)
    return folders
    // dont read foldersfile, read passwords and check for the number of objects each object is a folder
  } catch (error) {
    console.error('Error reading folders file: ', error)
    return { error: 'Failed to load Folders' }
  }
})

ipcMain.handle('create-folder', async (event, newFolder) => {
  try {
    const passwords = readPasswordsFile()
    if (!passwords[newFolder]) {
      passwords[newFolder] = []
      writePasswordsFile(passwords)
    } else {
      return { error: 'Error: Folder already exists' }
    }
  } catch (error) {
    console.error('Error creating extra folder: ', error)
    return { error: 'Failed to create folder.' }
  }
})

ipcMain.handle('save-password', async (event, newPassword, folder) => {
  try {
    // Write the passwords to the file
    const passwords = readPasswordsFile()
    console.log('Saving password to folder ', folder)
    passwords[folder].push(newPassword)
    writePasswordsFile(passwords)
    return { success: true, newPasswords: passwords[folder] }
  } catch (error) {
    console.error('Error saving passwords:', error)
    return { success: false, error }
  }
})

ipcMain.handle('delete-password', async (event, passwordToDelete, folder) => {
  try {
    const passwords = readPasswordsFile()
    passwords[folder] = passwords[folder].filter(
      (item) => item.service !== passwordToDelete.service
    )
    writePasswordsFile(passwords)
    return { success: true, remainingEntries: passwords[folder] }
  } catch (error) {
    console.error('Error deleting password', error)
    return { success: false, error: error }
  }
})
