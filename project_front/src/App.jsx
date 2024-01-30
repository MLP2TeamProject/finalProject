import { Routes, Route } from 'react-router-dom'

import Header from './home/component/Header'

import BoardMain from './board/BoardMain'
import MypageMain from './mypage/MypageMain'

const App = () => {
  return (
    <div>
      {/* Header와 footer는 공통적으로 작용 */}
      <Header/>
      <Routes>
        <Route path='/board/*' element={<BoardMain />} />
        <Route path='/mypage/*' element={<MypageMain />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
