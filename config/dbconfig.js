const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    pool: { min: 0, max: 7 }
});
knex.on('query', function (queryData) {
    console.log(queryData);
});
module.exports = knex;
