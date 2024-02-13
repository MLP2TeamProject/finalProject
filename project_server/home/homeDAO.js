const getPool = require('../common/pool');

const sql = {
	//제품클릭 넘어가게끔
	click: 'DELETE FROM users WHERE email = ?',
};

const homeDAO = {
	clickBooks: async (callback) => {
		let conn = null;
		try {
			console.log('000000');
			conn = await getPool().getConnection();
		} catch (error) {}
	},
};

module.exports = homeDAO;