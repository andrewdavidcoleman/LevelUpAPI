'use strict';
const express = require('express');
const mysql = require('mysql');

const app = express();

app.get('/', function (req, res) {
    res.json(['hello root!'])
})

// ========================================================================== Create
app.post('/createWod', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `INSERT INTO wods (name, type, description)
        VALUES ('${req.body.name}', '${req.body.type}', '${req.body.description}')`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.post('/createAthlete', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `INSERT INTO athletes (name)
        VALUES (${req.query.name})`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.post('/createPerformance', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `INSERT INTO performances (wodId, athleteId, result, date)
        VALUES (${req.query.wodId}, ${req.query.athleteId}, ${req.query.result}, ${req.query.date})`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            } else {
                res.json({
                    status: res.statusMessage,
                    message: 'Performance added successfully',
                    performance: {
                        wodId: req.query.wodId,
                        athleteId: req.query.athleteId,
                        result: req.query.result,
                        date: req.query.date
                    }
                });
            }
        })
})

// ========================================================================== Read
app.get('/getAllAthletes', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `SELECT * FROM athletes`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
        })
})

app.get('/getAllWods', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `SELECT * FROM wods`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.get("/getAllPerformances", (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `SELECT * FROM performances`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })

})

app.get("/getAllPerformancesByAthleteIdWodId", (req, res, next) => {

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
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })

})

// ========================================================================== Update
app.post('/updateWod', (req, res, next) => {

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
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.post('/updateAthlete', (req, res, next) => {

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
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.post('/updatePerformance', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `UPDATE performances
        SET 
        wodId = ${req.query.wodId},
        athleteId = ${req.query.athleteId},
        result = ${req.query.result},
        date = ${req.query.date}
        WHERE wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

// ========================================================================== Delete
app.post('/deleteWod', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `DELETE FROM wods
        WHERE wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.post('/deleteAthlete', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `DELETE FROM athletes
        WHERE athleteId = ${req.query.athleteId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

app.post('/deletePerformance', (req, res, next) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LevelUp'
    })

    connection.query(

        `DELETE FROM performances
        WHERE performanceId = ${req.query.performanceId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows);
        })
})

module.exports = app;
