import { Routes, Route } from "react-router-dom";
import Header from "./home/component/Header";
import Footer from "./home/component/Footer";
import HomeMain from "./home/HomeMain";
import MypageMain from "./mypage/MypageMain";
import UserMain from "./user/UserMain";
import BoardMain from "./board/BoardMain";
import ProductMain from "./product/ProductMain";
import SearchKeyword from "./home/component/SearchKeyword";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/keyword" element={<SearchKeyword />} />
        <Route path="/board/*" element={<BoardMain />} />
        <Route path="/user/*" element={<UserMain />} />
        <Route path="/mypage/*" element={<MypageMain />} />
        <Route path="/products/*" element={<ProductMain />} />
        <Route path="*" element={<h3>Page Not Found</h3>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
