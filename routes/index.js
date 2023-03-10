const express = require("express");
const rutas = express.Router();

rutas.get('/', (req,res) => {
    res.send('Bienvenido...');
});

module.exports = rutas;