// This is essentially the bridge between the frontend and backend communication

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {

});

// In the future, we can add methods here to allow the renderer process to communicate with the main process securely.