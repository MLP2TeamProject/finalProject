const getPool = require('../common/pool')

const sql = {
    checkMyBidding: `SELECT A.picture, A.auction_price, A.createAt, A.product_id, P.title, P.auction_id, P.endtime,
    (SELECT email FROM auction AS A2 WHERE A2.auction_id = P.auction_id) AS selectedEmail 
    FROM auction AS A INNER JOIN product AS P 
    ON A.product_id = P.product_id  WHERE A.email = ?`,
}

const auctionDAO = {
    // 상품 입찰 정보 조회
    auctionList: async (email, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            // 해당 유저의 입찰한 정보 가져오기 
            const [aucList] = await conn.query(sql.checkMyBidding, [email])
            if(aucList[0]) {
                console.log('입찰리스트',aucList)
                callback({status:200, data: aucList})
            }
        } catch(e) {
            console.log(e)
            return {status: 500, message: '입찰정보 조회실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }        
    },
}

module.exports = auctionDAO
