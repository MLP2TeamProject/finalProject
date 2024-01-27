const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

router.post('/signup', async (req, res, next) => {
    console.log('user router, singup.......')
    //front 전달 데이터 획득
    const data = req.body
    userDAO.signup(data, (resp) => {
        res.send(resp)
    })
})


module.exports = router