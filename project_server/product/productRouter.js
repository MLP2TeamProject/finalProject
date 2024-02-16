const express = require("express");
const router = express.Router();
const productDAO = require("./productDAO");
const multer = require("multer");
const path = require("path");
const axios = require('axios')
const xpath = require('xpath');
const dom = require('@xmldom/xmldom').DOMParser;
// const { func } = require("prop-types");

// 상품리스트
router.get("/productlist", function (req, res, next) {
  console.log("상품 페이지");
  productDAO.productList((resp) => {
      res.json(resp);
  });
});

router.post("/buy", function (req, res, next) {
  console.log("상품 구매등록");
  const data = req.body;
  // productDAO.buy 호출 시 데이터 전달
  productDAO.buy(data, (resp) => {
      res.json(resp);
  });
});

router.get('/search', async function (req, res, next) {
  console.log("search invoked...");
  const input = req.query.input
  console.log("input:", input);
  try {
      //응답 성공
    const response = await axios.get(
      `https://www.nl.go.kr/NL/search/openApi/searchKolisNet.do?key=39b4dd4a523f80ea24ba476b79fc50c968db9622ffd612dc415b4176e41ccadd&kwd=${input}&apiType=json&searchType=&sort=`
    );
    console.log(response.status);
    const doc = new dom().parseFromString(response.data, "text/xml");
    const nodes = xpath.select("/root/result/item", doc);
    const result = [];
    for (i = 0; i < nodes.length; i++) {
      var title_node = xpath.select("title_info", nodes[i]);
      const title = title_node[0].firstChild.data;
      var isbn_node = xpath.select("isbn", nodes[i]);
      var isbn = "";
      if (isbn_node[0].firstChild) {
        isbn = isbn_node[0].firstChild.data;
      }
      const result_item = { title: title, isbn: isbn };
      console.log(result_item);
      result.push(result_item);
    }
    res.send(result);
  } catch (error) {
      //응답 실패
      console.error(error);
  }
})

// 상품상세  
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/upload/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 상품상세 입찰하기
router.post(
  "/bidding/insert",
  upload.single("file1"),
  async (req, res, next) => {
    try {
      // 파일 업로드 성공 여부 확인
      if (!req.file) {
        return res.json({ status: 500, message: "파일 업로드 실패" });
      }
      const data = req.body;
      const obj = JSON.parse(data.sendData);
      const filename = req.file.filename;
      const biddingData = { ...data, ...obj, filename };
      //스프레드 연산자 사용해서 객체의 속성을 biddingData에 넣기~!
      productDAO.bidding(biddingData, (resp) => {
        res.json(resp);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "서버 에러" });
    }
  }
);

// 상품 구매신청
router.post("/buyinsert",
  upload.single("file1"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.json({ status: 500, message: "파일 업로드 실패" });
      }
      const obj = JSON.parse(req.body.sendData);
      const filename = req.file.filename;
      productDAO.buyInsert(obj, filename, (resp) => {
        res.json(resp);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "서버 에러" });
    }
  }
);

// 상품상세 
router.get("/detail/:id", function (req, res, next) {
  console.log("디테일 불러오기");
  const id = req.params.id;
  productDAO.detail({ product_id: id }, (resp) => {
    res.json(resp);
  });
});

router.get("/timer/:id", function (req, res, next) {
  console.log("작성시간 가져오기");
  const productId = req.params.id;
  productDAO.timer(productId, (resp) => {
    res.json(resp);
  });
});

router.post("/update/:id", function (req, res, next) {
  const productId = req.params.id;
  const data = req.body.product;
  console.log("게시글 수정하기", data);
  productDAO.update(productId, data, (resp) => {
    res.json(resp);
  });
});


// 마이페이지용 
router.get("/my/:email", async (req, res, next) => {
  const email = req.params.email;
  productDAO.buyBooks(email, (resp) => {
    res.json(resp);
  });
});

router.post("/selectbid", async (req, res, next) => {
  const pId = req.body.pId;
  const selectedAucId = req.body.selectedAucId;
  productDAO.bidWrite(pId, selectedAucId, (resp) => {
    res.json(resp);
  });
});

// paging1 방식
router.get("/listpage1/:page/:count", async (req,res,next) => {
  const page = Number(req.params.page) // 페이지번호
  const count = Number(req.params.count) // 한페이지 당 보여줄 페이지 개수
  console.log('page',page, 'count', count)
  productDAO.listpage1(page, count, (resp) => {
    res.json(resp);
  });
})

// paging 방식 : react-paginate 사용 
router.get('/listpage/:page', async (req, res, next) => {
  //클라이언트에서 전송한 페이지 번호 
  const page = req.params.page
  productDAO.listpage(page, (resp) => {
    res.json(resp);
  });
})

// 헤더 상품검색 
router.get('/keyword/:keyword', async (req, res, next) => {
  const keyword = req.params.keyword
  productDAO.keyword(keyword, (resp) => {
    res.json(resp);
  });
})

module.exports = router;
