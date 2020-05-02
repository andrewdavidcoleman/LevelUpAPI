'use strict';
const express = require('express');
const mysql = require('mysql');

const app = express();

//const performances = [
//    {
//        performanceId: 111,
//        wodId: 333,
//        wodType: 'ft',
//        athleteId: 3,
//        result: '22:13',
//        date: '12/12/2019'
//    },
//    {
//        performanceId: 222,
//        wodId: 777,
//        wodType: 'amrap',
//        athleteId: 3,
//        result: '5+14',
//        date: '01/22/2020'
//    },
//]

app.get('/', function (req, res) {
    res.json(['hello root!'])
})

// ========================================================================== Create
app.post('/createWod', (req, res, next) => {
    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `INSERT INTO wods (name, type, description)
        VALUES (${res.query.name}, ${res.query.type}, ${res.query.description})`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

app.post('/createAthlete', (req, res, next) => {
    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `INSERT INTO athletes (name)
        VALUES (${res.query.name})`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

// ========================================================================== Read
app.get('/getAllAthletes', (req, res, next) => {

    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `SELECT * FROM athletes`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows)
        })
})

app.get('/getAllWods', (req, res, next) => {

    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `SELECT * FROM wods`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

app.get("/getAllPerformancesByAthleteIdWodId", (req, res, next) => {

    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `SELECT * FROM performances
        WHERE athleteId = ${req.query.athleteId}
        AND wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })

})

// ========================================================================== Update
app.post('/updateWod', (req, res, next) => {
    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `UPDATE wods
        SET 
        name = ${req.query.name},
        type = ${req.query.type},
        description = ${req.query.description}
        WHERE wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

app.post('/updateAthlete', (req, res, next) => {
    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `UPDATE athletes
        SET 
        name = ${req.query.name},
        WHERE wodId = ${req.query.athleteId}`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

// ========================================================================== Delete
app.post('/deleteWod', (req, res, next) => {
    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `DELETE FROM wods
        WHERE wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

app.post('/deleteAthlete', (req, res, next) => {
    if (err) {
        console.log('DB error: ' + err)
        return;
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `DELETE FROM athletes
        WHERE athleteId = ${req.query.athleteId}`

        , (err, rows, fields) => {
            console.log(err)
            res.json(rows);
        })
})

module.exports = app;
