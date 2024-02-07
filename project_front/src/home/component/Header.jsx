import { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const navigate = useNavigate()
    const context = useContext(UserContext)

    const [isShowSearch, setShowSearch] = useState(false);

    // 로그아웃
    const logout = async (e) => {
        e.preventDefault()
        const resp = await axios.get('http://localhost:8000/users/logout', { withCredentials: true })
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            // console.log(resp.data.message)
            context.action.loginUser({email:'', user_name:'', isadmin:'N'})
            sessionStorage.removeItem("email")
            sessionStorage.removeItem("user_name")
            sessionStorage.removeItem("isadmin")
            navigate('/')
        }
    }

    // 검색창
    const focusRef = useRef()
    const [searchClassName, setSearchClassName] = useState('search_input d-none')
    const [keyword, setKeyword] = useState('')
    
    const searchProduct = async ()=>{
        setSearchClassName('search_input d-none')
        setKeyword('')
        const resp = await axios.get('http://localhost:8000/products/keyword/' + keyword)
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            // console.log('검색결과', resp.data.data)
            navigate('/keyword', {state: resp.data.data})
        }        
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            e.preventDefault() //form의 input text에서 엔터키를 누르면 자동으로 Submit이 되면서 페이지가 리로드되는 현상을 막음 
            searchProduct()
        }
    }

    useEffect(()=> {
        if (searchClassName === 'search_input d-block') {
            focusRef.current.focus()
        }
    }, [searchClassName])

    return (
        <header className="main_menu home_menu">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" to={'/'}> <img src="img/logo01.png" alt="logo" /> </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="menu_icon"><i className="fas fa-bars"></i></span>
                            </button>

                            <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to={"/products/list"}><strong>상품</strong></Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to={"/products/buy"}><strong>구매신청</strong></Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="search_1" onClick={()=>setSearchClassName('search_input d-block')}><i className="ti-search"></i></a>
                                    </li>
                                    {/* <li
                                        className="nav-item"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowSearch(true);
                                        }}>
                                        <Link className="nav-link" id="search_1">
                                            <i className="ti-search"></i>
                                        </Link>
									</li> */}
                                </ul>
                            </div>
                            <div className="hearer_icon d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/board/noticelist"}>고객센터</Link>
                                    </li>
                                    {/* <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Notice
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                                            <Link className="dropdown-item" to={"/board/noticelist"}>Notice</Link>
                                            <Link className="dropdown-item" to={"/board/faqlist"}>FAQ</Link>
                                        </div>
                                    </li> */}
                                    {context.state.userData.email ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/mypage"}>마이페이지</Link>
                                        </li>
                                    ) : ''}                                
                                    <li className="nav-item dropdown">
                                    {context.state.userData.email ? (
                                        <span className="nav-link">
                                            <strong>{context.state.userData.user_name}</strong>님 환영합니다. {' '}
                                            <button type='button' className="genric-btn primary small circle" onClick={logout}>로그아웃</button>
                                        </span>
                                    ) : (
                                        <Link className="nav-link" to={"/user/signin"}>로그인</Link>
                                    )}                                        
                                    </li>
                                    {context.state.userData.email ? ('') : (
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link" to={"/user/signup"}>회원가입</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* 검색창 */}
            <div className={searchClassName} id="search_input_box">
                <div className="container">
                    <form className="d-flex justify-content-between search-inner">
                        <input type="text" className="form-control" id="search_input" placeholder="Search Here" 
                        value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={handleEnter} ref={focusRef} style={{width:'88%'}} />
                        <button type="button" className="btn form-control pt-2" onClick={searchProduct}><i className="ti-search"></i></button>
                        <span className="ti-close" id="close_search" title="Close Search" onClick={()=>setSearchClassName('search_input d-none')}></span>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header