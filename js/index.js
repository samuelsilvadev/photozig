import { App } from './App.js';

const newApp = new App();
const data = newApp
    .getData()
    .then(response => newApp.buildList(JSON.parse(response)));