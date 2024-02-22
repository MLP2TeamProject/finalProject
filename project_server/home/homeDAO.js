const getPool = require('../common/pool');

const sql = {
	productList: "SELECT product_id, title, picture FROM product WHERE auction_id is NULL ORDER BY product_id DESC LIMIT 0, 4;",
	auctionList: `SELECT A.auction_id, A.product_id, A.picture, A.auction_price, P.title
	FROM product AS P 
	LEFT JOIN auction AS A ON A.product_id = P.product_id && P.auction_id is NULL
	ORDER BY A.auction_id DESC limit 0, 4`
};

const homeDAO = {
	newBuy: async (callback) => {
		let conn = null
		try {
			conn = await getPool().getConnection()
			const [resp] = await conn.query(sql.productList, [])
			// console.log('00', resp)
			callback({ status: 200, message: 'OK', data: resp })
		} catch (error) {
			return { status: 500, message: '조회 실패', error: error }
		} finally {
			if (conn !== null) conn.release()
		}
	},

	auctionBuy: async (callback) => {
		let conn = null
		try {
			conn = await getPool().getConnection()
			const [resp] = await conn.query(sql.auctionList, [])
			// console.log('11', resp)
			callback({ status: 200, message: 'OK', data: resp })
		} catch (error) {
			return { status: 500, message: '조회 실패', error: error }
		} finally {
			if (conn !== null) conn.release()
		}
	},
};

module.exports = homeDAO;