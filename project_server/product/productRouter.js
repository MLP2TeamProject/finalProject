const express = require("express");
const router = express.Router();
const productDAO = require("./productDAO");
const axios = require('axios')
const multer = require('multer');
const xpath = require('xpath');
const dom = require('@xmldom/xmldom').DOMParser;

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

// router.get('/search', async function (req, res, next) {
//     console.log("search invoked...");
//     const input = req.query.input
//     console.log("input:", input);
//     try {
//         //응답 성공
//         const response = await axios.get(`https://www.nl.go.kr/NL/search/openApi/searchKolisNet.do?key=39b4dd4a523f80ea24ba476b79fc50c968db9622ffd612dc415b4176e41ccadd&kwd=${input}&apiType=json&searchType=&sort=`);
//         console.log(response.status);
//         const doc = new dom().parseFromString(response.data, 'text/xml');
//         const nodes = xpath.select("/root/result/item", doc);
//         const result = [];
//         for (i = 0; i < nodes.length; i++) {
//             var title_node = xpath.select("title_info", nodes[i]);
//             const title = title_node[0].firstChild.data;
//             var isbn_node = xpath.select("isbn", nodes[i]);
//             var isbn = "";
//             if (isbn_node[0].firstChild) {
//                 isbn = isbn_node[0].firstChild.data;
//             }
//             const result_item = { title: title, isbn: isbn };
//             console.log(result_item);
//             result.push(result_item);
//         }
//         res.send(result);
//     } catch (error) {
//         //응답 실패
//         console.error(error);
//     }
// })


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

// list 페이지에서 상품목록을 구현.. 
// router.get('/productlist', (req, res) => {

//     let keyword = '추천도서'

//     const url = `https://www.nl.go.kr/NL/search/openApi/searchKolisNet.do?key=39b4dd4a523f80ea24ba476b79fc50c968db9622ffd612dc415b4176e41ccadd&apiType=json&kwd=${keyword}&apiType=json`;
//     const encodeUrl = encodeURI(url)

//     axios.get(encodeUrl)
//         .then(apiResponse => {
//             // 오픈 API로부터 응답을 성공적으로 받으면, 그 데이터를 클라이언트에게 전송
//             res.json(apiResponse.data);
//         })
//         .catch(error => {
//             // 외부 API 요청 중 에러가 발생하면, 에러 메시지를 로그에 기록하고 클라이언트에게 에러 응답을 전송
//             console.error('Error:', error);
//             res.status(500).send('외부 API 요청 실패');
//         });
// });

// paging1 방식
router.get("/listpage1/:page/:count", async (req, res, next) => {
    const page = Number(req.params.page) // 페이지번호
    const count = Number(req.params.count) // 한페이지 당 보여줄 페이지 개수
    console.log('page', page, 'count', count)
    productDAO.listpage1(page, count, (resp) => {
        res.json(resp);
    });
})



// 화면메인 부분 - 준영님


router.get("/detail/:id", function (req, res, next) {
    console.log("디테일 불러오기");
    const id = req.params.id;
    productDAO.detail({ product_id: id }, (resp) => {
        //productDAO.detail 함수의 매개변수로는 객체를 받도록 정의되어 있으니까 객체 안에 담아야함
        res.json(resp);
    });
}); //성공

router.post("/bidding", (req, res, next) => {
    console.log("낙찰페이지 불러오기");
    const data = req.body;
    productDAO.bidding(data, (resp) => {
        res.json(resp);
    });
});

router.get("/biddingTable", function (req, res, next) {
    console.log("낙찰테이블 불러오기");
    productDAO.biddingTable((resp) => {
        res.json(resp);
    });
}); //성공

// 마이페이지용 
router.get("/:email", async (req, res, next) => {
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

router.post("/selectbid", async (req, res, next) => {
    const pId = req.body.pId;
    const selectedAucId = req.body.selectedAucId;
    productDAO.bidWrite(pId, selectedAucId, (resp) => {
        res.json(resp);
    });
});
// router.get("/", function (req, res) {
//   res.send("products.ok");
// });

// router.get("/detail/:id", function (req, res) {
//   res.send("detail.ok");
// });

// router.get("/bidding", function (req, res) {
//   res.send("bidding.ok");
// });

router.get('/search', async function (req, res, next) {
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
        for (i = 0; i < nodes.length; i++) {
            var title_node = xpath.select("title_info", nodes[i]);
            const title = title_node[0].firstChild.data;
            var id_node = xpath.select("id", nodes[i]);
            var id = "";
            if (id_node[0].firstChild) {
                id = id_node[0].firstChild.data;
            }
            const result_item = { title: title, id: id };
            console.log(result_item);
            result.push(result_item);
        }
        res.send(result);
    } catch (error) {
        //응답 실패
        console.error(error);
    }
})

module.exports = router
