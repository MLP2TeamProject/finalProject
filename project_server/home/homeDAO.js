const getPool = require('../common/pool');

const sql = {
	productList: "SELECT * FROM product ORDER BY product_id DESC LIMIT 0, 4",
	auctionList: "SELECT * FROM auction ORDER BY auction_id DESC LIMIT 0, 4",
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