const express = require('express')
const router = express.Router()
const userDAO = require('./userDAO')

// 회원가입용
router.post('/signup', async (req, res, next) => {
    const data = req.body
    userDAO.signup(data, (resp) => {
        res.json(resp)
    })
})

// 로그인
router.post('/signin', async (req, res, next) => {
    const data = req.body
    userDAO.signin(data, (resp) => {
        if(resp.status === 200){
            req.session.loginEmail = resp.data.email
            console.log(req.session)
        }
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