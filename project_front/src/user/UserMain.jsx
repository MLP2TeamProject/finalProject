import { useState, useCallback, useContext, useEffect } from "react"
import axios from 'axios'
import UserContext from "../userContext"
import { useNavigate } from 'react-router'

const UserMain = () => {

    // 회원가입 
    const [userData, setUserData] = useState({name: '', email: '', password: ''})

    const changeData = useCallback((e) => {
        setUserData((userData)=> ({...userData, [e.target.name]: e.target.value}))
    }, [])

    const signup = useCallback(async (e)=>{
        e.preventDefault()
        console.log(userData)
        // 서버연동
        const resp = await axios.post('http://localhost:8000/users/signup', userData)
        if(resp.data.status === 500) window.alert('사용자가 존재합니다.')
        // 첫화면으로 화면전환
        else window.alert('회원가입 성공')
    }, [userData])

    const navigate = useNavigate()
    
    // 로그인
    // 로그인 인풋 상태 
    const [userLogin, setUserLogin] = useState({loginEmail: '', loginPassword: ''})
    const changeLogin = useCallback((e) => {
        setUserLogin((userLogin)=> ({...userLogin, [e.target.name]: e.target.value}))
    }, [])
    
    // 컨텍스트 이용 
    const context = useContext(UserContext)
    useEffect(()=>{
        console.log('컨택스트API', context.state.userData)
    }, [])

    const signin = useCallback(async (e)=>{
        e.preventDefault()
        // console.log('로그인정보', userLogin)
        const resp = await axios.post('http://localhost:8000/users/signin', userLogin, { withCredentials: true })
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            window.alert(resp.data.message)
            console.log('로그인한정보',resp.data.data)
            context.action.loginUser({email:resp.data.data.email, user_name:resp.data.data.user_name})
            sessionStorage.setItem("email", resp.data.data.email)
            sessionStorage.setItem("user_name", resp.data.data.user_name)
            navigate('/login')
        }
    }, [userLogin])

    // 로그아웃
    const logout = async (e) => {
        e.preventDefault()
        const resp = await axios.get('http://localhost:8000/users/logout', { withCredentials: true })
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            window.alert(resp.data.message)
            context.action.loginUser({email:'', user_name:''})
            sessionStorage.removeItem("email")
            sessionStorage.removeItem("user_name")
            navigate('/')
        }
    }

    return (
        <section className="breadcrumb breadcrumb_bg">
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                <div className="breadcrumb_iner">
                    <div className="breadcrumb_iner_item">
                        <h1>회원가입</h1>
                        이름 : <input type="text" name='name' id='name' value={userData.name} onChange={changeData} /><br />
                        이메일 : <input type="text" name='email' id='email' value={userData.email} onChange={changeData} /><br />
                        비밀번호 : <input type="password" name='password' id='password' value={userData.password} onChange={changeData} /><br />
                        <button type="button" onClick={signup}>회원가입</button>
                    </div>

                    <div className="breadcrumb_iner_item">
                        <h1>로그인</h1>
                        {context.state.userData.email ? (
                            <>
                                <p>{context.state.userData.user_name}님 로그인되었습니다.</p>
                                <button type='button' onClick={logout}>로그아웃</button>
                            </>
                        ) : (
                            <>
                                이메일 : <input type="text" name='loginEmail' id='loginEmail' value={userLogin.loginEmail} onChange={changeLogin} /><br />
                                비밀번호 : <input type="password" name='loginPassword' id='loginPassword' value={userLogin.loginPassword} onChange={changeLogin} /><br />
                                <button type="button" onClick={signin}>로그인</button>
                            </>
                        )}
                        
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default UserMain