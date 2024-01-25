import {Routes, Route, Link} from 'react-router-dom'
import BidList from './component/BidList'
import MyInfo from './component/MyInfo'
import './mypage.css'

const MypageMain = () => {
    return (
        <>
            <section className="breadcrumb breadcrumb_bg mypage_breadcrumb">
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                    <div className="breadcrumb_iner">
                        <div className="breadcrumb_iner_item">
                        <h2>Mypage</h2>
                            <Link to="/mypage"><h4>| 도서 목록</h4></Link> 
                            <Link to="/mypage/myinfo"><h4>| 회원 정보</h4></Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <Routes>
                <Route index element={<BidList />} />
                <Route path='/myinfo' element={<MyInfo />} />
            </Routes>
        </>
    )
}

export default MypageMain