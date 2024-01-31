const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

//http://localhost:8000/users/signup
router.post('/signup', async (req, res, next) => {
    console.log('user router, singup.......')
    //front 전달 데이터 획득
    const data = req.body
    userDAO.signup(data, (resp) => {
        res.send(resp)
    })
})

router.post('/signin', (req, res, next) => {
    console.log('login router....')
    const data = req.body
    userDAO.login(data, (resp) => {
        //답변
        res.json(resp)
    })
})

// 로그아웃
router.get('/logout', (req, res, next) => {
    console.dir('로그아웃', req)
    res.clearCookie('connect.sid')
    res.json({status:200, message: `OK`})
    
})


// 마이페이지용
router.get('/:email', async (req, res, next) => {
    const email = req.params.email
    userDAO.userinfo(email, (resp) => {
        res.json(resp)
    })
})

router.post('/changePw', async (req, res, next) => {
    console.log('user 비밀번호 변경 라우터')
    const data = req.body
    userDAO.changePw(data, (resp) => {
        res.json(resp)
    })
})

router.post('/deleteAccount', async (req, res, next) => {
    console.log('회원탈퇴 라우터')
    const email = req.body.email
    userDAO.deleteAccount(email, (resp) => {
        res.json(resp)
    })
})

module.exports = router