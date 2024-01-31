import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const [searchClassName, setSearchClassName] = useState('search_input d-none')

    const navigate = useNavigate()
    const context = useContext(UserContext)

    // 로그아웃
    const logout = async (e) => {
        e.preventDefault()
        const resp = await axios.get('http://localhost:8000/users/logout', { withCredentials: true })
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            // console.log(resp.data.message)
            context.action.loginUser({email:'', user_name:''})
            sessionStorage.removeItem("email")
            sessionStorage.removeItem("user_name")
            navigate('/')
        }
    }

    return (
        <header className="main_menu home_menu">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" to={'/'}> <img src="img/logo.png" alt="logo" /> </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="menu_icon"><i className="fas fa-bars"></i></span>
                            </button>

                            <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to={"/product"}><strong>SHOP</strong></Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to={"/"}><strong>BUY</strong></Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="search_1" onClick={()=>setSearchClassName('search_input d-block')}><i className="ti-search"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="hearer_icon d-flex">

                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Notice
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                                            <Link className="dropdown-item" to={"/notice"}>Notice</Link>
                                            <Link className="dropdown-item" to={"/faq"}>FAQ</Link>
                                        </div>
                                    </li>
                                    {context.state.userData.email ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/mypage"}>Mypage</Link>
                                        </li>
                                    ) : ''}                                
                                    <li className="nav-item dropdown">
                                    {context.state.userData.email ? (
                                        <span className="nav-link">
                                            <strong>{context.state.userData.user_name}</strong>님 환영합니다. {' '}
                                            <button type='button' className="genric-btn primary small circle" onClick={logout}>로그아웃</button>
                                        </span>
                                    ) : (
                                        <Link className="nav-link" to={"/user/signin"}>Login</Link>
                                    )}
                                        
                                    </li>
                                    {context.state.userData.email ? ('') : (
                                        <li className="nav-item dropdown">
                                        <Link className="nav-link" to={"/user/signup"}>Signup</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className={searchClassName} id="search_input_box" >
                <div className="container ">
                    <form className="d-flex justify-content-between search-inner">
                        <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
                        <button type="submit" className="btn"></button>
                        <span className="ti-close" id="close_search" title="Close Search" onClick={()=>setSearchClassName('search_input d-none')}></span>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header