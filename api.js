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
//    {
//        performanceId: 333,
//        wodId: 555,
//        wodType: 'lift',
//        athleteId: 3,
//        result: '115',
//        date: '02/02/2020'
//    },
//    {
//        performanceId: 444,
//        wodId: 333,
//        wodType: 'ft',
//        athleteId: 3,
//        result: '18:56',
//        date: '04/19/2020'
//    },
//    {
//        performanceId: 555,
//        wodId: 333,
//        wodType: 'ft',
//        athleteId: 1,
//        result: '18:56',
//        date: '04/19/2020'
//    },
//    {
//        performanceId: 666,
//        wodId: 333,
//        wodType: 'ft',
//        athleteId: 2,
//        result: '18:56',
//        date: '04/19/2020'
//    },
//]

app.get('/', function (req, res) {
    res.json(['hello root!'])
})

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

module.exports = app;
