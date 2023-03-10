const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const { nextTick } = require('process');
const sesion = require('express-session');
const flash = require('connect-flash');

// Inicializando
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('papel', path.join(__dirname, 'public'));


app.engine('.hbs', engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(sesion({
    secret: 'miSecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());


// Variables globales
app.use((req, res, next)=>{
    app.locals.message = req.flash('message');
    app.locals.exito = req.flash('exito');
    next();
});

// Rutas
app.use(require('./routes'));
app.use('/menu', require('./routes/menu'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto : ',app.get('port'));
});
