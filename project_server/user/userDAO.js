const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

const sql = {
    // 이메일 중복 체크
    checkId: 'SELECT * FROM users WHERE email = ?',
    signup: 'INSERT INTO users (email, user_name, pwd, phone, address) VALUES (?, ?, ?, ?, ?)',
}

const userDAO = {
    // item = 클라이언트 요청 데이터
    signup: async (item, callback) => {
        let conn = null
        try {
            // 정상적으로 실행될 로직
            conn = await getPool().getConnection();
            console.log('연결 성공 dao=', item);

            //email 체크
            const [respCheck] = await conn.query(sql.checkId, item.email);

            console.log('이메일 체크 결과 = ', respCheck);
            if (respCheck[0]) {
                console.log('이메일 이미 존재함.');
                // email로 select했을 때 나오는 데이터가 있다면 이미 가입된 회원
                callback({ status: 500, message: '이미 가입된 이메일입니다.' })
            } else {
                // DB에 insert
                console.log('이메일 존재하지 않음.')
                const salt = await bcrypt.genSalt();
                bcrypt.hash(item.pwd, salt, async (error, hash) => {
                    if (error) {
                        console.log('암호화 실패');
                        callback({ status: 500, message: '암호화 실패', error: error });                    }
                    else {
                        console.log("암호화 성공. 데이터 삽입 시도...");
                        const [resp] = await conn.query(sql.signup, [item.email, item.user_name, hash, item.phone, item.address]);
                        console.log("데이터 삽입 성공... 결과 반환....");
                        callback({ status: 200, message: 'OK', data: resp });
                    }
                })
            }
        } catch (error) {
            // 에러 발생 시 대처 로직
            return { status: 500, message: '유저 등록 실패', error: error }
        } finally {
            // 최종적으로 실행될 반환 로직
            if (conn !== null) conn.release()
        }
    },
    login: async (item, callback) => { 
        const { email, pwd } = item
        let conn = null
        try {
            console.log('00')
            conn = await getPool().getConnection()
            console.log('11')
            //sql 실행
            const [users] = await conn.query(sql.checkId, [email])
            console.log('22', users)
            if (!users[0]) {
                //db 에 데이터가 없음
                callback({ status: 500, message: '아이디,패스워드를 확인해 주세요.' })
            } else {
                //db 데이터 있음 비교
                console.log('33', pwd, users[0].pwd)
                //db 에 비밀번호가 해시로 저장되어 있어서 해시로 만들어 비교
                bcrypt.compare(pwd, users[0].pwd, async (error, result) => {
                    if (error) {
                        callback({ status: 500, message: '아이디, 패스워드를 확인해 주세요' })
                    } else if (result) {
                        console.log('44')
                        callback({
                            status: 200, message: 'OK',
                            data: { name: users[0].user_name , email: users[0].email }
                        })
                    } else {
                        callback({ status: 500, message: '아이디, 패스워드를 확인해 주세요' })
                    }
                })
            }
        } catch (e) {
            return { status: 500, message: '로그인 실패', error: error }
        } finally {
            if (conn !== null) conn.release()
        }
    }
}

module.exports = userDAO