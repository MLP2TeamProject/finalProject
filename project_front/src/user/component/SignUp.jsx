import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    //path 조정 
    const navigate = useNavigate()

    //내용 입력
    const [data, setData] = useState({email: '', user_name: '', pwd: '', phone:'', address:''})
    //유저 입력 변경 함수

    const changeData = useCallback((e) => {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }, [])

    //submit 버튼 클릭 후 함수
    const signup = useCallback(async (e) => {
        e.preventDefault()
        //서버 연동
        const resp = await axios.post('http://localhost:8000/users/signup', data)
        if (resp.data.status === 500) window.alert('이미 가입된 이메일 입니다.')
        //첫 화면으로 이동
        else navigate('/')
    }, [data, navigate])
    return (
        <main>
        <section className="login_part padding_top mb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_text text-center">
                            <div className="login_part_text_iner">
                            <h2>BMIC에 처음 방문하셨나요?</h2>
                            <p>
                                회원가입 후 다양한 혜택을 누려보세요. <br />
                                BMIC에서는 다양한 절판희귀도서를 역경매 방식으로 <br />
                                구매하고 판매할 수 있습니다.
                            </p>
                                {/* <h2>New to our Shop?</h2>
                                <p>There are advances being made in science and technology
                                    everyday, and a good example of this is the</p>
                                <a href="#" className="btn_3">Create an Account</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_form">
                            <div className="login_part_form_iner">
                                <h3>Welcome! <br/>
                                    Please Sign up now</h3>
                                <form className="row contact_form" action="#" method="post" novalidate="novalidate">
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" className="form-control" id="email" name="email" value={data.email} placeholder="이메일"
                                            onChange={changeData}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" className="form-control" id="user_name" name="user_name" value={data.user_name} placeholder="이름"
                                            onChange={changeData}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="password" className="form-control" id="pwd" name="pwd" value={data.pwd} placeholder="비밀번호"
                                            onChange={changeData}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" className="form-control" id="phone" name="phone" value={data.phone} placeholder="핸드폰 번호"
                                            onChange={changeData}/>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input type="text" className="form-control" id="address" name="address" value={data.address} placeholder="주소"
                                            onChange={changeData}/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="btn_3" onClick={signup}>
                                            회원가입
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    )
}

export default SignUp