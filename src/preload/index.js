import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const path = require('path')

// Custom APIs for renderer
const api = {}

contextBridge.exposeInMainWorld('electronAPI', {
  getPasswords: (folder) => ipcRenderer.invoke('get-passwords', folder),
  savePassword: (newPassword, folder) => ipcRenderer.invoke('save-password', newPassword, folder),
  deletePassword: (passwordToDelete, folder) =>
    ipcRenderer.invoke('delete-password', passwordToDelete, folder),
  getFolders: () => ipcRenderer.invoke('get-folders'),
  createFolder: (newFolder) => ipcRenderer.invoke('create-folder', newFolder),
  deleteFolder: (folderToDelete) => ipcRenderer.invoke('delete-folder', folderToDelete)
})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
