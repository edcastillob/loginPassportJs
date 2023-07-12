const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // libreria para que express maneje sesiones
const PassportLocal = require('passport-local').Strategy; //estrategia de aunt passport en este caso local
const PORT = 3001;

app.use(express.urlencoded({ extended: true })); //middleware de expreess que nos permite leer datos de un form
app.use(cookieParser('mySecretEdcastillob')); //se configura frase sercreta
app.use(session({
    secret: 'mySecretEdcastillob',
    resave: true, //en cada peticion asi la sesion no haya sido configurada se vuelve a guardar
    saveUninitialized: true, // si inicializamos una sesion en una peticion y no guardamos nada aun asi guarda datos session
})); 
app.use(passport.initialize()); // config passport como middleware
app.use(passport.session()); // config de session de passport
app.use(passport.session()); // config de session de passport
passport.use(new PassportLocal(function(username, password, done){
    // done(err, {'Edwar Castillo'})
    if(username==='edwar.castillo@gmail.com' && password==='1234567'){
        return done(null, {id:1, name:'Edwar Castillo'})
    }
    done(null, false)
}))

//una vez logueado el usuario si el proceso es exitoso se prodece a la serializacion y deserialización de forma de guardar el id
//del usuario que ingreso es la serializacion y la deserializacion consulta a la DB de los datos de user en funciomn a su ID

//serializacion
passport.serializeUser(function(user, done){
    done(null, user.id)
})
passport.deserializeUser(function(id, done){
    done(null, {id: 1, name:'Edwar Castillo'})
})
// deserializacion
passport
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {   //proteccion de esta ruta
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
    // Si iniciamos mostrar Bienvenida

    // redireccion si el acceso no fué exitoso
}, (req, res) =>{
    res.send('Hola')

});


app.get('/login', (req, res) => { 
    
    //Mostrar form de login
    res.render('login');
    
});

app.post('/login', passport.authenticate('local',{//recibir las credenciales
    successRedirect:'/',
    failureRedirect: '/login'
}));  //debemos pasarlo por el middleware de autenticacion
    



app.listen(PORT, () => { console.log(`Server listening port: ${PORT}`) });