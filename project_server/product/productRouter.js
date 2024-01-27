const express = require('express')
const router = express.Router()
const productDAO = require('./productDAO')

router.get('/:email', async (req, res, next) => {
    const email = req.params.email
    productDAO.buyBooks(email, (resp) => {
        res.json(resp)
    })
})

router.post('/selectbid', async (req, res, next) => {
    const pId = req.body.pId
    const selectedAucId = req.body.selectedAucId
    productDAO.bidWrite(pId, selectedAucId, (resp) => {
        res.json(resp)
    })
})

module.exports = router