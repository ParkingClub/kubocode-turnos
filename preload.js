const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  printTurno: (ticket) => ipcRenderer.invoke('print-turno', ticket)
});
