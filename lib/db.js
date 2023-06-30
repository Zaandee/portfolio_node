const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-1.c8hfhn9xfhru.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '11111111',
    database: 'dietdiary',
    port: '3306',
    dateStrings: 'date',
});

connection.connect();
module.exports = connection;