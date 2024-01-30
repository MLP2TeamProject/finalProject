import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import ProductMain from './product/ProductMain';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/products/*' element={<ProductMain />} /> {/*Product 컴포넌트를 위한 라우트를 추가 */}
        </Routes>
        {/* <Footer /> */}
      </div>
      </Router>
  );
}

export default App;
