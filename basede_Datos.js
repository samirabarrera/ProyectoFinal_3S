import pkg from 'pg';
export const { Pool } = pkg;

const pool = new Pool ({
    user: 'samira360',
    host: 'localhost',
    database: 'ProyectoFinal_3S',
    password: 'sami_360',
    port: 5433,
});

pool.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));