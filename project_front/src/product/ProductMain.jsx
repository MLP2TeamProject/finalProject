import { Route, Routes } from "react-router-dom";

// 상품, 구매신청
import ProductList from "./component/ProDuctList";
import ProductBuy from "./component/ProDuctBuy";

// 상품상세, 입찰
import Detail from "./component/Detail";
import Bidding from "./component/Bidding";
import Update from "./component/Update";
import Pay from "./component/Pay";

//페이징 테스트
import ProductListPage from "./component/paging1";
//페이징 테스트 : react-paginate 방식
// import ProductListPage from "./component/paging";

const ProductMain = () => {
  return (
    <>
      <Routes>
        <Route path="/list" element={<ProductList />} />
        <Route path="/buy" element={<ProductBuy />} />
        <Route path="/detail/:product_id" element={<Detail />} />
        <Route path="/bidding/:product_id" element={<Bidding />} />
        <Route path="/update" element={<Update />} />
        <Route path="/pay" element={<Pay />} />
        {/* 페이징 샘플 컴포넌트 */}
        <Route path="/listpage" element={<ProductListPage />} />
      </Routes>
    </>
  );
};
export default ProductMain;
