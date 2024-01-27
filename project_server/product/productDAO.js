const getPool = require('../common/pool')

const sql = {
    // sql구문
    // ? 는 프로그램 데이터가 들어갈 자리
    checkProductAuction: `SELECT P.product_id, P.title, P.picture, P.auction_id, 
    GROUP_CONCAT(CONCAT(A.auction_id, ',', A.email, ',', A.auction_price, ',', A.picture) 
    ORDER BY A.auction_price DESC SEPARATOR ';') AS auction_info 
    FROM product AS P  LEFT JOIN auction AS A 
    ON A.product_id = P.product_id WHERE P.email = ? 
    GROUP BY P.product_id, P.title, P.picture, P.auction_id`,
    selectBidd: "UPDATE product SET auction_id = ?, auction_status = 'Y' WHERE product_id = ?"
}

const productDAO = {
    // 회원 구매 등록, 입찰 정보 조회
    buyBooks: async (email, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [books] = await conn.query(sql.checkProductAuction, [email])
            console.log('북스',books)
            if(books != []) {
                callback({status:200, data: books})
            } else {
                callback({status:200, data: '구매등록한 책이 없습니다.'})
            }
        } catch(e) {
            console.log(e)
            return {status: 500, message: '회원 구매등록 조회실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }        
    },

    bidWrite : async (pId, selectedAucId, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            console.log('넘어온 데이타', pId, selectedAucId)
            const [selectedResult] = await conn.query(sql.selectBidd, [selectedAucId, pId])
            console.log('업데이트 결과', selectedResult)
            if(selectedResult) callback({status:200, data: '낙찰완료'})
            else callback({status:200, data: '낙찰실패'})
        } catch(e) {
            console.log(e) // sql query를 날린 후 정상동작이 안된다면 여기서 로그 확인해보기
            return {status: 500, message: '낙찰 입력 실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }  
    },
}

module.exports = productDAO
