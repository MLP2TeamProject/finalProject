// 클라이언트 요청이 들어왔을 때 라우팅 처리 정의
const express = require('express');
const router = express.Router();
const homeDAO = require('./homeDAO');

// localhost:8000/home 진입화면
router.get('/', function (req, res, next) {
	// index.html이 출력되면서 그곳에 {{title}}정보를 넘김
	// nunjucks 설정이 app.js에 되어있어야 함
	res.render('index', { title: 'Express' });
});

// front 홈화면 newbuy
router.get('/newbuy', function (req, res, next) {
	homeDAO.newBuy((resp) => {
		res.json(resp);
	});
});

// front 홈화면 auctionbuy
router.get('/auctionbuy', function (req, res, next) {
	homeDAO.auctionBuy((resp) => {
		res.json(resp);
	});
});

module.exports = router;
