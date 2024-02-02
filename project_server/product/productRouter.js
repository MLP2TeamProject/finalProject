const express = require("express");
const router = express.Router();
const productDAO = require("./productDAO");
const multer = require("multer");
const path = require("path");
const axios = require('axios')
const xpath = require('xpath');
const dom = require('@xmldom/xmldom').DOMParser;

// 상품, 준영님
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

router.get('/search', async function(req, res, next){
  console.log("search invoked...");
  const input = req.query.input
  console.log("input:", input);
  try {
      //응답 성공
      const response = await axios.get(`https://www.nl.go.kr/NL/search/openApi/searchKolisNet.do?key=39b4dd4a523f80ea24ba476b79fc50c968db9622ffd612dc415b4176e41ccadd&kwd=${input}&apiType=json&searchType=&sort=`);
      console.log(response.status);
      const doc = new dom().parseFromString(response.data, 'text/xml');
      const nodes = xpath.select("/root/result/item", doc);
      const result = [];
      for(i = 0; i < nodes.length; i++)
      {
          var title_node = xpath.select("title_info", nodes[i]);
          const title = title_node[0].firstChild.data;
          var isbn_node = xpath.select("isbn", nodes[i]);
          var isbn = "";
          if (isbn_node[0].firstChild)
          {
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


// 상품, 유경님 
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

router.post("/bidding/insert", async (req, res, next) => {
  console.log("0000000");

  //파일 업로드 처리하고.. 이 라인에서 에러가 발생하지 않으면 파일 업로드 성공
  const a1 = upload.single("file1");

  a1(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.json({ status: 500, message: "error" });
    } else if (err) {
      console.log(err);
      res.json({ status: 500, message: "error" });
    } else {
      //에러가 없다면.. 나머지 데이터를 받는다..
      console.log("upload router....");
      const data = req.body;
      const obj = JSON.parse(data.sendData);

      console.log("sendData", obj);
      productDAO.bidding(obj, (resp) => {
        res.json(resp);
      });
    }
  });
});

router.get("/detail/:id", function (req, res, next) {
  console.log("디테일 불러오기");
  const id = req.params.id;
  productDAO.detail({ product_id: id }, (resp) => {
    //productDAO.detail 함수의 매개변수로는 객체를 받도록 정의되어 있으니까 객체 안에 담아야함
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

router.get("/listpage/:page/:count", async (req,res,next) => {
  const page = Number(req.params.page)
  const count = Number(req.params.count)
  console.log('page',page, 'count', count)
  productDAO.listpage(page, count, (resp) => {
    res.json(resp);
  });
})
module.exports = router;
