const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", async (req, res) => {
    let query = req.query;
    let users;
    if (Object.keys(query).length === 0)
        users = await db.query('select * from users');
    else {
        let queryParams = [];
        let queryText = 'select * from users where ';
        let i = 1;
        for (let key in query) {
            queryText += `${key} = $${i} and `;
            queryParams.push(query[key]);
            i++;
        }
        queryText = queryText.slice(0, -5);
        users = await db.query(queryText, queryParams);
    }
    res.json(users.rows);
});

module.exports = router;