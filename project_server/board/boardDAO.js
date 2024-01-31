const getPool = require('../common/pool')

//이곳에 필요한 sql 등록.. 
const sql = {
    // 고객센터 - 공지에 관련된 sql
    // noticeBoardList: 'SELECT * FROM notice_board ORDER BY notice_id DESC',
    noticeInsert: 'INSERT INTO notice_board (title, content) VALUES (?,?)',
    noticeBoard: 'SELECT * FROM notice_board WHERE notice_id = ?',
    noticeDelete: 'DELETE FROM notice_board WHERE notice_id = ?',
    noticeUpdate: 'UPDATE notice_board SET title = ?, content = ? WHERE notice_id = ?',

    // 고객센터 - FAQ에 관련된 sql 
    faqBoardList: 'SELECT * FROM faqboard',

    // pagination
    pagination1: 'SELECT * from notice_board ORDER BY notice_id DESC limit 0,13',
    pagination2: 'SELECT * from notice_board ORDER BY notice_id DESC limit 13,13',
    pagination3: 'SELECT * from notice_board ORDER BY notice_id DESC limit 26,13',
}

const boardDAO = {

    // ---------- pagination board 관련 ------------------
    // pagination1: async (item,callback) => {
    //     let conn = null
    //     try {
    //         conn = await getPool().getConnection()

    //         const [resp] = await conn.query(sql.pagination1, [item.limit])

    //         console.log('noticelist_pagination1_ss')
    //         callback({ status: 200, message: 'OK', data: resp })
    //     } catch (error) {
    //         return { status: 500, message: '공지 목록1 조회 실패', error: error }
    //     } finally {
    //         if (conn !== null) conn.release()
    //     }
    // },
    pagination1: async (callback) => {
        let conn = null
        try {
            console.log('dao-00')
            conn = await getPool().getConnection()

            console.log('dao-11')
            const [resp] = await conn.query(sql.pagination1, [])

            console.log('dao-22')
            console.log('noticelist_pagination1_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            return { status: 500, message: '공지 목록1 조회 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    pagination2: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.pagination2, [])

            console.log('noticelist_pagination2_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            return { status: 500, message: '공지 목록2 조회 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    pagination3: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.pagination3, [])

            console.log('noticelist_pagination3_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            return { status: 500, message: '공지 목록3 조회 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },

    // ---------- notice board 관련 ------------------
    //게시물 조회 요청이 들어왔을 때 router 에 의해 실행.. dbms
    noticeBoardList: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.noticeBoardList, [])

            console.log('noticelist_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            return { status: 500, message: '공지 목록 조회 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    noticeInsert: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.noticeInsert, [item.title, item.content])

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
            // console.log(item)
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

    // ---------- faq board 관련 ------------------
    faqBoardList: async (callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [resp] = await conn.query(sql.faqBoardList, [])
            console.log('faqlist_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            return { status: 500, message: 'FAQ 조회 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    faqInsert: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.faqInsert, [item.name, item.title, item.content])

            console.log('faqinsert_ss')
            callback({ status: 200, message: 'OK', data: resp })
        } catch (error) {
            console.log(error)
            return { status: 500, message: 'FAQ 입력 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    faqBoard: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.faqBoard, item)

            console.log('faqdetail_ss')
            callback({ status: 200, message: 'OK', data: resp[0] })
        } catch (error) {
            console.log(error)
            return { status: 500, message: 'FAQ 자세히 보기 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    faqDelete: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.faqDelete, item)//item - id

            console.log('faqdelete_ss')
            callback({ status: 200, message: 'OK' })
        } catch (error) {
            console.log(error)
            return { status: 500, message: 'FAQ 삭제 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },
    faqUpdate: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()

            const [resp] = await conn.query(sql.faqUpdate, [item.title, item.content, item.id])

            console.log('faqupdate_ss')
            callback({ status: 200, message: 'OK' })
        } catch (error) {
            console.log(error)
            return { status: 500, message: 'FAQ 수정 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    },

}
module.exports = boardDAO