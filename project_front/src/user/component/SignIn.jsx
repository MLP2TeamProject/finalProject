import React, { useCallback, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../userContext'

const SignIn = () => {

    const navigate = useNavigate()
    const context = useContext(UserContext)

    const [data, setData] = useState({ email: '', pwd: '' })

    const changeData = useCallback((e) => {
        console.log(e);
        setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }, [])

    const login = useCallback(async (e) => {
        console.log("Run event?...")
        e.preventDefault()
        const resp = await axios.post('http://localhost:8000/users/signin', data)
        if (resp.data.status === 500) window.alert(resp.data.message)
        else {
            context.action.loginUser({email:resp.data.data.email, user_name:resp.data.data.name})
            sessionStorage.setItem("email", resp.data.data.email)
            sessionStorage.setItem("user_name", resp.data.data.name)
            navigate('/')
        }
        console.log({resp})
    }, [data, navigate])
    return (
        <main id="main">
            <section className="login_part padding_top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_text text-center">
                                <div className="login_part_text_iner">
                                    <h2>New to our Shop?</h2>
                                    <p>There are advances being made in science and technology
                                        everyday, and a good example of this is the</p>
                                    <a href="#" className="btn_3">Login</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_form">
                                <div className="login_part_form_iner">
                                    <h3>Welcome Back ! <br/>
                                        Please Sign in now</h3>
                                    <form className="row contact_form" action="#" method="post" noValidate="novalidate">
                                        <div className="col-md-12 form-group p_star">
                                            <input type="text" className="form-control" id="email" name="email" value={data.email} placeholder="E_mail"
                                                onChange={changeData}/>
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input type="pwd" className="form-control" id="pwd" name="pwd" value={data.pwd} placeholder="Password"
                                                onChange={changeData}/>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="creat_account d-flex align-items-center">
                                                <input type="checkbox" id="f-option" name="selector"/>
                                                    <label htmlFor="f-option">Remember me</label>
                                            </div>
                                            <button type="submit" value="submit" className="btn_3" onClick={login} >
                                                log in
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

export default SignIn
