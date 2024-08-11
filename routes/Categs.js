const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", async (req, res) => {
    let query = req.query;
    let categs;
    if (Object.keys(query).length === 0)
        categs = await db.query('select * from categories');
    else {
        let queryParams = [];
        let queryText = 'select * from categories where ';
        let i = 1;
        for (let key in query) {
            queryText += `${key} = $${i} and `;
            queryParams.push(query[key]);
            i++;
        }
        queryText = queryText.slice(0, -5);
        categs = await db.query(queryText, queryParams);
    }
    res.json(categs.rows);
});

module.exports = router;