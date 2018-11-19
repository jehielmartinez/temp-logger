const express = require('express');
const bodyParser = require('body-parser');

const pg = require('pg');

const connectionString = process.env.DATABASE_URI || 'postgresql://postgres:josue2415@localhost:5432/templog';
const pool = new pg.Pool({ connectionString });

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

pool.connect()
    .then((client) => {
        return client.query('CREATE TABLE log(id SERIAL PRIMARY KEY, device VARCHAR(40) not null, created_on VARCHAR(50) not null, metric VARCHAR(50))')
        .then((res)=>{
            console.log(res);
        })
    }).catch((err) => {
        console.error('Base de Datos ya existe', err);
    });

app.post('/log', (req, res) => {
    data = [req.query.device, new Date().valueOf(), req.query.metric];

    pool.connect()
        .then((client) => {
            return client.query(
                    'INSERT INTO log(device, created_on, metric) VALUES($1, $2, $3) RETURNING *',
                    data)
                    .then((response)=>{
                        client.release();
                        res.status(200).json({success: true, data: response.rows[0]})
                    })
        .catch((err) => {
            console.log(err);
        })
    })
})

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
