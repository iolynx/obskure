import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const path = require('path');

// Custom APIs for renderer
const api = {}


contextBridge.exposeInMainWorld('electronAPI', {
  getPasswords: () => ipcRenderer.invoke('get-passwords'),
  savePassword: (newPassword) => ipcRenderer.invoke('save-password', newPassword),
  deletePassword: (passwordToDelete) => ipcRenderer.invoke('delete-password', passwordToDelete)
});

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
