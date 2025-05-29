const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadURL('http://localhost:3000');
}

ipcMain.handle('print-turno', async (event, ticket) => {
  return new Promise((resolve, reject) => {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);
    device.open(err => {
      if (err) return reject(err);
      printer
        .align('ct')
        .size(2, 2)
        .text('*** TURNO ***')
        .text('')
        .size(3, 3)
        .text(ticket)
        .size(1, 1)
        .text('')
        .text(`Fecha: ${new Date().toLocaleString()}`)
        .cut()
        .close();
      resolve(ticket);
    });
  });
});

app.whenReady().then(createWindow);