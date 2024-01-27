const bcrypt = require('bcrypt')
const getPool = require('../common/pool')

const sql = {
    // sql구문
    // ? 는 프로그램 데이터가 들어갈 자리
    checkId: 'SELECT * FROM users WHERE email = ?',
    updatePw: 'UPDATE users SET pwd=? WHERE email= ?',
    checkBuyBooks: 'SELECT * FROM product WHERE email= ?',
    checkBids: 'SELECT * FROM auction WHERE product_id= ?',
    checkMyBid: 'SELECT * FROM auction WHERE email= ?',
    deleteAcc: 'DELETE FROM users WHERE email = ?',
    deleteBuyBooks: 'DELETE FROM product WHERE email= ?',

    signup: "INSERT INTO users (user_name, email, pwd, address, phone) VALUES (?, ?, ?, '서울시', '01033334444')",
}

// DAO(Data Access Object) - DBMS연동처리
const userDAO = {
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
                            if(newPassword) callback({status: 200, message: '비밀번호 수정 성공'})
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

    // 회원가입
    signup: async (item, callback) => {
        // console.log('user DAO, signup이 콜되었다.')
        let conn = null
        try {
            // 정상실행 로직
            // pool에서 connection 1개를 획득
            conn = await getPool().getConnection()
            console.log('회원가입 DAO', item)
            // email check sql 문 실행
            const [respCheck] = await conn.query(sql.checkId, item.email) // item.email를 ?에 대입
            if (respCheck[0]) {
                // console.log('respCheck', respCheck)
                // 이메일로 select되는 데이터가 있다면, 이미 가입된 회원이다
                callback({status:500, message:'사용자가 존재합니다.'})
            } else {
                // 회원가입. table에 insert
                // 유저패스워드는 hash문자열로 변형시켜서 저장 
                const salt = await bcrypt.genSalt()
                // bcrypt.hash : bcrypt 라이브러리를 사용하여 비밀번호를 해시화
                // item.password : 해시화할 원본 비밀번호
                // salt : bcrypt에서 사용하는 salt 값으로, 해시 과정에서 추가적인 보안을 제공
                // async (error, hash) => {} : 해시 생성이 완료되면 콜백 함수가 호출. 콜백 함수는 두 개의 매개변수를 받습니다.
                //   error : 해시 생성 중 발생한 오류, hash : 생성된 해시 값, 
                bcrypt.hash(item.password, salt, async (error, hash) => {
                    if(error) callback({status: 500, message: '암호화 실패', error: error})
                    else {
                        // db insert
                        const [resp] = await conn.query(sql.signup, [item.name, item.email, hash])
                        callback({status: 200, message: 'OK', data: resp})
                    }
                })
            }
        } catch(error) {
            // 에러발생시에 실행 로직
            return {status: 500, message: '유저 입력 실패', error: error}
        } finally {
            // 마지막에 항상 실행되는 로직
            // 사용했던 connection을 pool에 반환해서 다른 곳에서 사용할 수 있도록.
            if(conn !== null) conn.release()
        }
    },

    // 로그인
    signin: async (item, callback) => {
        let conn = null
        try {
            conn = await getPool().getConnection()
            console.log('로그인 DAO', item)
            // email check sql 문 실행
            const [respCheck] = await conn.query(sql.checkId, item.loginEmail) // item.email를 ?에 대입
            if (respCheck[0]) {
                // item.loginPassword : 해쉬할 넘어온 비번 
                bcrypt.compare(item.loginPassword, respCheck[0].pwd, async (error, result)=>{
                    // 비밀번호 일치
                    console.log('1', result) 
                    if(result) {
                        callback({status:200, message: '로그인 성공', data:{user_name: respCheck[0].user_name, email: respCheck[0].email}}) 
                    } else if(error) {
                        callback({status:500, message: '비밀번호가 맞지않습니다.'}) 
                    }
                })
                // if(item.loginPassword === respCheck[0].pwd) {
                //     callback({status:200, message:'로그인성공', data:{user_name: respCheck[0].user_name, email: respCheck[0].email}})
                // } else {
                //     callback({status:200, message:'비밀번호가 틀렸습니다.'})
                // }
            } else {
                callback({status:500, message:'해당 유저가 없습니다.'})
            }
        } catch(error) {
            // 에러발생시에 실행 로직
            return {status: 500, message: '유저 입력 실패', error: error}
        } finally {
            // 마지막에 항상 실행되는 로직
            // 사용했던 connection을 pool에 반환해서 다른 곳에서 사용할 수 있도록.
            if(conn !== null) conn.release()
        }
    }
}

module.exports = userDAO