// 클라이언트 요청이 들어왔을 때 라우팅 처리 정의
var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next){
    // index.html이 출력되면서 그곳에 {{title}}정보를 넘김
    // nunjucks 설정이 app.js에 되어있어야 함
    res.render('index', {title: 'Express'})
})

module.exports = router