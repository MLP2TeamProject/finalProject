import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { parseString } from 'xml2js';


const ProductList = () => {
    // const navigate = useNavigate();
    // const [products, setProducts] = useState([]) // 상태 초기화를 빈 배열로 설정
    const [productList, setProductList] = useState({
        status: "", message: "", data: []
    });

    // 서버연동?
    const getProductList = useCallback(async () => {
        try {
            const resp = await axios.get('http://localhost:8000/products/productList');
            console.log("데이터 확인", resp.data);
            setProductList(resp.data);
        } catch (error) {
            console.error("데이터 가져오기 실패", error);
        }
    }, []);

    useEffect(() => {
        getProductList();
    }, [getProductList]);



    return (
        <main>
            {/*  <!--================Home Banner Area =================-->
        <!-- breadcrumb start--> */}
            <div>
                <section className="breadcrumb" style={{
                    backgroundImage: "url('/img/b-mic.png')",
                    backgroundSize: "300px",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    {/* <section className="breadcrumb breadcrumb_bg"> style={{backgroundImage: "url(img/b-mic.png)"}} */}
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="breadcrumb_iner">
                                    <div className="breadcrumb_iner_item">
                                        <h2>ProDuct List</h2>
                                        <p>Home <span>-</span> ProDuct List</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- breadcrumb start--> */}

                {/* <!--================Category Product Area =================--> */}
                <section className="cat_product_area section_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="left_sidebar_area">


                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product_top_bar d-flex justify-content-between align-items-center">
                                            <div className="single_product_menu">
                                                <p><span>10000 </span> 상품 리스트</p>
                                            </div>
                                            <div className="single_product_menu d-flex">
                                                <Link to="/products/buy" className="list-group-item list-group-item-action list-group-item-danger">상품 구매하기</Link>
                                                <div className="top_pageniation">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center latest_product_inner">
                                    {productList.data.map((product, index) => (
                                        <div className="col-lg-4 col-sm-6" key={index}>
                                            <div className="single_product_item">
                                                <img src={product.image || '/img/default-image.png'} alt="" />
                                                <div className="single_product_text">
                                                    <h4>{product.title}</h4>
                                                    <h3>가격: {product.price}원</h3>
                                                    <h3>저자: {product.author}</h3>
                                                    <Link to={`/products/detail/${product.id}`} className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="col-lg-12">
                                    <div className="pageination">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-center">
                                                <li className="page-item">
                                                    <Link className="page-link" to="#" aria-label="Previous">
                                                        <i className="ti-angle-double-left"></i>
                                                    </Link>
                                                </li>
                                                <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="#" aria-label="Next">
                                                        <i className="ti-angle-double-right"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                {/* <!--================End Category Product Area =================--> */}
            </div >
        </main >
    )
}


export default ProductList
