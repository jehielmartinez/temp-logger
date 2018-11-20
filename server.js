const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:josue2415@localhost:5432/templog';
const pool = new pg.Pool({connectionString});

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);

const io = socketIO(server);

app.use(cors());
app.use(bodyParser.json());


io.on('connection', (socket) => {
    console.log('Client Connected');

    pool.connect()
    .then((client) => {
        return client.query('CREATE TABLE log(id SERIAL PRIMARY KEY, device VARCHAR(40) not null, created_on VARCHAR(50) not null, metric VARCHAR(50))')
        .then((res)=>{
            console.log(res);
        })
    }).catch((err) => {
        console.error('ERROR', err);
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
                            io.emit('newLog', response.rows[0]);
                        })
            .catch((err) => {
                console.log(err);
            })
        })
    })

    app.get('/send', (req, res) => {
        data = [req.query.from, req.query.to];
        pool.connect()
        .then((client) => {
            return client.query(
                'SELECT * FROM log WHERE created_on >= $1 AND created_on <= $2',
                data)
                .then((response)=>{
                    client.release();
                    res.status(200).json(response.rows)
                })
            .catch((err)=>{
                console.log(err);
            })
        })
    })

})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

server.listen(port, () => console.log(`listening on http://localhost:${port}`));
