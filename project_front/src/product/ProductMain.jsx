import { Route, Routes } from "react-router-dom";

// 준영님
import ProductList from './component/ProDuctList'
import ProductBuy from './component/ProDuctBuy'

// 유경님
import Detail from "./component/Detail";
import Bidding from "./component/Bidding";
import Update from "./component/Update";
//Timer랑 Table은 Detail 안에 있음

//product.css 파일 추가
import "./product.css"

const ProductMain = () => {
  return (
    <>
      <Routes>
        <Route path='/list' element={<ProductList />} />
        <Route path='/buy' element={<ProductBuy />} />
        <Route path="/detail/:product_id" element={<Detail />} />
        {/* 여기를 detail쪽에서 설정한 변수랑 똑같이 맞춰야되니까 product_id로 */}
        <Route path="/bidding" element={<Bidding />} />
        <Route path="/update/:product_id" element={<Update />} />
      </Routes>
    </>
  );
};
export default ProductMain;
