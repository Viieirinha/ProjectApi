const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', pageRouter);

app.get('/ip',function(req, res) {
    const ipAddress = req.socket.remoteAddress;
    res.send(ipAddress);
});


app.use((req, res, next) => {
    var err = new Error('Página não Encontrada.');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});

module.exports = app;