const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", async (req, res) => {
    let query = req.query;
    let wishes;
    if (Object.keys(query).length === 0)
        wishes = await db.query('select * from wishes');
    else {
        let queryParams = [];
        let queryText = 'select * from wishes where ';
        let i = 1;
        for (let key in query) {
            queryText += `${key} = $${i} and `;
            queryParams.push(query[key]);
            i++;
        }
        queryText = queryText.slice(0, -5);
        wishes = await db.query(queryText, queryParams);
    }
    res.json(wishes.rows);
});

module.exports = router;