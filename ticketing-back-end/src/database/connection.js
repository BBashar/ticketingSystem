import mysql, { Pool, createPool } from 'mysql2';

import { environment } from '../environment/environment.js';


const connection = createPool({
    connectionLimit: 10,
    host: environment.host,
    user: environment.user,
    password: environment.password,
    database: environment.database,
    port: environment.database_port,
    waitForConnections: true,
});



connection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

export default connection.promise();
