const express = require('express');
// const mongoose = require('mongoose');
const redis = require('redis');
const {Client} = require('pg');

//connect to redis
const REDIS_HOST = 'redis';
const REDIS_PORT = '6379';
const redisCleint = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisCleint.on('error', (err) => console.log('failed to connect to redis', err));
redisCleint.on('connect', () => console.log('connected to redis'));
redisCleint.connect();

// init app
const PORT = 4000;
const app = express();

//connect to db
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017';
// const DB_HOST = 'mongo';
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
// mongoose
//     .connect(URI)
//     .then(() => console.log('sucess'))
//     .catch((err) => console.log('failed', err));

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
const DB_HOST = 'postgres';
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
const client = new Client({
    connectionString:URI
});
client
    .connect()
    .then(() => console.log('sucess connection to db'))
    .catch((err) => console.log('failed', err));



app.get('/', (req, res) => {
    redisCleint.set('products', 'products.....');
    res.send('<h1> Hello from AWS, using docker hub</h1>');
});

app.get('/products', async (req, res) => {
    const products = await redisCleint.get('products');
    res.send(products);
});

app.listen(PORT, () => console.log('app is running on port: ' + PORT));