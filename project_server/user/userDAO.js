const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

const sql = {
    // sql구문
    // ? 는 프로그램 데이터가 들어갈 자리
    updatePw: 'UPDATE users SET pwd=? WHERE email= ?',
    checkBuyBooks: 'SELECT * FROM product WHERE email= ?',
    checkBids: 'SELECT * FROM auction WHERE product_id= ?',
    checkMyBid: 'SELECT * FROM auction WHERE email= ?',
    deleteAcc: 'DELETE FROM users WHERE email = ?',
    deleteBuyBooks: 'DELETE FROM product WHERE email= ?',

    // signin, signup 이메일 중복 체크
    checkId: 'SELECT * FROM users WHERE email = ?',
    signup: 'INSERT INTO users (email, user_name, pwd, phone, address) VALUES (?, ?, ?, ?, ?)',
}

// DAO(Data Access Object) - DBMS연동처리
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
    },


    // 회원정보 조회
    userinfo: async (email, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            const [user] = await conn.query(sql.checkId, [email])
            if(user[0]) {
                callback({status:200, name: user[0].user_name})
            }
        } catch(e) {
            return {status: 500, message: '회원정보 조회실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }        
    },

    // 회원 비밀번호 수정
    changePw: async (item, callback) => {
        console.log('1',item)
        let conn = null
        try {
            conn = await getPool().getConnection()
            // 회원정보 get
            const [user] = await conn.query(sql.checkId, [item.email])
            console.log('2', user)
            // item.originPw : 해시화할 req의 기존 비밀번호/ item.originPw를 db에 저장된 해시된 비번과 비교
            bcrypt.compare(item.originPw, user[0].pwd, async (error, result)=>{
                if(error) {
                    callback({status:500, message: '암호화 중 오류발생'})
                // 기존 비밀번호 일치 
                } else if(result) {
                    // console.log('3. result', result)
                    // 신규 비번 암호화하여 업데이트 
                    const salt = await bcrypt.genSalt()
                    bcrypt.hash(item.changePw, salt, async (error, hash) => {
                        if(error) callback({status: 500, message: '신규 비번 암호화 실패', error: error})
                        // 암호화 성공시 비밀번호 업데이트  
                        else if(hash) {
                            const [newPassword] = await conn.query(sql.updatePw, [hash, item.email])
                            if(newPassword) callback({status: 200, message: '비밀번호가 수정되었습니다.'})
                            else callback({status: 500, message: '비밀번호 수정 실패'})
                        }
                    })
                } else {
                    callback({status:500, message: '기존 비밀번호가 맞지않습니다.'}) 
                }
            })
        } catch(e) {
            console.log(e)
            return {status: 500, message: '회원정보 조회실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }     
    },

    // 회원탈퇴
    deleteAccount: async (email, callback) => {
        console.log(email)
        let conn = null
        try {
            conn = await getPool().getConnection()
            // 나의 입찰 정보 함수 
            const myBids = async () => {
                const [myBids] = await conn.query(sql.checkMyBid, [email])
                console.log('내가 입찰한 것', myBids)
                return myBids
            }

            // 회원탈퇴 함수
            const leaveSite = async () => {
                const [result] = await conn.query(sql.deleteAcc, [email])
                if(result) {
                    callback({status:200, message:'회원 탈퇴처리되었습니다.', data:'possible'})
                } else {
                    callback({status:500, message:'회원 확인 실패'})
                }
            }
            // 구매 요청한 도서가 있는 지 확인
            const [buyBooks] = await conn.query(sql.checkBuyBooks, [email])
            console.log('1', buyBooks)
            // 도서가 있다면, 입찰된 내용이 있는 지 확인 
            if (buyBooks[0]) {
                const hasBids = await Promise.all(
                    buyBooks.map(async (item) => {
                        const [bidList] = await conn.query(sql.checkBids, item.product_id)
                        console.log('2', bidList)
                        return bidList
                    })
                )
                console.log('3', hasBids)
                // 입찰된 내용이 있다면 회원탈퇴 불가 
                if (hasBids[0][0]) {
                    callback({status:200, message:"구매 희망 도서에 입찰된 내용이 있어 회원 탈퇴가 불가능합니다.", data:'impossible'})
                } else {
                    // 입찰된 내용이 없다면, 내가 입찰한 도서가 있는 지 확인 
                    const hasMyBids = await myBids()
                    console.log('4', hasMyBids)
                    if (hasMyBids.length !== 0) {
                        callback({status:200, message:"입찰한 내용이 있어 회원 탈퇴가 불가능합니다.", data:'impossible'}) 
                    } else {
                        // 회원 탈퇴 가능
                        console.log('1. 탈퇴 가능')
                        // 구매요청한 도서 삭제 
                        const [myBooks] = await conn.query(sql.deleteBuyBooks, [email])
                        console.log('2', myBooks)
                        if(myBooks) {
                            console.log('구매요청 도서 삭제 완료. 회원탈퇴 가능')
                            leaveSite()
                        } 
                    }    
                }
            } else {
                // 입찰한 내용이 있는 지 확인
                console.log('구매요청 도서가 없음') 
                const hasMyBids = await myBids()
                    if (hasMyBids.length !== 0) {
                        callback({status:200, message:"입찰한 내용이 있어 회원 탈퇴가 불가능합니다.", data:'impossible'}) 
                    } else {
                        // 회원 탈퇴 가능 
                        console.log('2. 탈퇴 가능')
                        leaveSite()
                    }    
            }            
        } catch(e) {
            return {status: 500, message: '회원탈퇴 실패', error: e}
        } finally {
            if(conn !== null) conn.release()
        }        
    },
}

module.exports = userDAO