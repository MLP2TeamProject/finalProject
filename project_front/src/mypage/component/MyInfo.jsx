import { useCallback, useState, useContext } from "react"
import { useNavigate } from 'react-router'
import axios from 'axios'
import UserContext from "../../UserContext"

const MyInfo = () => {

    // context에 공개된 상태,함수를 이용하겠다면 useContext를 이용
    const context = useContext(UserContext)

    // 회원정보 get
    const userEmail = context.state.userData.email 
    const userName = context.state.userData.user_name
    // console.log(userEmail)

    // contextAPI를 안쓰면 사용 
    // const [userName, setUserName] = useState('')
    // const showInfo = useCallback(async ()=>{
    //     const resp = await axios.get('http://localhost:8000/users/' + userEmail)
    //     console.log(resp.data)
    //     if(resp.data.status === 500) window.alert(resp.data.message)
    //     else setUserName(resp.data.name)
    // }, [])

    // useEffect(()=>{
    //     //showInfo()
    // }, [])

    // 비밀번호 변경
    const navigate = useNavigate()
    const [data, setData] = useState({originPw:'', changePw:'', changePwConfirm:''})
    const changeData = useCallback((e) => {
        setData((data)=> ({...data, [e.target.name]: e.target.value}))
    }, [])

    const changePassword = useCallback(async (e) => {
        e.preventDefault()
        if (data.originPw !== '' && data.changePw !== '' && data.changePwConfirm !== '') {
            if (data.changePw === data.changePwConfirm) {
                const resp = await axios.post('http://localhost:8000/users/changePw/', {email: userEmail, originPw:data.originPw, changePw:data.changePw})
                if(resp.data.status === 500) window.alert(resp.data.message)
                else {
                    window.alert(resp.data.message)
                    setData({email:userEmail, originPw:'', changePw:'', changePwConfirm:''})
                }
            } else {
                alert("변경 비밀번호가 맞지않습니다.")
            }
        } else {
            window.alert('항목이 입력되지 않았습니다.')
        }
    }, [data, userEmail])

    // 회원탈퇴
    const deleteAccout = useCallback(async () => {
        const answer = window.confirm("정말로 탈퇴하시겠습니까?")
        if (answer) {
            const resp = await axios.post('http://localhost:8000/users/deleteAccount', {email:userEmail})
            if(resp.data.status === 500) window.alert(resp.data.message)
            else {
                window.alert(resp.data.message)
                if (resp.data.data !== 'impossible') {
                    context.action.loginUser({email:'', user_name:''})
                    sessionStorage.removeItem("email")
                    sessionStorage.removeItem("user_name")
                    navigate('/')
                }
            }
        }
    }, [userEmail, navigate, context.action]) //context.action
    
    return (
        <>
            <section className="cart_area mt-5">
                <div className="container">
                <div className="col-lg-6 col-md-6">
                        <h3>회원정보</h3>
                        <div className="review_item">
                            <div className="media">
                                <div className="d-flex">
                                    <img src="../img/mypage/blank_profile.png" alt="" />  
                                </div>
                                <div className="media-body">
                                    <h4>{userName}</h4>
                                    <div>{userEmail}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-5 mb-5" />
                    <div className="col-lg-6 col-md-6">
                        <h3>비밀번호 수정</h3>
                        <form className="row contact_form">
                            <div className="col-md-12 form-group p_star">
                                <label htmlFor="originPw" className="form-label">기존 비밀번호</label>
                                <input type="password" className="form-control" id="originPw" name="originPw" 
                                value={data.originPw} onChange={changeData} placeholder="기존 비밀번호" />
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label htmlFor="changePw" className="form-label">변경 비밀번호</label>
                                <input type="password" className="form-control" id="changePw" name="changePw" 
                                value={data.changePw} onChange={changeData} placeholder="변경 비밀번호" />
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label htmlFor="changePwConfirm" className="form-label">변경 비밀번호 확인</label>
                                <input type="password" className="form-control" id="changePwConfirm" name="changePwConfirm" 
                                value={data.changePwConfirm} onChange={changeData} placeholder="변경 비밀번호 확인" />
                            </div>
                            <div className="col-md-12 form-group">
                                <button type="button" className="btn_3" onClick={changePassword}>
                                    비밀번호 수정
                                </button>
                            </div>
                        </form>                        
                    </div>
                    <hr className="mt-5 mb-5" />
                    <div className="col-lg-6 col-md-6">
                        <h3>회원탈퇴</h3>
                        <button type="button" className="btn_3 genric-btn danger-border circle" onClick={deleteAccout}>
                            탈퇴
                        </button>                     
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyInfo 