import { Routes, Route } from 'react-router-dom'
import Header from './home/component/Header'
import Footer from './home/component/Footer'
import HomeMain from './home/HomeMain'
import MypageMain from './mypage/MypageMain'
import UserMain from './user/UserMain'
import ProductList from './product/ProductMain'

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<HomeMain />} />
          <Route path='/user/*' element={<UserMain />} />
          <Route path='/mypage/*' element={<MypageMain />} />
          <Route path='/product' element={<ProductList />} />
          <Route path='*' element={<><hr/><h3>Page Not Found</h3></>} />
        </Routes>
      <Footer /> 
    </>
  )
}

export default App
