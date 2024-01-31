import { Routes, Route } from "react-router-dom";
import ProductMain from "./product/ProductMain";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/products/*" element={<ProductMain />} />
      </Routes>
    </div>
  );
};

export default App;
