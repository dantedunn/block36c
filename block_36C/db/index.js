const pg = require('pg');
const { Client } = pg
const client = new Client({
    user: 'postgres',
    password: 'password1',
    host: 'localhost',
    port: 5432,
    database: '34a-classroom_manager',
})

module.exports = {
    query: (text, params) => client.query(text, params),
};
