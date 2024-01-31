const getPool = require('../common/pool')

const sql = {
    // sql구문
    // ? 는 프로그램 데이터가 들어갈 자리
    checkMyBidding: 'SELECT * FROM auction WHERE email = ?',
    checkProductName: 'SELECT title, auction_id FROM product WHERE product_id = ?',
    checkSelectedAucEmail: 'SELECT email FROM auction WHERE auction_id = ?'
}

const auctionDAO = {
    // 상품 입찰 정보 조회
    auctionList: async (email, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            // 해당 유저의 입찰한 정보 가져오기 
            const [aucList] = await conn.query(sql.checkMyBidding, [email])
            let aucInfo = []
            if(aucList[0]) {
                async function fetchData() {       
                    // 입찰한 정보에서 product_id를 가지고 product 테이블에서 title을 get   
                    await Promise.all(aucList.map(async (item) => {
                        // console.log('아이템',item)
                        const [booktitle] = await conn.query(sql.checkProductName, [item.product_id])
                        // console.log('북정보', booktitle[0])
                        let selectedAucEmail = ''
                        if (booktitle[0].auction_id) {
                            selectedAucEmail = await conn.query(sql.checkSelectedAucEmail, [booktitle[0].auction_id])
                        }
                        aucInfo.push({ title: booktitle[0], selectedAucEmail: selectedAucEmail[0], auction: item })
                    }))
                    callback({status:200, data: aucInfo})
                }
                fetchData()
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
