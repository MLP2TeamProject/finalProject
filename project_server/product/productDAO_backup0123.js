const getPool = require('../common/pool')

const sql = {
    // sql구문
    // ? 는 프로그램 데이터가 들어갈 자리
    checkProduct: 'SELECT * FROM product WHERE email = ?',
    checkAuction: 'SELECT * FROM auction WHERE product_id = ? ORDER BY auction_price DESC',
    selectBidd: "UPDATE product SET auction_id = ?, auction_status = 'Y' WHERE product_id = ?"
}

const productDAO = {
    // 회원 구매 등록, 입찰 정보 조회
    buyBooks: async (email, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [books] = await conn.query(sql.checkProduct, [email])
            // console.log('북스',books)
            let bookInfo = []
            if(books != []) {
                async function fetchData() {                
                    await Promise.all(books.map(async (item) => {
                        const [aucList] = await conn.query(sql.checkAuction, [item.product_id])
                        // console.log('옥션리스트', aucList)
                        bookInfo.push({ product_id: item.product_id, title: item.title, picture: item.picture, 
                            auction_id: item.auction_id, auclist: aucList })
                    }));
                    // console.log('북인포',bookInfo)
                    callback({status:200, data: bookInfo})
                }
                fetchData()
            } else {
                callback({status:200, data: '구매등록한 책이 없습니다.'})
            }

        } catch(e) {
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
