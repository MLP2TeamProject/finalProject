import { Route, Routes } from "react-router-dom";

// 준영님
import ProductList from "./component/productlist";
import ProductBuy from "./component/productbuy";

// 유경님
import Detail from "./component/Detail";
import Bidding from "./component/Bidding";
import Update from "./component/Update";
import Pay from "./component/Pay";

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
      </Routes>
    </>
  );
};
export default ProductMain;
