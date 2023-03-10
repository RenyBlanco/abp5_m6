const express = require("express");
const fs = require('fs');
const rutas = express.Router();
//const filePath = 'C:/Users/Vespertino/Documents/Modulo_6/abp5_m6/public/menu.json';
const filePath = 'C:/Users/reyna/OneDrive/Documentos/Personal/Curso/Modulo-6/abp5_m6/public/menu.json'


rutas.get('/add', (req, res) => {
    res.render('menu/add');
});

rutas.post('/add', (req, res) => {
    const { nombre, precio } = req.body;
    let idx = JSON.parse(fs.readFileSync(filePath));
    let indice = (Object.keys(idx.almuerzos).length) + 1;
    const nuevo = {
        "id": indice,
        "nombre": nombre,
        "precio": parseInt(precio)
    };
    
    console.log('Nuevo ->', nuevo);
    idx.almuerzos.push(nuevo);
    
    fs.writeFileSync(filePath, JSON.stringify(idx));
    console.log('Registro Añadido');
    req.flash('exito', 'Enlace creado con éxito');
    res.redirect('/menu');
});

rutas.get('/', (req, res) => {
    const valores = JSON.parse(fs.readFileSync(filePath));
    res.render('menu/lista', {valores});
});

rutas.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    let indice = parseInt(id)-1;
    let idx = JSON.parse(fs.readFileSync(filePath));
    idx.almuerzos.splice(indice,1);
    fs.writeFileSync(filePath, JSON.stringify(idx));
    req.flash('exito', 'Enlace borrado con éxito');
    res.redirect('/menu');
});

rutas.get('/editar/:id', (req, res) => {
    const { id } = req.params;
    let indice = parseInt(id)-1;
    let idx = JSON.parse(fs.readFileSync(filePath));
    const valores = idx.almuerzos[indice];
    res.render('menu/editar', {valores});
});

rutas.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const updated = {
        "id" : id,
        "nombre" : nombre,
        "precio" : parseInt(precio)
    };
    let idx = JSON.parse(fs.readFileSync(filePath));
    idx.almuerzos[id-1] = updated;
    fs.writeFileSync(filePath, JSON.stringify(idx));
    req.flash('exito', 'Enlace actualizado con éxito');
    res.redirect('/menu');
});

module.exports = rutas;