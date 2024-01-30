//데이터베이스와 상호작용
const getPool = require("../common/pool");

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
    }
}

module.exports = productDAO;