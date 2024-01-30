const express = require("express");
const router = express.Router();
const productDAO = require("./productDAO");
const axios = require('axios')
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

module.exports = router;