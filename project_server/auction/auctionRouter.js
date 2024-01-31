const express = require('express')
const router = express.Router()
const auctionDAO = require('./auctionDAO')

router.get('/:email', async (req, res, next) => {
    const email = req.params.email
    auctionDAO.auctionList(email, (resp) => {
        res.json(resp)
    })
})

module.exports = router