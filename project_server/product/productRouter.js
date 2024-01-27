const express = require("express");
const productDAO = require("./productDAO");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// router.get("/productList", function (req, res, next) {
//   console.log("상품 메인 불러오기");
//   productDAO.productList((resp) => {
//     res.json(resp);
//   });
// });
// 화면메인 부분 -준영님

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

router.post("/upload", async (req, res, next) => {
  const biddingUpload = upload.single("file1");

  biddingUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.json({ status: 500, message: "error" });
    } else if (err) {
      console.log(err);
      res.json({ status: 500, message: "error" });
    } else {
      const data = req.body;
      // 파일 업로드 성공시
      console.log("00", data.inputData);
      console.log("11", req.file.filename);
      auctionDAO.bidding(data.inputData, req.file.filename, (resp) => {
        res.json(resp);
      });
    }
  });
});

//upload 엔드포인트에 대한 POST 요청 처리
// router.post("/upload", (req, res, next) => {
//   const pictureUpload = upload.single("file1"); //여기 업로드할 파일의 필드이름= file1을 front bidding이랑 맞춤
//   pictureUpload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.log(err);
//       res.json({ status: 500, message: "error" });
//     } else if (err) {
//       console.log(err);
//       res.json({ status: 500, message: "error" });
//     } else {
//       console.log("파일 업로드 완료!");
//       const data = req.body;
//       console.log("title", data.title);
//       console.log("file", req.file.filename);
//       //여기에
//       res.json({ status: 200, message: "OK", data: req.file.filename });
//     }
//   });
// });

router.get("/detail/:id", function (req, res, next) {
  console.log("디테일 불러오기");
  const id = req.params.id;
  productDAO.detail({ product_id: id }, (resp) => {
    //productDAO.detail 함수의 매개변수로는 객체를 받도록 정의되어 있으니까 객체 안에 담아야함
    res.json(resp);
  });
});

// router.post("/update", function (req, res, next) {
//   console.log("게시글 수정하기");
//   const data = req.body;
//   productDAO.update(data, (resp) => {
//     res.json(resp);
//   });
// });
//이 부분은 게시글 작성자가 수정할 때의 부분이라...-준영님

module.exports = router;
