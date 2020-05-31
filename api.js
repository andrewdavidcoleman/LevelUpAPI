'use strict';
const express = require('express');
const mysql = require('mysql');
const app = express();

const dbconfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
}

app.get('/', function (req, res) {
    res.json(['hello root!'])
})

// ========================================================================== Auth
app.post('/register', () => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `INSERT INTO users (firstName, lastName, email, password)
        VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}')`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json({
                status: res.statusMessage,
                message: 'User added successfully',
                user: {
                    userId: rows.insertId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                }
            })

            connection.end()
        })
})

// ========================================================================== Create
app.post('/createWod', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `INSERT INTO wods (name, type, description)
        VALUES ('${req.body.name}', '${req.body.type}', '${req.body.description}')`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json({
                status: res.statusMessage,
                message: 'WOD added successfully',
                wod: {
                    wodId: rows.insertId,
                    name: req.body.name,
                    type: req.body.type,
                    description: req.body.description
                }
            })

            connection.end()
        })
})

app.post('/createAthlete', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `INSERT INTO athletes (name)
        VALUES (${req.query.name})`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json({
                status: res.statusMessage,
                message: 'WOD added successfully',
                athlete: {
                    athleteId: rows.insertId,
                    name: req.body.name
                }
            })
            
            connection.end()
        })
})

app.post('/createPerformance', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)
    console.log(req.body);
    connection.query(

        `INSERT INTO performances (wodId, athleteId, result, date)
        VALUES (${req.body.wodId}, ${req.body.athleteId}, '${req.body.result}', '${req.body.date}')`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }

            res.json({
                status: res.statusMessage,
                message: 'Performance added successfully',
                performance: {
                    performanceId: rows.insertId,
                    wodId: req.body.wodId,
                    athleteId: req.body.athleteId,
                    result: req.body.result,
                    date: req.body.date
                }
            });

            connection.end()
        })
})

// ========================================================================== Read
app.get('/getAllAthletes', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `SELECT * FROM athletes`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })
})

app.get('/getAllWods', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `SELECT * FROM wods`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })
})

app.get("/getAllPerformances", (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `SELECT * FROM performances ORDER BY date ASC`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })

})

app.get("/getAllPerformancesByAthleteIdWodId", (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `SELECT * FROM performances
        WHERE athleteId = ${req.query.athleteId}
        AND wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })

})

// ========================================================================== Update
app.post('/updateWod', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

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
            res.json(rows)
            
            connection.end()
        })
})

app.post('/updateAthlete', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

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
            res.json(rows)
            
            connection.end()
        })
})

app.post('/updatePerformance', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

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
            res.json(rows)
            
            connection.end()
        })
})

// ========================================================================== Delete
app.post('/deleteWod', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `DELETE FROM wods
        WHERE wodId = ${req.query.wodId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })
})

app.post('/deleteAthlete', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `DELETE FROM athletes
        WHERE athleteId = ${req.query.athleteId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })
})

app.post('/deletePerformance', (req, res, next) => {

    const connection = mysql.createConnection(dbconfig)

    connection.query(

        `DELETE FROM performances
        WHERE performanceId = ${req.query.performanceId}`

        , (err, rows, fields) => {
            if (err) {
                console.log('DB error: ' + err)
                return;
            }
            res.json(rows)
            
            connection.end()
        })
})

module.exports = app;
