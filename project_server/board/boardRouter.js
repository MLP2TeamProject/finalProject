const express = require('express')
const router = express.Router()
const boardDAO = require('./boardDAO')


router.get("/listpage1/:page/:count", async (req, res, next) => {
    const page = Number(req.params.page) // 페이지번호
    const count = Number(req.params.count) // 한페이지 당 보여줄 페이지 개수
    console.log('page', page, 'count', count)
    boardDAO.listpage1(page, count, (resp) => {
        res.json(resp);
    });
})

router.get('/noticeBoardList', function (req, res, next) {
    console.log('notice Board List play - pagination... router')
    boardDAO.pagination1((resp) => {
        console.log('router 진입 ')
        res.json(resp)
    })
})

router.get('/faqBoardList', function (req, res, next) {
    console.log('faq Board List play... ')
    boardDAO.faqBoardList((resp) => {
        res.json(resp)
    })
})

// notice board의 게시글을 등록함. 
//post 방식은 request body 를 통해서 데이터 전달하는 방식.. 
router.post('/noticeInsert', function (req, res, next) {
    const data = req.body
    console.log('notice insert .. router')
    boardDAO.noticeInsert(data, (resp) => {
        res.json(resp)
    })
})

// notice board의 게시글 상세보기
router.get('/noticeBoard/:id', function (req, res, next) {
    const id = req.params.id
    console.log('notice board 상세보기.. router')
    boardDAO.noticeBoard(id, (resp) => {
        res.json(resp)
    })

})


// notice board의 게시글 삭제 
router.post('/noticeDelete/:id', function (req, res, next) {
    const id = req.params.id
    console.log('공지 게시글 삭제, router', id)
    boardDAO.noticeDelete(id, (resp) => {
        res.json(resp)
    })

})

// notice FAQ board의 게시글 수정
router.post('/noticeUpdate', function (req, res, next) {
    const data = req.body
    console.log('notice update .. router')
    boardDAO.noticeUpdate(data, (resp) => {
        res.json(resp)
    })
})


module.exports = router