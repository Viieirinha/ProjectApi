const util = require('util');
const mysql = require('mysql');
const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'developer',
    password: 'mali270610',
    database: 'databaselb'
});

pool.getConnection((err, connection) => {
    if(err)
        console.log("Algo deu errado ao conectar ao banco de dados...");

    if(connection)
        connection.release();
        return;

});

pool.query = util.promisify(pool.query);

module.exports = pool;