const getPool = require('../common/pool')

//이곳에 필요한 sql 등록.. 
const sql = {
    // 고객센터 - 공지에 관련된 sql
    // noticeBoardList: 'SELECT * FROM notice_board ORDER BY notice_id DESC',
    noticeInsert: 'INSERT INTO notice_board (title, content, email) VALUES (?,?,?)',
    noticeBoard: 'SELECT * FROM notice_board WHERE notice_id = ?',
    noticeDelete: 'DELETE FROM notice_board WHERE notice_id = ?',
    noticeUpdate: 'UPDATE notice_board SET title = ?, content = ? WHERE notice_id = ?',

    // pagination
    totalBoards: "SELECT COUNT(notice_id) as TOTALCOUNT FROM notice_board",
    listOnepage: "SELECT * FROM notice_board ORDER BY notice_id DESC LIMIT ?, ?", // 내림차순 정렬
    // listOnepage: "SELECT * FROM notice_board LIMIT ?, ?",
}

const boardDAO = {

    // ---------- pagination board 관련 ------------------
    listpage1: async (page, count, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [totalCount] = await conn.query(sql.totalBoards)
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

    // ---------- notice board 관련 ------------------
    noticeInsert: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.noticeInsert, [item.title, item.content, item.email])

            console.log(resp, item)

            console.log('noticeinsert_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            console.log(error)
            return { status: 500, message: '공지 입력 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    noticeBoard: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.noticeBoard, item)

            console.log('noticedetail_ss')
            console.log(item)
            callback({ status: 200, message: 'OK', data: resp[0] })
        } catch (error) {
            console.log(error)
            return { status: 500, message: '공지 자세히 보기 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    noticeDelete: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            console.log(item)
            const [resp] = await conn.query(sql.noticeDelete, item)//item - id

            console.log('noticedelete_ss')
            callback({ status: 200, message: 'OK' })
        } catch (error) {
            console.log(error)
            return { status: 500, message: '공지 지우기 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    noticeUpdate: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.noticeUpdate, [item.title, item.content, item.notice_id])

            console.log('noticeupdate_ss', resp)
            callback({ status: 200, message: 'OK' })
        } catch (error) {
            console.log(error)
            return { status: 500, message: '입력 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
}
module.exports = boardDAO