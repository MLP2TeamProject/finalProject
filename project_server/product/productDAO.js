//데이터베이스와 상호작용
const getPool = require("../common/pool");
const axios = require('axios');

const sql = {
    productList: "select * from product",
    buy: "update product set auction_status = '?' where product_id = ?",
};

const productDAO = {

    productList: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [resp] = await conn.query(sql.productList, [])
            console.log('1010', resp)
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            return { status: 500, message: '조회 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },



    buy: async (item, callback) => {
        let conn = null;
        try {
            conn = await getPool().getConnection();
            // auction 테이블에 구매 정보 기록 하나씩 전부 받아야 하는건가..? 빈 배열은?
            // 'product' 테이블의 상태 업데이트
            await conn.query(sql.buy, [
                item.product_id,
                item.title,
                item.email,
                item.master_price,
                item.auction_id,
                item.isbn,
            ]);
            console.log("22222", resp)
            // 콜백으로 성공 응답 전송
            callback(null, { status: 200, message: "구매 신청 완료" });
        } catch (error) {
            return { status: 500, message: '구매 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },

    // 페이지네이션
    listpage1: async (page, count, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [totalCount] = await conn.query(sql.totalProducts)
            const [result] = await conn.query(sql.listOnepage, [(page - 1) * count, count])
            if (result) callback({ status: 200, data: result, totalCount: totalCount[0].TOTALCOUNT })
            else callback({ status: 500, message: '결과없음' })
        } catch (e) {
            console.log(e)
            return { status: 500, message: "상품조회실패", error: e }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    listpage: async (page, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [items] = await conn.query(sql.productList)
            //한페이지에 2개 item 가정
            const responseData = items.slice((page - 1) * 2, page * 2)
            //totalItems : 항목 갯수
            //perPage: 한 페이지당 항목 수
            if (responseData) callback({ status: 200, totalItems: items.length, perPage: 2, data: responseData })
            else callback({ status: 500, message: '결과없음' })
        } catch (e) {
            console.log(e)
            return { status: 500, message: "상품조회실패", error: e }
        } finally {
            if (conn !== null) conn.release()
        }
    },
// -------------------------------------------------------------------------------------------------------------







detail: async (item, callback) => {
    //item 매개변수로 조회하고자 하는 상품의 정보가 담긴 객체를 받음
    let conn = null;
    try {
        conn = await getPool().getConnection();
        const [resp] = await conn.query(sql.detail, [item.product_id]); //바인딩할 변수가 필요 sql 쿼리에서 사용하는 ?자리를 채워놓음
        callback({ status: 200, message: "ok", data: resp });
    } catch (error) {
        return { status: 500, message: "디테일 불러들이기 실패", error: error };
    } finally {
        if (conn !== null) conn.release();
    }
},

    bidding: async (item, callback) => {
        let conn = null;
        try {
            conn = await getPool().getConnection();
            const [resp] = await conn.query(sql.bidding, [
                item.auction_id,
                item.product_id,
                item.email,
                item.auction_price,
                item.picture,
                item.product_status,
                item.createAt,
            ]);
            callback({ status: 200, message: "ok", data: resp });
        } catch (error) {
            return { status: 500, message: "입찰 실패", error: error };
        } finally {
            if (conn !== null) conn.release();
        }
    },

        biddingTable: async (item, callback) => {
            let conn = null;
            try {
                conn = await getPool().getConnection();
                const [resp] = await conn.query(sql.biddingTable, [
                    item.email,
                    item.auction_price,
                    item.product_status,
                ]);
                callback({ status: 200, message: "ok", data: resp });
            } catch (error) {
                return { status: 500, message: "입찰 테이블 조회 실패", error: error };
            } finally {
                if (conn !== null) conn.release();
            }
        },

    // 상품, 유경님
    detail: async (item, callback) => {
        let conn = null;
        try {
            console.log("dao detail", item.product_id);
            conn = await getPool().getConnection();
            const [resp] = await conn.query(sql.detail, [item.product_id]);
            //바인딩할 변수가 필요 sql 쿼리에서 사용하는 ?자리를 채워놓음
            // callback({ status: 200, message: "ok", data: Array.isArray(resp) ? resp[0] : resp })
            if (resp !== null && resp.length > 0) {
                const [auction_resp] = await conn.query(sql.detail_auction, [
                    item.product_id,
                ]);
                resp[0]["auctions"] = auction_resp; //??? 배열의 첫 번째 요소(상품정보)에 auctions라는 키로 경매 정보를 추가
                console.log(resp);
            }
            // 여기 if문 추가
            callback({ status: 200, message: "ok", data: resp });
        } catch (error) {
            console.log(error);
            return { status: 500, message: "디테일 불러들이기 실패", error: error };
        } finally {
            if (conn !== null) conn.release();
        }
    },

    //상품 정보 수정 : 글작성자 권한이 있는 사람만이 수정 가능
    update: async (item, callback) => {
        let conn = null;
        try {
            conn = await getPool().getConnection();
            const [resp] = await conn.query(sql.update, [
                item.master_price,
                item.content,
                item.product_id,
            ]);
            callback({ status: 200, message: "ok" });
        } catch (error) {
            return { status: 500, message: "게시글 수정 실패", error: error };
        } finally {
            if (conn !== null) conn.release();
        }
    },

    bidding: async (data, callback) => {
        let conn = null;
        try {
            console.log("1", data);
            conn = await getPool().getConnection();
            const [result] = await conn.query(sql.insertAuction, [
                data.product_id,
                data.email,
                data.auction_price,
                data.picture,
                data.product_status,
            ]);
            if (result) {
                const [bookInfo] = await conn.query(sql.checkBookTitle, [
                    data.product_id,
                ]); //insert성공하면 책 정보를 db에서 조회, bookinfo에 결과 할당하기
                console.log("5", bookInfo);
                callback({
                    status: 200,
                    message: "입찰성공",
                    data: {
                        file_name: data.picture,
                        auction_price: data.auction_price,
                        title: bookInfo[0].title,
                        isbn: bookInfo[0].isbn,
                    }, //경매삽입, 책정보조회 성공하면 성공 응답 전송
                });
            }
        } catch (e) {
            console.log(e);
            return { status: 500, message: "입찰실패", error: e };
        } finally {
            if (conn !== null) conn.release();
        }
    },


    // 마이페이지 : 회원 구매 등록, 입찰 정보 조회
    buyBooks: async (email, callback) => {
        let conn = null;
        try {
            conn = await getPool().getConnection();
            const [books] = await conn.query(sql.checkProductAuction, [email]);
            console.log("북스", books);
            if (books != []) {
                callback({ status: 200, data: books });
            } else {
                callback({ status: 200, data: "구매등록한 책이 없습니다." });
            }
        } catch (e) {
            console.log(e);
            return { status: 500, message: "회원 구매등록 조회실패", error: e };
        } finally {
            if (conn !== null) conn.release();
        }
    },

    bidWrite: async (pId, selectedAucId, callback) => {
        let conn = null;
        try {
            conn = await getPool().getConnection();
            console.log("넘어온 데이타", pId, selectedAucId);
            const [selectedResult] = await conn.query(sql.selectBidd, [
                selectedAucId,
                pId,
            ]);
            console.log("업데이트 결과", selectedResult);
            if (selectedResult) callback({ status: 200, data: "낙찰완료" });
            else callback({ status: 200, data: "낙찰실패" });
        } catch (e) {
            console.log(e); // sql query를 날린 후 정상동작이 안된다면 여기서 로그 확인해보기
            return { status: 500, message: "낙찰 입력 실패", error: e };
        } finally {
            if (conn !== null) conn.release();
        }
    },
};

module.exports = productDAO;